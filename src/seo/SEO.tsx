import { Helmet } from "react-helmet-async";
import { Blog } from "../types/Blog";
import {
  DEFAULT_IMAGE,
  SITE_NAME,
  SITE_URL,
  getClinicSchema,
} from "./site";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  isBlogPost?: boolean;
  blogData?: Blog | null;
  schemas?: object[];
}

const SEO = ({
  title = "Best Ayurvedic Clinic in Kerala",
  description = "Chiro Care Ayurvedic Clinic in Kaloor, Ernakulam offers Ayurveda-informed chiropractic care for back pain, neck pain, migraine, sciatica, disc problems, and Panchakarma wellness.",
  canonicalPath = "",
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  isBlogPost = false,
  blogData = null,
  schemas = []
}: SEOProps) => {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const schemaGraph = [getClinicSchema(description, ogImage), ...schemas];

  // Blog Post Schema if relevant
  const blogSchema = isBlogPost && blogData ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogData.title,
    "description": blogData.summary,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": blogData.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Chiro Care Ayurvedic Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_IMAGE
      }
    },
    "datePublished": new Date(blogData.date).toISOString(),
    "dateModified": new Date(blogData.date).toISOString(),
    "keywords": blogData.tags.join(", "),
    "mainEntityOfPage": canonicalUrl
  } : null;

  // Keywords from blog tags (or generic clinic keywords for non-blog pages)
  const keywords = blogData?.tags?.join(", ") || "Ayurvedic clinic Kerala, chiropractic care Ernakulam, back pain treatment, migraine relief, sciatica, Panchakarma Kochi";

  return (
    <Helmet>
      {/* Basic Title and Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="theme-color" content="#0088A9" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Chiro Care Ayurvedic Clinic" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@chirocareclinic" />
      <meta name="twitter:creator" content="@chirocareclinic" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Chiro Care Ayurvedic Clinic" />

      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>

      {/* Conditional Blog Schema */}
      {isBlogPost && blogSchema && (
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
