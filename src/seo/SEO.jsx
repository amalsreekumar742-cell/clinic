import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Chiro Care Ayurvedic Clinic",
  description = "Experience natural healing through Ayurveda & Chiropractic Care. Restore balance, relieve pain, and improve your life at Chiro Care Clinic.",
  canonicalPath = "",
  ogType = "website",
  ogImage = "https://chirocareclinic.in/og-image.jpg", // Production fallback url
  isBlogPost = false,
  blogData = null
}) => {
  const siteUrl = "https://chirocareclinic.in";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const fullTitle = `${title} | Natural Healing. Lasting Wellness.`;

  // Local Clinic Schema
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Chiro Care Ayurvedic Clinic",
    "alternateName": "Chiro Care Clinic",
    "url": siteUrl,
    "logo": `${siteUrl}/favicon.svg`,
    "image": ogImage,
    "description": description,
    "telephone": "+91-6282018754",
    "email": "info@chirocareclinic.in",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BRRA 46, Bank Road, Metro pillar.567, Avenue.5th, Kaloor",
      "addressLocality": "Ernakulam",
      "addressRegion": "Kerala",
      "postalCode": "682017",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.003362",
      "longitude": "76.299104"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/chirocareclinic",
      "https://instagram.com/chirocareclinic",
      "https://youtube.com/chirocareclinic"
    ],
    "medicalSpecialty": [
      "Chiropractic",
      "Ayurvedic"
    ]
  };

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
        "url": `${siteUrl}/favicon.svg`
      }
    },
    "datePublished": new Date(blogData.date).toISOString(),
    "mainEntityOfPage": canonicalUrl
  } : null;

  return (
    <Helmet>
      {/* Basic Title and Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Chiro Care Ayurvedic Clinic" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Local SEO Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(clinicSchema)}
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
