import { blogs } from "../data/blogs";
import { services } from "../data/services";
import { treatments } from "../data/treatments";

export const SITE_URL = "https://chirocare.co.in";
export const SITE_NAME = "Chiro Care Ayurvedic Clinic";
export const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export const clinicContact = {
  phone: "+91-6282018754",
  whatsapp: "+916282018754",
  email: "info@chirocareclinic.in",
  address:
    "BRRA 46, Bank Road, Metro pillar 567, Avenue 5th, Kaloor, Ernakulam, Kerala 682017",
  locality: "Ernakulam",
  region: "Kerala",
  postalCode: "682017",
  country: "IN",
  latitude: 9.995452,
  longitude: 76.2966425,
  googleMapsUrl:
    "https://www.google.com/maps/place/Chiro+Care+Ayurveda+Treatment+Centre+Kochi/@9.995452,76.2966425,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080de7495059df:0x5dd2d9429acba5d8!8m2!3d9.995452!4d76.2966425!16s%2Fg%2F11zc_bh_5g",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.351052673322!2d76.2966425!3d9.995452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080de7495059df%3A0x5dd2d9429acba5d8!2sChiro%20Care%20Ayurveda%20Treatment%20Centre%20Kochi!5e0!3m2!1sen!2sin!4v1726814768000!5m2!1sen!2sin",
};

export const faqs = [
  {
    question: "Which conditions does Chiro Care Ayurvedic Clinic treat?",
    answer:
      "The clinic supports people with back pain, neck pain, migraine, sciatica, disc problems, shoulder pain, cervical spondylosis, joint pain, posture issues, and wellness concerns using Ayurveda-informed therapies and chiropractic care.",
  },
  {
    question: "Where is Chiro Care Ayurvedic Clinic located?",
    answer:
      "Chiro Care Ayurvedic Clinic is located at BRRA 46, Bank Road, near Metro pillar 567, Kaloor, Ernakulam, Kerala 682017.",
  },
  {
    question: "How can I book an appointment?",
    answer:
      "You can call the clinic desk at +91 6282018754 or use the WhatsApp appointment form on the website to request a consultation slot.",
  },
  {
    question: "Does the clinic offer Panchakarma and Ayurvedic therapies?",
    answer:
      "Yes. The website lists Ayurvedic therapies including Panchakarma, Abhyanga, Kizhi Therapy, Shirodhara, Nasya, detox programs, and weight management support.",
  },
];

export const routeEntries = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/treatments", priority: "0.9", changefreq: "weekly" },
  { path: "/gallery", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.9", changefreq: "monthly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    priority: "0.85",
    changefreq: "monthly",
  })),
  ...treatments.map((treatment) => ({
    path: `/treatments/${treatment.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  })),
  ...blogs.map((blog) => ({
    path: `/blog/${blog.slug}`,
    priority: "0.65",
    changefreq: "monthly",
  })),
];

export const getClinicSchema = (description: string, image = DEFAULT_IMAGE) => ({
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": `${SITE_URL}/#clinic`,
  name: SITE_NAME,
  alternateName: "Chiro Care Clinic",
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  image,
  description,
  telephone: clinicContact.phone,
  email: clinicContact.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "BRRA 46, Bank Road, Metro pillar 567, Avenue 5th, Kaloor",
    addressLocality: clinicContact.locality,
    addressRegion: clinicContact.region,
    postalCode: clinicContact.postalCode,
    addressCountry: clinicContact.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: clinicContact.latitude,
    longitude: clinicContact.longitude,
  },
  hasMap: clinicContact.googleMapsUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  areaServed: [
    "Kaloor",
    "Ernakulam",
    "Kochi",
    "Kerala",
    "India",
  ],
  medicalSpecialty: ["Ayurvedic", "Chiropractic", "PainManagement"],
  knowsAbout: [
    "Ayurvedic clinic Kerala",
    "Panchakarma Kerala",
    "Back pain treatment Kerala",
    "Migraine treatment Ayurveda Kerala",
    "Sciatica treatment Kerala",
  ],
});

export const getFaqSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const getBreadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});
