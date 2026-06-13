from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (kept for environment compatibility)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

XPDC_INQUIRY_URL = "https://xpdcargo.id/login/BindV6/onInsertInquiryFreightForwarding"


class InquiryPayload(BaseModel):
    model_config = ConfigDict(extra="allow")

    service_type: str = Field(..., description="Air Freight | FCL | LCL")
    full_name: str
    company: Optional[str] = ""
    email: EmailStr
    phone: str
    origin: str
    destination: str
    cargo_type: Optional[str] = ""
    weight: Optional[str] = ""
    volume: Optional[str] = ""
    ready_date: Optional[str] = ""
    notes: Optional[str] = ""


@api_router.get("/")
async def root():
    return {"message": "XPDC Freight Forwarding API"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "ts": datetime.now(timezone.utc).isoformat()}


@api_router.post("/inquiry")
async def submit_inquiry(payload: InquiryPayload):
    """
    Receive inquiry from the landing page and forward to XPDC backend.
    """
    inquiry_id = str(uuid.uuid4())
    data = payload.model_dump()
    data["inquiry_id"] = inquiry_id
    data["submitted_at"] = datetime.now(timezone.utc).isoformat()

    # Build a form payload (the XPDC endpoint accepts form-encoded data typically)
    form_payload = {
        "inquiry_id": inquiry_id,
        "service_type": data["service_type"],
        "full_name": data["full_name"],
        "company": data.get("company", ""),
        "email": data["email"],
        "phone": data["phone"],
        "origin": data["origin"],
        "destination": data["destination"],
        "cargo_type": data.get("cargo_type", ""),
        "weight": data.get("weight", ""),
        "volume": data.get("volume", ""),
        "ready_date": data.get("ready_date", ""),
        "notes": data.get("notes", ""),
        "submitted_at": data["submitted_at"],
        "source": "xpdc-landing-page",
    }

    logger.info(f"Forwarding inquiry {inquiry_id} to XPDC backend")

    try:
        async with httpx.AsyncClient(timeout=15.0, follow_redirects=True) as http_client:
            # Try form-encoded first (typical PHP/CI endpoint), fall back to JSON
            resp = await http_client.post(
                XPDC_INQUIRY_URL,
                data=form_payload,
                headers={
                    "User-Agent": "XPDC-Landing/1.0",
                    "Accept": "application/json, text/plain, */*",
                },
            )
        logger.info(f"XPDC backend response {resp.status_code}")
        return {
            "success": True,
            "inquiry_id": inquiry_id,
            "upstream_status": resp.status_code,
            "message": "Inquiry submitted successfully",
        }
    except httpx.RequestError as e:
        logger.exception("Failed to forward inquiry to XPDC backend")
        raise HTTPException(
            status_code=502,
            detail=f"Failed to reach XPDC backend: {str(e)}",
        )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
