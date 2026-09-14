import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three-stdlib';
import * as THREE from 'three';

extend({ unrealBloomPass: UnrealBloomPass });

declare module '@react-three/fiber' {
  interface ThreeElements {
    unrealBloomPass: any;
  }
}

const ParticleSwarm = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 20000;
  const speedMult = 1;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; // Alias for user code compatibility
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*100));
     return pos;
  }, []);

  // Material & Geom
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), []);

  const PARAMS = useMemo(() => ({"scale":90,"twist":2.5,"wave":6,"breathe":0.5}), []);
  type ParamKeys = keyof typeof PARAMS;
  const addControl = (id: ParamKeys, _l: string, _min: number, _max: number, val: number) => {
      return PARAMS[id] !== undefined ? PARAMS[id] : val;
  };
  const setInfo = (_title: string, _desc: string) => {};
  const annotate = (_name: string, _pos: THREE.Vector3, _label: string) => {};

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;
    const THREE_LIB = THREE;

    for (let i = 0; i < count; i++) {
        // USER CODE START
        const scale = addControl("scale", "Scale", 20, 200, 90); const twist = addControl("twist", "Twist", 0.0, 8.0, 2.5); const wave = addControl("wave", "Wave", 0.0, 20.0, 6.0); const breathe = addControl("breathe", "Breath", 0.0, 1.5, 0.5);
        
        if (i === 0) { setInfo( "Living Toroidal Field", "A continuously breathing toroidal attractor with harmonic interference and color mapped to curvature." ); annotate("core", new THREE.Vector3(0, 0, 0), "Field Core"); }
        
        const t = time * 0.35; const u = i / count;
        
        const rings = 144.0; const turns = 233.0;
        
        const a = u * 6.28318530718 * rings; const b = u * 6.28318530718 * turns + t;
        
        const r1 = scale * (1.0 + breathe * 0.25 * Math.sin(t * 2.0)); const r2 = scale * 0.28;
        
        const m = 1.0 + 0.18 * Math.sin(a * wave + t * 3.0); const n = 1.0 + 0.12 * Math.cos(b * wave * 0.7 - t * 2.0);
        
        const rr = (r1 + r2 * Math.cos(b * twist) * m);
        
        const x = rr * Math.cos(a); const y = rr * Math.sin(a); const z = r2 * Math.sin(b * twist) * n;
        
        const rot = t * 0.6; const cr = Math.cos(rot); const sr = Math.sin(rot);
        
        target.set( x * cr - z * sr, y + Math.sin(a * 2.0 + t) * scale * 0.03, x * sr + z * cr );
        
        const hue = (u + 0.12 * Math.sin(b * 0.5 + t)) % 1.0; const sat = 0.85; const light = 0.45 + 0.18 * Math.sin(a * 3.0 + b + t * 2.0);
        
        color.setHSL(hue < 0.0 ? hue + 1.0 : hue, sat, light);
        // USER CODE END

        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 60 }}>
        <fog attach="fog" args={['#000000', 0.01]} />
        <ParticleSwarm />
        <OrbitControls autoRotate={true} />
        <Effects disableGamma>
            <unrealBloomPass threshold={0} strength={1.8} radius={0.4} />
        </Effects>
      </Canvas>
    </div>
  );
}