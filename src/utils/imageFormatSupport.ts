let avifSupportPromise: Promise<boolean> | null = null;

const AVIF_TEST_IMAGE =
  'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAAYRtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAANGlsb2MAAAAAREAAAgACAAAAAAGoAAEAAAAAAAAAFAABAAAAAAG8AAEAAAAAAAAAFwAAADhpaW5mAAAAAAACAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAFWluZmUCAAAAAAIAAGF2MDEAAAAAw2lwcnAAAACdaXBjbwAAABNjb2xybmNseAABAA0ABoAAAAAMYXYxQ4EAHAAAAAAUaXNwZQAAAAAAAAABAAAAAQAAAA5waXhpAAAAAAEIAAAAOGF1eEMAAAAAdXJuOm1wZWc6bXBlZ0I6Y2ljcDpzeXN0ZW1zOmF1eGlsaWFyeTphbHBoYQAAAAAMYXYxQ4EgAgAAAAAQcGl4aQAAAAADCAgIAAAAHmlwbWEAAAAAAAAAAgABBAGGAwcAAgSCAwSFAAAAGmlyZWYAAAAAAAAADmF1eGwAAgABAAEAAAAzbWRhdBIACgQYAAYVMgoYAAABAAIhG6NgEgAKBzgABhAQ0GkyChgAAABAALASmpg=';

async function detectViaImage(): Promise<boolean> {
  if (typeof Image === 'undefined') return false;

  return await new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image.width > 0 && image.height > 0);
    image.onerror = () => resolve(false);
    image.src = AVIF_TEST_IMAGE;
  });
}

export async function detectAvifSupport(): Promise<boolean> {
  if (!avifSupportPromise) {
    avifSupportPromise = detectViaImage().catch(() => false);
  }
  return await avifSupportPromise;
}
