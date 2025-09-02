import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function HeroText({ text="Welcome to my Portfolio", className=""}){
  const textRef = useRef(null)
   

  useEffect(() => {
    const root = textRef.current
    
    if(!root) return;

    const letters = root.querySelectorAll(".letter")
    

    gsap.set(letters, {x: -50, opacity: 0})

    const princAnimation = gsap.to(letters, {
      x: 0,
      opacity: 1,
     
      stagger:{ each:0.10, from: "edges"},
      duration: 1, 
      ease: "power3.out"
    })

    

    return () => princAnimation && princAnimation.kill();
    


  }, [])

  return(
    <h1 ref={textRef}
      className={`text-4xl md:text-6xl font-thin flex flex-wrap justify-center ${className} pointer-events-none w-fit`}
      style={{
        willChange: "transform",
        color: "var(--color-text)", 
      }}>
      
      {text.split("").map((char, i) => (
        <span key={i} className="letter inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}

    </h1>
  )
}
