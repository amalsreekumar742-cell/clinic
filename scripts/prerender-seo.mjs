import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");
const sourceHtml = await readFile(join(distDir, "index.html"), "utf8");
const siteUrl = "https://chirocare.co.in";
const siteName = "Chiro Care Ayurvedic Clinic";
const today = "2026-07-01";

const services = [
  ["migraine-treatment", "Migraine Treatment in Kerala", "Ayurveda-informed chiropractic care for migraine triggers, neck tension, sleep strain, and nervous-system balance in Ernakulam, Kerala."],
  ["headache-treatment", "Headache Treatment in Kerala", "Natural headache care for tension, sinus, posture, and neck-related headache patterns at Chiro Care Ayurvedic Clinic."],
  ["disc-problems", "Disc Problems Treatment in Kerala", "Non-surgical support for disc pain, nerve compression, radiating back pain, and spinal mobility issues in Kerala."],
  ["shoulder-pain", "Shoulder Pain Treatment in Kerala", "Conservative shoulder pain care for frozen shoulder, rotator cuff strain, stiffness, and movement restriction."],
  ["sciatica", "Sciatica Treatment in Kerala", "Ayurvedic and chiropractic support for sciatic nerve pain, lower back compression, leg numbness, and walking discomfort."],
  ["scoliosis", "Scoliosis Support in Kerala", "Gentle chiropractic posture support and Ayurvedic muscle-relaxing care for mild-to-moderate spinal curvature and back tension."],
  ["leg-length-measurement", "Leg Length Measurement in Kerala", "Structural assessment for functional leg length difference, pelvic tilt, gait imbalance, hip strain, and lower back pain."],
  ["cervical-spondylosis", "Cervical Spondylosis Treatment in Kerala", "Neck care for cervical stiffness, arm tingling, posture strain, and age-related cervical wear."],
  ["whole-back-pain", "Whole Back Pain Treatment in Kerala", "Complete spine care for upper, mid, and lower back pain with posture review, chiropractic support, and Ayurvedic therapy."],
  ["whole-body-joint-pain", "Whole Body Joint Pain Treatment in Kerala", "Ayurvedic and structural support for multiple joint pain, stiffness, systemic inflammation patterns, and mobility concerns."],
  ["neck-pain", "Neck Pain Treatment in Kerala", "Care for text neck, desk posture, cervical stiffness, and recurring neck muscle tension in Ernakulam."],
  ["arthritis-treatment", "Arthritis Treatment in Kerala", "Natural joint-care support for arthritic stiffness, swelling, mobility limits, and daily movement comfort."],
  ["sports-injury", "Sports Injury Treatment in Kerala", "Recovery support for sports strains, sprains, shoulder overload, joint pain, and movement correction."],
  ["stress-anxiety", "Stress and Anxiety Support in Kerala", "Calming Ayurvedic therapies and posture care for stress-related tension, fatigue, sleep strain, and body tightness."],
  ["weight-loss", "Ayurvedic Weight Loss in Kerala", "Sustainable Ayurvedic weight management with detox support, movement routines, and practical lifestyle guidance."],
  ["knee-pain", "Knee Pain Treatment in Kerala", "Conservative knee pain care for stiffness, walking pain, stair discomfort, joint overload, and mobility support."],
  ["facial-paralysis", "Facial Paralysis Support in Kerala", "Supportive Ayurvedic and neuromuscular care for facial weakness, stiffness, and recovery comfort."],
  ["parkinson-support", "Parkinson Support Therapy in Kerala", "Supportive mobility, posture, stiffness, relaxation, and wellness routines for Parkinsonian symptoms."],
  ["slip-disc", "Slip Disc Treatment in Kerala", "Non-surgical support for slipped disc, bulging disc, lower back pain, radiating leg pain, and nerve irritation."],
];

const treatments = [
  ["panchakarma", "Panchakarma Therapy in Kerala", "Traditional Panchakarma detoxification and rejuvenation therapy at Chiro Care Ayurvedic Clinic in Ernakulam."],
  ["abhyanga", "Abhyanga Therapy in Kerala", "Warm herbal oil Abhyanga massage for circulation, relaxation, joint comfort, and whole-body nourishment."],
  ["kizhi-therapy", "Kizhi Therapy in Kerala", "Warm herbal poultice therapy for joint stiffness, back pain, neck pain, and muscle soreness."],
  ["njavarakizhi", "Njavarakizhi Therapy in Kerala", "Nourishing Ayurvedic poultice therapy using medicated Njavara rice for weakness, pain, rejuvenation, and muscle support."],
  ["shirodhara", "Shirodhara Therapy in Kerala", "Forehead oil-flow therapy for relaxation, stress support, sleep quality, and migraine-related tension."],
  ["pizhichil", "Pizhichil Therapy in Kerala", "Warm medicated oil therapy combining rhythmic massage and oil bathing for stiffness, weakness, and nervous-system relaxation."],
  ["nasya", "Nasya Therapy in Kerala", "Ayurvedic nasal therapy support for sinus discomfort, headaches, neck stiffness, and breathing comfort."],
  ["detox-programs", "Ayurvedic Detox Programs in Kerala", "Guided Ayurvedic detox programs for digestion, bloating, sluggishness, seasonal reset, and wellness support."],
  ["weight-management", "Ayurvedic Weight Management in Kerala", "Natural weight management with Ayurvedic routines, detox care, activity support, and sustainable habits."],
  ["skin-care", "Ayurvedic Skin Care in Kerala", "Ayurvedic skin-care support with herbal packs, cleansing routines, and wellness guidance for clearer and healthier-looking skin."],
];

