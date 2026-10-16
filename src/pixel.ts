// Meta Pixel helper. The base code and first PageView live in index.html; this sends the rest.
// Safe to call when the pixel is blocked (ad blockers) or hasn't loaded.

type Fbq = (command: "track", event: string, params?: Record<string, unknown>) => void;

export function track(event: "PageView" | "Lead" | "Contact", params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, params);
}
