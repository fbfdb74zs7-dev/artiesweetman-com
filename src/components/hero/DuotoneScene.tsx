import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { duotoneFragment, duotoneVertex } from "./duotoneShader";
import { heroScroll } from "./heroScroll";

/** Fullscreen (frame-filling) duotone plane. One draw call, no lights.
 *  Mutates uniforms directly in useFrame — never setState. */
export function DuotoneScene() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const { invalidate } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uHasMap: { value: 0 },
      uMap: { value: null as THREE.Texture | null },
      uInk: { value: new THREE.Color("#1a1712") },
      uPaper: { value: new THREE.Color("#efe9dd") },
    }),
    []
  );

  useFrame((_, delta) => {
    const u = mat.current.uniforms;
    // clamp delta so a tab-return doesn't jump the drift
    u.uTime.value += Math.min(delta, 0.05);
    // ease scroll uniform toward the shared signal (buttery, no snap)
    u.uScroll.value += (heroScroll.p - u.uScroll.value) * 0.06;
    invalidate(); // keep the on-demand loop alive while this scene is mounted
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={duotoneVertex}
        fragmentShader={duotoneFragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
