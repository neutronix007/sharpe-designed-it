// Host-based redirects for cliffordsharpe.com subdomains.
// Kept separate from the main site so the site itself stays pure static assets.
const ROOT = "https://cliffordsharpe.com";

export default {
  fetch(request) {
    const url = new URL(request.url);

    if (url.hostname === "agency.cliffordsharpe.com") {
      return Response.redirect(`${ROOT}/agency`, 301);
    }

    // www (and anything else routed here) → same path on the root domain
    return Response.redirect(`${ROOT}${url.pathname}${url.search}`, 301);
  },
};
