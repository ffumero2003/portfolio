export default function Border(){
  return(
    <div className="pointer-events-none fixed inset-0 z-[999]">
        {/* borde exterior */}
        <div
          className="absolute inset-4 rounded-2xl outline outline-[6px]"
          style={{ outlineColor: "var(--color-outline)", opacity: 1 }}
        />
        {/* borde interior */}
        <div
          className="absolute inset-8 rounded-2xl outline outline-4"
          style={{ outlineColor: "var(--color-outline)", opacity: 0.6 }}
        />
      </div>
  )
}