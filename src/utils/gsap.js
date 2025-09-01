import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";


let registered = false;

export function getGSAP() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    registered = true;
  }
  return { gsap, ScrollTrigger, MotionPathPlugin };
}