// Scene3D uses React.createElement intentionally to avoid the visual-edits
// babel plugin from injecting JSX-only attributes (like x-line-number) onto
// react-three-fiber primitives, which would crash three.js applyProps.
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useScroll, useMotionValueEvent } from "framer-motion";

const h = React.createElement;

/* ---------------- Cargo ship (stylised low-poly) ---------------- */
function CargoShip({ scrollY }) {
  const group = useRef();
  const tRef = useRef(0);

  useFrame((state, delta) => {
    tRef.current += delta;
    if (!group.current) return;
    group.current.position.y = Math.sin(tRef.current * 0.6) * 0.15 - 0.2;
    group.current.rotation.z = Math.sin(tRef.current * 0.4) * 0.04;
    const sY = scrollY.current || 0;
    group.current.rotation.y = sY * 0.6 + Math.sin(tRef.current * 0.2) * 0.1;
  });

  const containers = useMemo(() => {
    const arr = [];
    const colors = ["#FF4D00", "#1B2235", "#8A94A6", "#E64500", "#21283B"];
    const rows = 4;
    const cols = 6;
    const stacks = 2;
    const gaps = new Set([
      "0-1-3", "0-3-3", "0-5-2", "1-0-3", "1-2-3", "1-4-3", "1-5-3",
    ]);
    for (let s = 0; s < stacks; s++) {
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (gaps.has(`${s}-${c}-${r}`)) continue;
          arr.push({
            key: `${s}-${c}-${r}`,
            pos: [-1.8 + c * 0.62, -0.05 + r * 0.32, -0.55 + s * 0.55],
            color: colors[(c + r + s) % colors.length],
          });
        }
      }
    }
    return arr;
  }, []);

  const mesh = (props, geom, mat) =>
    h("mesh", props, h(geom[0], { args: geom[1] }), h("meshStandardMaterial", mat));

  return h(
    "group",
    { ref: group, position: [0, -0.4, 0], rotation: [0, -0.25, 0] },
    // Hull (TEST: bright color)
    mesh(
      { castShadow: true, receiveShadow: true, position: [0, -0.55, 0] },
      ["boxGeometry", [5.6, 0.55, 1.5]],
      { color: "#FF4D00", roughness: 0.5, metalness: 0.2 }
    ),
    // Bottom V
    mesh(
      { position: [0, -0.95, 0] },
      ["coneGeometry", [0.85, 1.4, 4]],
      { color: "#0F1320", roughness: 0.8 }
    ),
    // Deck
    mesh(
      { position: [0, -0.27, 0] },
      ["boxGeometry", [5.5, 0.05, 1.45]],
      { color: "#3A4256", roughness: 0.5, metalness: 0.4 }
    ),
    // Bow cone
    mesh(
      { position: [2.95, -0.55, 0] },
      ["coneGeometry", [0.74, 1.1, 4]],
      { color: "#1B2235", roughness: 0.7 }
    ),
    // Bridge
    mesh(
      { position: [-2.3, 0.45, 0] },
      ["boxGeometry", [0.85, 1.0, 1.2]],
      { color: "#FFFFFF", roughness: 0.45, metalness: 0.1 }
    ),
    mesh(
      { position: [-2.3, 1.1, 0] },
      ["boxGeometry", [0.65, 0.35, 0.95]],
      { color: "#FF4D00", roughness: 0.4 }
    ),
    // Funnel
    mesh(
      { position: [-2.3, 1.55, 0] },
      ["cylinderGeometry", [0.18, 0.22, 0.5, 16]],
      { color: "#0F1320", roughness: 0.5, metalness: 0.5 }
    ),
    // Containers
    ...containers.map((c) =>
      h(
        "mesh",
        { key: c.key, position: c.pos, castShadow: true },
        h("boxGeometry", { args: [0.58, 0.28, 0.5] }),
        h("meshStandardMaterial", {
          color: c.color,
          roughness: 0.55,
          metalness: 0.15,
        })
      )
    ),
    // Waterline glow
    h(
      "mesh",
      { position: [0, -1.0, 0], rotation: [-Math.PI / 2, 0, 0] },
      h("ringGeometry", { args: [2.8, 3.4, 64] }),
      h("meshBasicMaterial", { color: "#FF4D00", transparent: true, opacity: 0.06 })
    )
  );
}