const blogs = [
  ["benefits-of-ayurveda", "The Holistic Benefits of Ayurveda for Modern Life", "How Ayurveda supports balance, immunity, digestion, stress reduction, and everyday wellness."],
  ["chiropractic-care-explained", "Understanding Chiropractic Care: Myths vs. Facts", "A practical guide to chiropractic care, spinal alignment, nerve function, and first-visit expectations."],
  ["managing-sciatica-naturally", "How to Manage Sciatica Pain Naturally Without Surgery", "Natural sciatica care using spinal decompression concepts, Ayurvedic oil support, posture, and home routines."],
  ["migraine-relief-tips", "5 Ayurvedic and Postural Tips for Chronic Migraine Relief", "Simple daily habits, posture corrections, and Ayurvedic care ideas for migraine trigger reduction."],
  ["joint-pain-solutions", "Integrated Solutions for Osteoarthritis and Joint Wear", "How joint alignment, Ayurvedic oil therapies, diet, and mobility routines support osteoarthritis care."],
  ["healthy-lifestyle-habits", "Daily Dinacharya: Ayurvedic Habits for Lasting Energy", "Ayurvedic daily routines for energy, digestion, sleep, detoxification, and mental clarity."],
];

const localSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": `${siteUrl}/#clinic`,
  name: siteName,
  url: siteUrl,
  telephone: "+91-6282018754",
  email: "info@chirocareclinic.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "BRRA 46, Bank Road, Metro pillar 567, Avenue 5th, Kaloor",
    addressLocality: "Ernakulam",
    addressRegion: "Kerala",
    postalCode: "682017",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.003362,
    longitude: 76.299104,
  },
};

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const pageHtml = ({ path, title, description, type = "WebPage", body }) => {
  const canonical = `${siteUrl}${path}`;
  const schema = [
    localSchema,
    {
      "@context": "https://schema.org",
      "@type": type,
      name: title,
      headline: title,
      description,
      url: canonical,
      dateModified: today,
      isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl },
    },
  ];

  const headTags = [
    `<title>${escapeHtml(title)} | ${siteName}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${escapeHtml(title)} | ${siteName}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)} | ${siteName}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
  ].join("\n    ");

  return sourceHtml
    .replace(/<title>.*?<\/title>/, "")
    .replace("</head>", `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
};

const detailBody = ({ title, description, eyebrow, items }) => `
  <main class="seo-prerender" aria-label="${escapeHtml(title)}">
    <section>
      <p>${escapeHtml(eyebrow)}</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(description)}</p>
      <h2>What this page covers</h2>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <p>Visit Chiro Care Ayurvedic Clinic in Kaloor, Ernakulam or call +91 6282018754 to request an appointment.</p>
    </section>
  </main>`;

const pages = [
  ["/contact", "Contact Ayurvedic Clinic in Kaloor Ernakulam", "Book an appointment at Chiro Care Ayurvedic Clinic in Kaloor, Ernakulam. Get directions, phone numbers, WhatsApp booking, clinic address, and working hours.", "ContactPage"],
  ["/services", "Ayurvedic Pain Treatment Services in Kerala", "Browse Ayurveda-informed chiropractic services for migraine, back pain, sciatica, disc problems, shoulder pain, cervical spondylosis, and joint pain.", "CollectionPage"],
  ["/treatments", "Panchakarma and Ayurvedic Treatments in Kerala", "Explore Ayurvedic therapies including Panchakarma, Shirodhara, Abhyanga, Kizhi, Nasya, detox programs, and weight management.", "CollectionPage"],
  ["/blog", "Health and Wellness Blog", "Read natural healing articles about sciatica, migraine, joint health, Ayurveda, chiropractic care, and daily wellness habits.", "Blog"],
  ...services.map(([slug, title, description]) => [`/services/${slug}`, title, description, "MedicalWebPage"]),
  ...treatments.map(([slug, title, description]) => [`/treatments/${slug}`, title, description, "MedicalWebPage"]),
  ...blogs.map(([slug, title, description]) => [`/blog/${slug}`, title, description, "BlogPosting"]),
];

for (const [path, title, description, type] of pages) {
  const html = pageHtml({
    path,
    title,
    description,
    type,
    body: detailBody({
      title,
      description,
      eyebrow: "Chiro Care Ayurvedic Clinic, Kaloor, Ernakulam",
      items: [
        "Kerala-focused local SEO landing content",
        "Canonical URL, OpenGraph, Twitter Card, and JSON-LD metadata",
        "Crawler-readable page copy before the React app loads",
      ],
    }),
  });
  const outputDir = join(distDir, path);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html, "utf8");
}

console.log(`SEO prerendered ${pages.length} routes.`);

const sitemapRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/treatments", priority: "0.9", changefreq: "weekly" },
  { path: "/gallery", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.9", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  ...services.map(([slug]) => ({ path: `/services/${slug}`, priority: "0.85", changefreq: "monthly" })),
  ...treatments.map(([slug]) => ({ path: `/treatments/${slug}`, priority: "0.8", changefreq: "monthly" })),
  ...blogs.map(([slug]) => ({ path: `/blog/${slug}`, priority: "0.65", changefreq: "monthly" })),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (r) =>
      `  <url><loc>${siteUrl}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
  )
  .join("\n")}
</urlset>\n`;

await writeFile(join(distDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf8");
console.log(`Generated sitemap.xml with ${sitemapRoutes.length} URLs using ${siteUrl}.`);
