
import Spline from '@splinetool/react-spline';

export default function RobotViewer() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
      <Spline
        scene="https://prod.spline.design/YxSefCC1GuOangOF/scene.splinecode"
        style={{
          width: "50vw",      
          height: "70dvh", 
        }}
      />

    </div>
  );
}
