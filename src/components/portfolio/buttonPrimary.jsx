
export default function ButtonPrimary({ text, onClick, style }) {
  return (
    <div
      style={{
        "--btn-sh1": "color-mix(in srgb, var(--color-button-hover) 45%, transparent)",
        "--btn-sh2": "color-mix(in srgb, var(--color-button) 45%, transparent)",
        "--btn-sh3": "color-mix(in srgb, var(--color-accent) 35%, transparent)",
      }}
    >
      <button
        className="
          relative z-[1] border-none btn btn--primary
          text-[var(--color-button-text)]
          bg-[var(--color-button)]

          after:content-[''] after:absolute after:top-0 after:right-0
          after:h-full after:w-0 after:-z-[1] after:bg-[var(--color-button-hover)]
          after:rounded-xl
          after:shadow-[inset_2px_2px_6px_var(--btn-sh1),3px_3px_12px_var(--btn-sh2),0_0_15px_var(--btn-sh3)]
          after:transition-all after:duration-500 after:ease-in-out
          hover:after:left-0 hover:after:w-full
          active:top-[2px]
        "
        onClick={onClick}
        
        style={style}
      >
        {text}
      </button>
    </div>
  );
}

