export async function probeBaseUrlsSequentially(
  baseUrls: readonly string[],
  probe: (baseUrl: string) => Promise<boolean>,
): Promise<string | null> {
  for (const baseUrl of baseUrls) {
    if (await probe(baseUrl)) {
      return baseUrl;
    }
  }
  return null;
}
