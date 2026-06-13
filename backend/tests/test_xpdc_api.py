"""Backend API tests for XPDC Freight Forwarding landing page.

Covers:
- /api/health endpoint
- /api/inquiry endpoint (validation + happy path for Air Freight, FCL, LCL)
"""
import os
import pytest
import requests
from pathlib import Path

# Load REACT_APP_BACKEND_URL from frontend/.env (preview URL is the public ingress)
FRONTEND_ENV = Path(__file__).resolve().parents[2] / "frontend" / ".env"
BASE_URL = None
if FRONTEND_ENV.exists():
    for line in FRONTEND_ENV.read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
            break

assert BASE_URL, "REACT_APP_BACKEND_URL must be set in frontend/.env"


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- /api/health ----------
class TestHealth:
    def test_health_returns_ok(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/health", timeout=15)
        assert resp.status_code == 200
        data = resp.json()
        assert data.get("status") == "ok"
        assert "ts" in data


# ---------- /api/inquiry validation ----------
class TestInquiryValidation:
    def test_inquiry_missing_required_fields_returns_422(self, api_client):
        resp = api_client.post(f"{BASE_URL}/api/inquiry", json={}, timeout=15)
        assert resp.status_code == 422

    def test_inquiry_invalid_email_returns_422(self, api_client):
        payload = {
            "service_type": "Air Freight",
            "full_name": "TEST User",
            "email": "not-an-email",
            "phone": "+62 812 3456 7890",
            "origin": "Jakarta",
            "destination": "Singapore",
        }
        resp = api_client.post(f"{BASE_URL}/api/inquiry", json=payload, timeout=15)
        assert resp.status_code == 422

    def test_inquiry_missing_phone_returns_422(self, api_client):
        payload = {
            "service_type": "FCL",
            "full_name": "TEST User",
            "email": "test@example.com",
            "origin": "Jakarta",
            "destination": "Singapore",
        }
        resp = api_client.post(f"{BASE_URL}/api/inquiry", json=payload, timeout=15)
        assert resp.status_code == 422


# ---------- /api/inquiry happy path ----------
class TestInquirySubmission:
    @pytest.mark.parametrize("service_type", ["Air Freight", "FCL", "LCL"])
    def test_inquiry_submission_success(self, api_client, service_type):
        payload = {
            "service_type": service_type,
            "full_name": "TEST Tester",
            "company": "TEST Co",
            "email": "test@example.com",
            "phone": "+62 812 3456 7890",
            "origin": "Jakarta",
            "destination": "Singapore",
            "cargo_type": "General",
            "weight": "100kg",
            "volume": "1cbm",
            "ready_date": "2026-02-01",
            "notes": "Automated test inquiry — please ignore",
        }
        resp = api_client.post(f"{BASE_URL}/api/inquiry", json=payload, timeout=30)
        assert resp.status_code == 200, f"Body: {resp.text}"
        data = resp.json()
        assert data.get("success") is True
        assert isinstance(data.get("inquiry_id"), str) and len(data["inquiry_id"]) > 0
        assert isinstance(data.get("upstream_status"), int)
        assert "message" in data