/* ---------------- Cargo plane ---------------- */
function CargoPlane({ scrollY }) {
  const group = useRef();
  const tRef = useRef(0);
  useFrame((state, delta) => {
    tRef.current += delta;
    if (!group.current) return;
    const sY = scrollY.current || 0;
    group.current.position.x = -6 + sY * 14;
    group.current.position.y = 1.0 + Math.sin(tRef.current * 0.8) * 0.08 + sY * 0.6;
    group.current.rotation.z = -0.04 + Math.sin(tRef.current * 0.6) * 0.02;
    group.current.rotation.y = 0.05 + sY * 0.5;
  });

  return h(
    "group",
    { ref: group, position: [-6, 1.5, -2], scale: 0.9 },
    // Fuselage
    h(
      "mesh",
      null,
      h("cylinderGeometry", { args: [0.28, 0.28, 3.6, 24] }),
      h("meshStandardMaterial", { color: "#F4F6F8", roughness: 0.5, metalness: 0.2 })
    ),
    // Nose
    h(
      "mesh",
      { position: [0, 1.95, 0] },
      h("coneGeometry", { args: [0.28, 0.5, 24] }),
      h("meshStandardMaterial", { color: "#F4F6F8", roughness: 0.5 })
    ),
    // Tail cone
    h(
      "mesh",
      { position: [0, -1.9, 0], rotation: [Math.PI, 0, 0] },
      h("coneGeometry", { args: [0.28, 0.5, 24] }),
      h("meshStandardMaterial", { color: "#F4F6F8", roughness: 0.5 })
    ),
    // Wings
    h(
      "mesh",
      { position: [0, 0.05, 0], rotation: [0, 0, Math.PI / 2] },
      h("boxGeometry", { args: [0.08, 3.2, 0.55] }),
      h("meshStandardMaterial", { color: "#21283B", roughness: 0.5 })
    ),
    // Tail wing
    h(
      "mesh",
      { position: [0, -1.4, 0], rotation: [0, 0, Math.PI / 2] },
      h("boxGeometry", { args: [0.06, 1.4, 0.32] }),
      h("meshStandardMaterial", { color: "#21283B", roughness: 0.5 })
    ),
    // Vertical fin
    h(
      "mesh",
      { position: [0, -1.45, 0.28], rotation: [Math.PI / 8, 0, 0] },
      h("boxGeometry", { args: [0.06, 0.55, 0.48] }),
      h("meshStandardMaterial", { color: "#FF4D00", roughness: 0.5 })
    ),
    // Engines
    ...[-0.95, 0.95].map((x, i) =>
      h(
        "mesh",
        { key: i, position: [x, -0.2, -0.18] },
        h("cylinderGeometry", { args: [0.12, 0.12, 0.5, 16] }),
        h("meshStandardMaterial", { color: "#1B2235", roughness: 0.4, metalness: 0.6 })
      )
    ),
    // Stripe
    h(
      "mesh",
      { position: [0, 0, 0.281] },
      h("boxGeometry", { args: [0.02, 3.5, 0.08] }),
      h("meshStandardMaterial", { color: "#FF4D00" })
    )
  );
}

function SceneContents({ scrollY }) {
  return h(
    React.Fragment,
    null,
    h("fog", { attach: "fog", args: ["#0B1020", 12, 30] }),
    h("ambientLight", { intensity: 0.7 }),
    h("directionalLight", {
      position: [6, 8, 4],
      intensity: 1.6,
      castShadow: true,
      color: "#FFD7B5",
    }),
    h("directionalLight", { position: [-4, 3, -2], intensity: 0.7, color: "#5C9DFF" }),
    h("pointLight", { position: [0, 2, 3], intensity: 1.0, color: "#FF4D00" }),
    h(
      Float,
      { speed: 0.6, rotationIntensity: 0.15, floatIntensity: 0.4 },
      h(
        "group",
        { position: [1.2, -1.0, -1.5], scale: 0.7, rotation: [0.06, -0.55, 0] },
        h(CargoShip, { scrollY })
      )
    ),
    h(CargoPlane, { scrollY })
  );
}

export default function Scene3D() {
  const { scrollYProgress } = useScroll();
  const scrollY = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollY.current = v;
  });

  // Use createElement throughout to bypass the visual-edits babel plugin
  // which would otherwise inject JSX-only attributes onto r3f elements.
  return h(
    "div",
    { className: "fixed inset-0 pointer-events-none", style: { zIndex: 0 } },
    h(
      Canvas,
      {
        shadows: true,
        dpr: [1, 1.8],
        camera: { position: [0, 1.2, 7.5], fov: 38 },
        gl: { antialias: true, alpha: true },
      },
      h(SceneContents, { scrollY })
    ),
    h("div", { className: "absolute inset-0 bg-background/55 dark:bg-background/65" }),
    h("div", { className: "absolute inset-0 grain" })
  );
}
