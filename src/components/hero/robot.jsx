
import Spline from '@splinetool/react-spline';

export default function RobotViewer() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center overflow-hidden border border-black">
      <Spline
        scene="https://prod.spline.design/YxSefCC1GuOangOF/scene.splinecode"
        style={{
          width: "100vw",      
          height: "100dvh", 
        }}
      />

    </div>
  );
}
