let inited;
export function initLordicon() {
  if (inited) return inited;               
  inited = (async () => {
    const [{ defineElement }, lottieMod] = await Promise.all([
      import('@lordicon/element'),
      import('lottie-web'),
    ]);
    defineElement(lottieMod.default.loadAnimation);
  })();
  return inited;
}
