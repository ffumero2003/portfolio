import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RotatingTitle({ words, interval}){
  const [i, setI] = useState(0)

  const minCh = useMemo(() => {
    if (!words?.length) return 0;
    return Math.max(...words.map(w => w.length)) + 1;
  }, [words]);

  // useMemo memoriza el resultado para no estar recalculando cada vez que haga render, solo hace render cuando toque el codigo


  useEffect(() => {
    if(words.length <= 1 ) return;
    const id = setInterval(() => setI(time => (time + 1) % words.length), interval);
    return() => clearInterval(id)
  }, [interval, words.length])

  return(
    <span className="inline-block whitespace-nowrap align-baseline" style={{ minWidth: `${minCh}ch` }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8}}
          animate={{opacity: 1, y: 0}}
          exit={{ opacity: 0, y: -8}}
          transition={{ duration: 0.30, ease: "easeOut"}}
          className="inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}