import { Canvas } from "@react-three/fiber";
import { DuotoneScene } from "./DuotoneScene";

/**
 * Code-split entry (React.lazy'd from Hero). Renders only on desktop + motion.
 * frameloop switches to "never" when paused (offscreen / tab hidden) so an
 * idle hero costs nothing; dpr capped at 2; orthographic default camera is
 * fine since the plane is drawn in clip space.
 */
export default function PortraitCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      className="portrait-canvas"
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => gl.setClearColor("#e8e1d4", 1)}
    >
      <DuotoneScene />
    </Canvas>
  );
}
