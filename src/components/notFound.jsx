import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import dinosaurError from "../components/lottie/404 Error Lottie animation.json"
import ButtonPrimary from "./portfolio/buttonPrimary";

export default function NotFound() {
  return(
    <div className="min-h-dvh min-w-dvw flex justify-center items-center ">
      <div className=" text-center  justify-center items-center">
        <div className="max-w-[700px]  max-h-screen flex justify-center items-center  ">
          <Lottie animationData={dinosaurError} loop={true} autoplay={true} />
        </div>
        
        <Link to="/" >
          <ButtonPrimary text="Go Back Home?" />
        </Link>
      </div>
    </div>
  )
}