let avifSupportPromise: Promise<boolean> | null = null;

const AVIF_TEST_IMAGE =
  'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAACAG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAAAAAAAAAAAAAAAAAAA2lsb2MAAAAAREAAAgABAAAAAAGgAAEAAAAAAAAAHwAAACQAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAABaXBycAAAAGppcGNvAAAAE2F2MUNpc3MAAAAAAWNvbHJuY2x4AAEAAAABAAABAAAAABhpcG1hAAAAAAAAAAEAAQECGgAAAA5waXhpAAAAAwgICAAAABNpdmV4AAAAAAABAAEAE21kYXQAAAAcEgAKCBgABogQEAwgMgkjAAEAGQCE0Q==';

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
