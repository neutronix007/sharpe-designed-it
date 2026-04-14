import { Helmet } from "react-helmet-async";

// Update this to your custom domain once it's configured on Vercel
const BASE_URL = "https://sharpe-designed-it.vercel.app";

interface SEOProps {
  title: string;
  description: string;
  image: string;   // absolute URL or path from public/
  path: string;    // e.g. "/" or "/projects"
}

export default function SEO({ title, description, image, path }: SEOProps) {
  const url      = `${BASE_URL}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${BASE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph — LinkedIn, Facebook, Discord, Slack, WhatsApp */}
      <meta property="og:type"        content="website" />
      <meta property="og:url"         content={url} />
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={imageUrl} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name"   content="Sharpe.Designed.It" />

      {/* Twitter / X */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={imageUrl} />
    </Helmet>
  );
}
