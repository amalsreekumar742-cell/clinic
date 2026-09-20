import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");
const sourceHtml = await readFile(join(distDir, "index.html"), "utf8");
const siteUrl = "https://chirocare.co.in";
const siteName = "Chiro Care Ayurvedic Clinic";
const defaultOgImage = `${siteUrl}/logo.png`;

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

// 18 Active Services with Authentic Clinical Data
const servicesData = [
  {
    slug: "whole-back-pain",
    title: "Whole Back Pain Treatment in Kerala",
    shortDesc: "Complete spine care for upper, mid, and lower back pain combining Ayurvedic therapies and non-surgical chiropractic adjustments.",
    longDesc: "Whole back pain can severely restrict daily mobility and quality of life. At Chiro Care, we provide an integrated rehabilitation plan combining full-spine chiropractic alignments, herbal steam baths (Upanaha), and warm medicated oil applications (Abhyanga) to strengthen spinal musculature, relieve trigger points, and soothe compressed nerve roots.",
    duration: "4 - 8 Weeks Program",
    benefits: [
      "Provides lasting relief to upper, mid, and lower back muscles",
      "Releases deep spinal muscular trigger points and spasms",
      "Corrects slouching posture and rounded shoulder alignment",
      "Improves daily spinal flexibility, stamina, and vital movement"
    ],
    symptoms: ["Dull aching back", "Difficulty bending forward", "Muscle spasms", "Morning spine stiffness"],
    faqs: [
      {
        question: "Who is whole back pain treatment suitable for?",
        answer: "It is suitable for people suffering from chronic upper, mid, or lower back pain, posture strain from desk work, and spinal muscular tightness seeking drug-free conservative care."
      },
      {
        question: "How does Chiro Care approach whole back pain?",
        answer: "Our team assesses full spine alignment, muscle tension, and lifestyle habits before combining gentle chiropractic joint mobilization with warm Ayurvedic herbal therapies."
      },
      {
        question: "How do I book a consultation?",
        answer: "You can call our clinic desk at +91 6282018754 or message us on WhatsApp to schedule an appointment at our Kaloor, Ernakulam clinic."
      }
    ]
  },
  {
    slug: "sciatica",
    title: "Sciatica Treatment in Kerala",
    shortDesc: "Targeted decompression and Ayurvedic nerve-soothing therapies to relieve sciatic nerve pain, tingling, and numbness.",
    longDesc: "Sciatica is characterized by shooting pain, tingling, or numbness originating in the lower back and radiating down through the buttock and leg. We target the spinal root compression through gentle chiropractic adjustments and combine it with specialized Ayurvedic herbal decoctions, Kati Basti, and steam therapy to calm irritated nerves and restore walking comfort.",
    duration: "4 - 8 Weeks Program",
    benefits: [
      "Relieves sharp radiating pain along the sciatic nerve pathway",
      "Restores walking ability, standing comfort, and leg stamina",
      "Releases deep piriformis and lower back muscle tension",
      "Nourishes nerve tissues and enhances lower limb blood circulation"
    ],
    symptoms: ["Shooting leg pain", "Numbness in foot or calf", "Pain while sitting", "Lower limb weakness"],
    faqs: [
      {
        question: "What causes sciatica pain?",
        answer: "Sciatica is typically caused by lumbar disc herniation, spinal stenosis, or piriformis muscle spasms compressing the sciatic nerve."
      },
      {
        question: "Does Chiro Care offer non-surgical sciatica treatment?",
        answer: "Yes. We focus on conservative, non-surgical therapies integrating chiropractic decompression techniques and Ayurvedic neuro-supportive herbal oil applications."
      },
      {
        question: "How soon can patients experience relief?",
        answer: "Most patients notice gradual reduction in acute nerve tingling and muscle tension within the first few weeks of consistent therapy."
      }
    ]
  },
  {
    slug: "cervical-spondylosis",
    title: "Cervical Spondylosis Treatment in Kerala",
    shortDesc: "Nourishing neck treatments and gentle mobilization to relieve age-related wear, stiffness, and radiating arm pain.",
    longDesc: "Cervical Spondylosis involves wear and tear of the spinal discs and vertebrae in the neck. Our clinical program incorporates Greeva Basti (retaining warm herbal oils on the cervical area), gentle chiropractic mobilization, and customized neck exercises to lubricate joints, decompress cervical nerve roots, and relieve chronic stiffness.",
    duration: "4 - 6 Weeks Program",
    benefits: [
      "Relieves neck pain, stiffness, and clicking sounds during movement",
      "Eases radiating arm numbness and tingling in hands",
      "Improves blood circulation to the head, reducing cervical vertigo",
      "Restores natural range of motion to the cervical spine"
    ],
    symptoms: ["Stiff neck movement", "Numbness in fingers", "Dizziness or vertigo", "Shoulder ache"],
    faqs: [
      {
        question: "Can cervical spondylosis be managed without surgery?",
        answer: "Yes, mild to moderate cervical wear responds very well to conservative chiropractic alignment, Greeva Basti, and posture correction."
      },
      {
        question: "Does cervical spondylosis cause dizziness?",
        answer: "Yes, cervical nerve irritation and muscle tension can compromise local blood flow, leading to cervicogenic dizziness or vertigo."
      },
      {
        question: "What is Greeva Basti?",
        answer: "Greeva Basti is an Ayurvedic therapy where a dam of black gram dough is placed on the neck and filled with warm medicated herbal oil to deeply nourish cervical vertebrae."
      }
    ]
  },
  {
    slug: "disc-problems",
    title: "Disc Problems Treatment in Kerala",
    shortDesc: "Non-surgical care for herniated, bulging, or degenerative discs using spinal decompression and Ayurvedic Kati Basti.",
    longDesc: "Bulging, herniated, or degenerated spinal discs can pinch spinal nerves, triggering severe localized and radiating pain. We offer an integrative non-surgical approach combining gentle spinal mobilization to reduce mechanical disc pressure and Ayurvedic Kati Basti to reduce inflammation and promote disc nourishment.",
    duration: "6 - 12 Weeks Program",
    benefits: [
      "Decreases nerve compression and radiating extremity pain",
      "Nourishes spinal discs and surrounding ligament structures",
      "Enhances spinal stability, core support, and mobility",
      "Provides a structured, non-invasive alternative to surgery"
    ],
    symptoms: ["Severe back pain", "Numbness in legs", "Sharp radiating pain", "Loss of flexibility"],
    faqs: [
      {
        question: "Can a bulging disc heal without surgery?",
        answer: "Many bulging and herniated discs heal conservatively through spinal decompression, inflammation reduction, and core muscle strengthening."
      },
      {
        question: "What is Kati Basti for disc problems?",
        answer: "Kati Basti is a specialized Ayurvedic treatment where warm medicated oil is pooled over the lumbar spine to relieve deep disc pressure and relax muscles."
      },
      {
        question: "How can I get started?",
        answer: "Contact Chiro Care Clinic at +91 6282018754 for a consultation and spine mobility assessment."
      }
    ]
  },
  {
    slug: "knee-pain",
    title: "Knee Pain Treatment in Kerala",
    shortDesc: "Conservative knee pain care for osteoarthritis, stiffness, walking discomfort, and joint wear.",
    longDesc: "Knee pain can stem from osteoarthritis, ligament strain, posture asymmetry, or altered walking mechanics. We evaluate hip, ankle, and knee alignment together, providing targeted joint mobilization, warm Ayurvedic Janu Basti, and therapeutic oil massage to nourish cartilage and improve walking comfort.",
    duration: "4 - 8 Weeks Program",
    benefits: [
      "Improves walking comfort and stair-climbing ease",
      "Reduces chronic knee stiffness and clicking sensations",
      "Supports natural joint lubrication and cartilage health",
      "Corrects lower extremity mechanical imbalances"
    ],
    symptoms: ["Knee stiffness", "Pain climbing stairs", "Walking discomfort", "Joint clicking sounds"],
    faqs: [
      {
        question: "How does Janu Basti help knee osteoarthritis?",
        answer: "Janu Basti pools warm herbal medicated oil around the knee joint to reduce friction, nourish tissues, and relieve chronic stiffness."
      },
      {
        question: "Can I avoid knee replacement surgery?",
        answer: "Conservative Ayurvedic therapies and joint mobilization can significantly reduce pain and delay or prevent surgery in early-to-moderate stages."
      },
      {
        question: "Where is the clinic located?",
        answer: "Chiro Care Clinic is located at BRRA 46, Bank Road, near Metro pillar 567, Kaloor, Ernakulam."
      }
    ]
  },
  {
    slug: "migraine-treatment",
    title: "Migraine Treatment in Kerala",
    shortDesc: "Comprehensive Ayurvedic and chiropractic care to address the root vascular, cervical, and metabolic triggers of migraines.",
    longDesc: "Chronic migraines frequently involve cervical spine misalignment, muscular tension, and constitutional Dosha imbalances. Our treatment combines gentle cervical adjustments to release neural tension with soothing Ayurvedic Shirodhara and herbal therapies to balance the nervous system and reduce attack frequency.",
    duration: "4 - 6 Weeks Program",
    benefits: [
      "Reduces frequency, intensity, and duration of migraine attacks",
      "Relieves chronic muscular tightness in the neck and shoulders",
      "Calms nervous system hyperactivity and stress triggers",
      "Improves sleep quality and decreases dependency on pain pills"
    ],
    symptoms: ["Throbbing head pain", "Nausea & sensitivity to light", "Neck stiffness", "Visual aura"],
    faqs: [
      {
        question: "How do neck misalignments cause migraines?",
        answer: "Restrictions in the upper cervical spine can irritate occipital nerves and alter cranial blood flow, triggering or worsening migraine attacks."
      },
      {
        question: "What Ayurvedic therapies are used for migraines?",
        answer: "Shirodhara (continuous warm oil flow on forehead), Nasya (nasal drops), and specific herbal preparations are commonly used."
      },
      {
        question: "How do I schedule a consultation?",
        answer: "Call +91 6282018754 to book an appointment with our clinical team in Kaloor, Kochi."
      }
    ]
  },
  {
    slug: "shoulder-pain",
    title: "Shoulder Pain Treatment in Kerala",
    shortDesc: "Effective non-surgical therapies for frozen shoulder, rotator cuff strain, bursitis, and limited arm mobility.",
    longDesc: "Whether suffering from frozen shoulder (adhesive capsulitis) or rotator cuff strain, our clinic offers holistic recovery. We combine gentle chiropractic joint mobilization to restore scapular mechanics with Ayurvedic Podikizhi (warm herbal powder poultice) to relieve inflammation and restore full arm range of motion.",
    duration: "3 - 6 Weeks Program",
    benefits: [
      "Restores overhead and behind-the-back arm mobility",
      "Reduces deep shoulder inflammation and nighttime ache",
      "Strengthens surrounding rotator cuff and upper back muscles",
      "Breaks down chronic joint capsule adhesions safely"
    ],
    symptoms: ["Frozen shoulder", "Inability to lift arm", "Sharp pain on movement", "Joint stiffness"],
    faqs: [
      {
        question: "Can frozen shoulder be treated without injections?",
        answer: "Yes, regular Ayurvedic thermal poultice treatments combined with gentle joint mobilization help restore movement safely."
      },
      {
        question: "How many sessions are typically required?",
        answer: "Most shoulder rehabilitation programs run for 3 to 6 weeks depending on severity and chronicity."
      },
      {
        question: "How do I book an appointment?",
        answer: "Call +91 6282018754 or use the contact form to reserve your consultation slot."
      }
    ]
  },
  {
    slug: "neck-pain",
    title: "Neck Pain Treatment in Kerala",
    shortDesc: "Ayurveda-informed care for stiff neck, text neck, cervical strain, and posture-induced soreness.",
    longDesc: "Modern desk work, phone usage, and poor ergonomics put intense pressure on cervical vertebrae and muscles. We combine ergonomic assessments, gentle cervical mobilization, and warm Ayurvedic herbal oil therapies to release muscle spasms, restore curvature, and alleviate chronic neck fatigue.",
    duration: "2 - 6 Weeks Program",
    benefits: [
      "Relieves cervical muscle knots and chronic stiffness",
      "Improves posture and corrects forward head posture (text neck)",
      "Reduces recurrence of tension headaches and shoulder tightness",
      "Enhances neck rotation and daily desk-work comfort"
    ],
    symptoms: ["Stiff neck", "Text neck fatigue", "Shoulder tightness", "Reduced neck rotation"],
    faqs: [
      {
        question: "What is text neck?",
        answer: "Text neck refers to strain on the cervical spine caused by tilting the head forward and down for prolonged periods while using screens."
      },
      {
        question: "What therapies help relieve neck pain?",
        answer: "Gentle chiropractic mobilization, Greeva Basti, herbal steam, and ergonomic corrections provide lasting relief."
      },
      {
        question: "How do I contact the clinic?",
        answer: "Call our desk at +91 6282018754 to book your consultation."
      }
    ]
  },
  {
    slug: "slip-disc",
    title: "Slip Disc Treatment in Kerala",
    shortDesc: "Non-surgical support for slipped disc, nerve compression, and radiating back or leg pain.",
    longDesc: "Slip disc or disc extrusion occurs when the soft inner gel pushes through the outer ring, irritating nearby nerve roots. Our conservative care integrates decompression-oriented spinal alignments, warm herbal Kati Basti, and safe mobility guidance to resolve pain and restore functional movement without surgery.",
    duration: "6 - 12 Weeks Program",
    benefits: [
      "Relieves acute nerve root irritation and burning pain",
      "Improves lower back mobility, sitting stamina, and comfort",
      "Nourishes weakened spinal connective tissues naturally",
      "Provides structured guidance on safe bending, lifting, and posture"
    ],
    symptoms: ["Severe lower back pain", "Radiating leg pain", "Tingling or numbness", "Pain while sitting"],
    faqs: [
      {
        question: "Is surgery always necessary for a slip disc?",
        answer: "No. The vast majority of slip disc cases can be managed effectively through conservative chiropractic and Ayurvedic spine therapies."
      },
      {
        question: "What should I avoid with a slip disc?",
        answer: "Avoid heavy lifting, sudden twisting movements, and prolonged slouching while your spine heals."
      },
      {
        question: "How can I book an assessment?",
        answer: "Call +91 6282018754 to schedule your spine evaluation at Chiro Care Clinic."
      }
    ]
  },
  {
    slug: "headache-treatment",
    title: "Headache Treatment in Kerala",
    shortDesc: "Natural therapies and spinal alignment to alleviate tension, sinus, and cervicogenic headaches.",
    longDesc: "Chronic headaches often originate from underlying spinal misalignments, tight neck muscles, or sinus congestion. We offer customized treatment plans that merge gentle cervical adjustments with herbal oil applications and lifestyle modifications to release tension and improve blood circulation to the head.",
    duration: "2 - 4 Weeks Program",
    benefits: [
      "Provides rapid relief from chronic tension headaches",
      "Corrects posture related to desk strain and eye fatigue",
      "Clears sinus pathways through natural Ayurvedic Nasya",
      "Decreases dependency on over-the-counter pain medications"
    ],
    symptoms: ["Tension in temples", "Sinus pressure", "Forehead throbbing", "Eye strain"],
    faqs: [
      {
        question: "What is a cervicogenic headache?",
        answer: "A cervicogenic headache is a secondary headache caused by irritation or misalignment in the cervical spine radiating into the head."
      },
      {
        question: "How does chiropractic care help headaches?",
        answer: "Gentle adjustments release tension in the suboccipital muscles and upper cervical vertebrae, removing nerve irritation."
      },
      {
        question: "Where can I book an appointment?",
        answer: "Reach out via phone at +91 6282018754 to book your appointment in Kaloor, Kochi."
      }
    ]
  },
  {
    slug: "scoliosis",
    title: "Scoliosis Support in Kerala",
    shortDesc: "Gentle chiropractic adjustments and posture training to manage spinal curvature and asymmetric back tension.",
    longDesc: "Scoliosis involves an abnormal sideways curvature of the spine. Mild to moderate scoliosis benefits significantly from structural chiropractic adjustments, targeted muscle-balancing exercises, and Ayurvedic muscle-relaxing massages to balance asymmetric muscular strain.",
    duration: "Ongoing Maintenance Program",
    benefits: [
      "Slows down curvature progression and stabilizes the spine",
      "Reduces asymmetric back muscle strain, stiffness, and pain",
      "Improves structural posture, balance, and breathing ease",
      "Enhances daily vitality and functional mobility"
    ],
    symptoms: ["Uneven shoulders", "Prominent shoulder blade", "Uneven waistline", "Leaning to one side"],
    faqs: [
      {
        question: "Can scoliosis be corrected without surgery?",
        answer: "Mild to moderate scoliosis can be effectively managed and stabilized through posture rehabilitation, chiropractic adjustments, and muscle balancing."
      },
      {
        question: "What exercises help scoliosis?",
        answer: "Core strengthening, targeted asymmetric stretching, and posture awareness exercises help balance muscle tone."
      },
      {
        question: "How do I book a consultation?",
        answer: "Call +91 6282018754 to schedule an appointment with our spine specialists."
      }
    ]
  },
  {
    slug: "leg-length-measurement",
    title: "Leg Length Measurement in Kerala",
    shortDesc: "Precise structural analysis and spinal corrections to resolve functional leg length discrepancies and pelvic tilt.",
    longDesc: "Functional leg length discrepancy is frequently caused by pelvic tilt or spinal misalignments. We perform mechanical assessments to detect discrepancies, followed by specific pelvic adjustments and posture therapies to rebalance gait and prevent asymmetric hip and back wear.",
    duration: "2 - 4 Weeks Program",
    benefits: [
      "Corrects pelvic tilt and restores walking symmetry",
      "Reduces asymmetric wear on hip, knee, and ankle joints",
      "Alleviates compensatory lower back soreness and muscle fatigue",
      "Improves balance, athletic performance, and endurance"
    ],
    symptoms: ["Uneven shoe wear", "Limping or uneven gait", "Chronic hip discomfort", "One-sided lower back soreness"],
    faqs: [
      {
        question: "What causes functional leg length discrepancy?",
        answer: "Pelvic tilt, sacroiliac joint dysfunction, and lumbar scoliosis are the most common causes of functional leg length differences."
      },
      {
        question: "How is it corrected?",
        answer: "Through gentle chiropractic pelvic adjustments, muscle release therapies, and gait retraining."
      },
      {
        question: "How do I book an assessment?",
        answer: "Contact Chiro Care Clinic at +91 6282018754."
      }
    ]
  },
  {
    slug: "whole-body-joint-pain",
    title: "Whole Body Joint Pain Treatment in Kerala",
    shortDesc: "Systemic detoxification and natural joint lubrication to soothe multiple aching joints.",
    longDesc: "Generalized joint pain can stem from systemic inflammation, toxic accumulation (Ama in Ayurveda), or metabolic stress. We address this using authentic Ayurvedic purification (Panchakarma) alongside structural checks to optimize body mechanics and restore joint synergy.",
    duration: "6 - 10 Weeks Program",
    benefits: [
      "Lowers full-body systemic inflammation markers naturally",
      "Lubricates dry, creaking joints through medicated oil therapies",
      "Flushes out metabolic toxins from deep joint capsules",
      "Improves mobility in knees, ankles, hips, wrists, and spine"
    ],
    symptoms: ["Cracking joint sounds", "Stiffness in multiple joints", "Generalized body aches", "Morning stiffness"],
    faqs: [
      {
        question: "What causes multiple joint aches in Ayurveda?",
        answer: "In Ayurveda, accumulation of Ama (undigested toxins) combined with vitiated Vata dosha causes dryness and pain across joints."
      },
      {
        question: "How does Panchakarma help joint pain?",
        answer: "Panchakarma detoxifies tissues at the cellular level and restores natural joint lubrication."
      },
      {
        question: "How can I book a consultation?",
        answer: "Call our reception at +91 6282018754 to book your consultation."
      }
    ]
  },
  {
    slug: "arthritis-treatment",
    title: "Arthritis Treatment in Kerala",
    shortDesc: "Natural joint-care support for arthritic stiffness, swelling, and mobility restriction.",
    longDesc: "Arthritis requires a holistic care plan that minimizes joint friction while supporting natural cartilage lubrication. Chiro Care combines gentle mobility work, warm Ayurvedic oil therapies, dietary guidelines, and joint-nourishing therapies to keep you active.",
    duration: "6 - 10 Weeks Program",
    benefits: [
      "Supports natural joint lubrication and daily comfort",
      "Reduces morning stiffness and inflammatory joint swelling",
      "Improves functional range of motion and grip strength",
      "Encourages sustainable, active lifestyle habits safely"
    ],
    symptoms: ["Joint stiffness", "Morning soreness", "Swelling around joints", "Reduced mobility"],
    faqs: [
      {
        question: "Can Ayurveda help with osteoarthritis?",
        answer: "Yes, classical therapies like Janu Basti, Abhyanga, and herbal formulations help nourish joint tissues and ease stiffness."
      },
      {
        question: "Is joint mobilization safe for arthritis?",
        answer: "Yes, our mobilization is very gentle, non-force, and tailored specifically to the patient's joint comfort level."
      },
      {
        question: "How do I book an appointment?",
        answer: "Call +91 6282018754 or use the contact form to reserve your session."
      }
    ]
  },
  {
    slug: "sports-injury",
    title: "Sports Injury Treatment in Kerala",
    shortDesc: "Rehabilitation support for athletic strains, sprains, joint overload, and faster recovery.",
    longDesc: "Athletic recovery demands restoring structural mechanics while accelerating soft-tissue healing. We evaluate joint mechanics, muscular imbalances, and training loads before creating a tailored plan using chiropractic adjustments, Ayurvedic herbal compresses, and mobility conditioning.",
    duration: "3 - 8 Weeks Program",
    benefits: [
      "Accelerates natural tissue recovery and reduces downtime",
      "Improves joint stability, balance, and athletic agility",
      "Prevents recurring strain patterns and chronic weakness",
      "Builds safer biomechanical habits for long-term fitness"
    ],
    symptoms: ["Muscle sprains", "Ligament strain", "Overuse ache", "Reduced athletic mobility"],
    faqs: [
      {
        question: "How quickly can athletes return to sport?",
        answer: "Recovery timelines depend on injury severity, but integrative care helps speed up safe tissue healing."
      },
      {
        question: "What therapies are used for sports injuries?",
        answer: "Chiropractic alignment, Kizhi herbal poultice, deep tissue mobilization, and active recovery exercises."
      },
      {
        question: "How do I book an assessment?",
        answer: "Call +91 6282018754 to schedule an evaluation."
      }
    ]
  },
  {
    slug: "stress-anxiety",
    title: "Stress and Anxiety Support in Kerala",
    shortDesc: "Calming Ayurvedic therapies and posture care for stress-related tension, fatigue, and poor sleep.",
    longDesc: "Chronic stress physically manifests as tight neck muscles, shallow breathing, headaches, and insomnia. Our therapies focus on nervous system calming through soothing Shirodhara, warm full-body Abhyanga, and gentle upper thoracic posture release.",
    duration: "2 - 6 Weeks Program",
    benefits: [
      "Calms nervous system hyperactivity and promotes deep sleep",
      "Releases stress-induced tightness in shoulders and neck",
      "Supports emotional balance and reduces mental fatigue",
      "Restores energy vitality and balanced daily rhythms"
    ],
    symptoms: ["Chronic stress tension", "Poor sleep", "Physical fatigue", "Anxiety tightness"],
    faqs: [
      {
        question: "How does Shirodhara help stress and anxiety?",
        answer: "The continuous stream of warm herbal oil on the forehead calms brain waves into an alpha state, inducing profound relaxation."
      },
      {
        question: "How many sessions are recommended?",
        answer: "A course of 5 to 7 Shirodhara sessions is typically recommended for chronic stress and sleep disturbances."
      },
      {
        question: "How do I book a session?",
        answer: "Call +91 6282018754 to book your wellness session."
      }
    ]
  },
  {
    slug: "weight-loss",
    title: "Ayurvedic Weight Loss in Kerala",
    shortDesc: "Sustainable Ayurvedic weight management with herbal Udvarthanam, detox support, and routine guidance.",
    longDesc: "Our weight management program centers on gradual, healthy metabolic reset rather than crash dieting. We combine Udvarthanam (dry herbal powder scrub that stimulates lymphatic flow) with internal detox therapies, digestive fire (Agni) support, and practical lifestyle habits.",
    duration: "8 - 12 Weeks Program",
    benefits: [
      "Stimulates metabolism and breaks down stagnant subcutaneous fat",
      "Enhances lymphatic drainage and clears metabolic wastes",
      "Improves energy levels, skin firmness, and vitality",
      "Encourages sustainable, healthy eating and daily habits"
    ],
    symptoms: ["Sluggish metabolism", "Cellulite accumulation", "Bloating and heaviness", "Low daily energy"],
    faqs: [
      {
        question: "What is Udvarthanam therapy?",
        answer: "Udvarthanam is an Ayurvedic deep tissue massage using warm herbal powders rubbed upward against the direction of hair growth to break down cellulite."
      },
      {
        question: "Does it require extreme fasting?",
        answer: "No, Ayurveda emphasizes balancing digestive Agni with nourishing, easily digestible whole foods."
      },
      {
        question: "How do I schedule a consultation?",
        answer: "Call +91 6282018754 to speak with our Ayurvedic doctor."
      }
    ]
  },
  {
    slug: "parkinson-support",
    title: "Parkinson Support Therapy in Kerala",
    shortDesc: "Supportive mobility, posture, stiffness, and wellness care for people managing Parkinsonian symptoms.",
    longDesc: "Parkinson's disease requires comprehensive, compassionate care. Our supportive program works alongside conventional medical treatment, focusing on maintaining joint mobility, relieving muscle rigidity, supporting posture balance, and promoting deep nervous-system relaxation.",
    duration: "Ongoing Support Program",
    benefits: [
      "Helps manage muscle rigidity, stiffness, and fatigue",
      "Supports posture balance, walking confidence, and mobility",
      "Provides deep nervous system relaxation through warm oil therapies",
      "Complements ongoing medical care safely and respectfully"
    ],
    symptoms: ["Muscle stiffness", "Posture changes", "Reduced mobility", "Balance concerns"],
    faqs: [
      {
        question: "Does Ayurvedic therapy cure Parkinson's disease?",
        answer: "No, Ayurveda does not claim to cure Parkinson's. Our program is strictly supportive, designed to relieve stiffness, enhance comfort, and improve quality of life alongside medical management."
      },
      {
        question: "What therapies are included?",
        answer: "Warm Abhyanga massage, Shirodhara, gentle range-of-motion work, and individualized lifestyle support."
      },
      {
        question: "How do I consult with the clinic?",
        answer: "Call +91 6282018754 to discuss your condition with our doctors."
      }
    ]
  }
];

// 8 Active Treatments with Authentic Clinical Data
const treatmentsData = [
  {
    slug: "panchakarma",
    title: "Panchakarma Therapy in Kerala",
    shortDesc: "The classical 5-stage purification therapy to completely detoxify tissues, reset digestion, and rejuvenate cellular vitality.",
    longDesc: "Panchakarma is Ayurveda's signature detoxification program. Guided by our experienced BAMS doctors, this therapeutic regimen eliminates deep-seated metabolic waste (Ama), balances the three Doshas (Vata, Pitta, Kapha), and resets digestive fire (Agni) through authentic classical stages.",
    duration: "7 - 21 Days Program",
    benefits: [
      "Purifies all bodily systems at the cellular level",
      "Boosts natural immunity and metabolic efficiency",
      "Restores optimal digestive power and nutrient absorption",
      "Slows down cellular degeneration and relieves chronic fatigue"
    ],
    indications: ["Chronic fatigue", "Metabolic disorders", "Systemic toxins", "Rheumatic conditions"],
    faqs: [
      {
        question: "What are the stages of Panchakarma?",
        answer: "Panchakarma consists of Purvakarma (preparation with oil massage and steam), Pradhanakarma (main cleansing therapies), and Paschatkarma (rejuvenating diet and lifestyle routines)."
      },
      {
        question: "How long is a typical Panchakarma course?",
        answer: "Programs typically range from 7, 14, to 21 days depending on the individual's health goals and doctor consultation."
      },
      {
        question: "How do I book a Panchakarma consultation?",
        answer: "Call +91 6282018754 to arrange your initial consultation in Kaloor, Kochi."
      }
    ]
  },
  {
    slug: "abhyanga",
    title: "Abhyanga Therapy in Kerala",
    shortDesc: "Full-body warm herbal oil massage designed to boost circulation, lubricate joints, and soothe the central nervous system.",
    longDesc: "Abhyanga is an authentic, rhythmic full-body warm herbal oil massage administered by trained Ayurvedic therapists. The medicated oils are customized based on your unique body constitution (Prakriti), promoting lymphatic drainage, calming Vata dosha, and relieving physical fatigue.",
    duration: "60 - 90 Mins Session",
    benefits: [
      "Soothes the central nervous system and relieves deep stress",
      "Promotes refreshing, sound sleep patterns",
      "Lubricates joints, nourishes muscles, and tones tissues",
      "Improves skin luster, elasticity, and circulation"
    ],
    indications: ["Insomnia", "Anxiety & stress", "Muscle fatigue", "Dry skin and joint stiffness"],
    faqs: [
      {
        question: "How is oil selected for Abhyanga?",
        answer: "Medicated herbal oils are selected dynamically depending on whether your constitution or current imbalance is predominantly Vata, Pitta, or Kapha."
      },
      {
        question: "What should I do after an Abhyanga session?",
        answer: "Rest, take a warm herbal bath, drink plenty of warm water, and avoid cold drafts or heavy meals."
      },
      {
        question: "How do I book an Abhyanga session?",
        answer: "Call our desk at +91 6282018754 to book your appointment."
      }
    ]
  },
  {
    slug: "kizhi-therapy",
    title: "Kizhi Therapy in Kerala",
    shortDesc: "Therapeutic massage using warm linen poultices filled with healing herbs, powders, or sand to relieve joint stiffness and pain.",
    longDesc: "Kizhi Therapy involves the rhythmic application of warm cloth bags (poultices) packed with medicinal leaves (Elakizhi/Patrapinda), herbal powders (Podikizhi/Choorna), or processed sand (Valuka). Dipped in warm medicated oils, the poultices reduce inflammation, ease muscle spasms, and improve joint flexibility.",
    duration: "45 - 60 Mins Session",
    benefits: [
      "Relieves joint pain, stiffness, and localized swelling",
      "Highly effective for lower back, neck, and shoulder soreness",
      "Enhances peripheral blood circulation and muscle warmth",
      "Accelerates recovery from musculoskeletal sprains and strains"
    ],
    indications: ["Osteoarthritis", "Cervical spondylosis", "Low back pain", "Muscle spasms"],
    faqs: [
      {
        question: "What is the difference between Podikizhi and Elakizhi?",
        answer: "Podikizhi uses medicated herbal powders, ideal for heavy stiffness and Kapha conditions. Elakizhi uses fresh medicated leaves, ideal for Vata-dominant joint pain and inflammation."
      },
      {
        question: "Is Kizhi painful?",
        answer: "No, Kizhi is a soothing, warm rhythmic tapping therapy that feels very comforting to stiff muscles and joints."
      },
      {
        question: "How do I book a Kizhi session?",
        answer: "Call +91 6282018754 to reserve your session at Chiro Care Clinic."
      }
    ]
  },
  {
    slug: "shirodhara",
    title: "Shirodhara Therapy in Kerala",
    shortDesc: "A continuous, gentle flow of warm medicated oil onto the forehead to trigger profound mental relaxation and emotional calm.",
    longDesc: "Shirodhara is a classical Ayurvedic therapy where a steady, rhythmic stream of warm herbal oil, buttermilk (Takradhara), or decoction is poured across the forehead (third-eye area). This triggers deep relaxation in the central nervous system, relieving mental clutter, anxiety, and sleep disorders.",
    duration: "45 - 60 Mins Session",
    benefits: [
      "Profoundly alleviates chronic stress, anxiety, and mental fatigue",
      "Regulates circadian sleep rhythms and helps manage insomnia",
      "Relieves tension headaches, neck strain, and migraine discomfort",
      "Improves memory focus, clarity, and emotional stability"
    ],
    indications: ["Chronic stress", "Insomnia", "Mental strain", "Migraines & tension"],
    faqs: [
      {
        question: "What does Shirodhara feel like?",
        answer: "It feels like a warm, rhythmic cascade across the forehead that lulls the mind into a meditative state of deep relaxation."
      },
      {
        question: "Can Shirodhara help with chronic insomnia?",
        answer: "Yes, Shirodhara is one of the most celebrated classical treatments for calming an overactive nervous system and restoring natural sleep patterns."
      },
      {
        question: "How do I schedule a session?",
        answer: "Call +91 6282018754 to book your Shirodhara session."
      }
    ]
  },
  {
    slug: "pizhichil",
    title: "Pizhichil Therapy in Kerala",
    shortDesc: "The luxurious 'King's Treatment' combining a warm medicated oil bath with soft rhythmic synchronized massage.",
    longDesc: "Pizhichil is an esteemed therapy where generous streams of warm medicated herbal oil are continuously poured over the body while trained therapists perform soft, synchronized rhythmic strokes. Combining thermal sweating (Swedana) and oleation (Snehana), it enhances neuromuscular vitality and relieves deep stiffness.",
    duration: "60 - 90 Mins Session",
    benefits: [
      "Highly beneficial in supporting neuromuscular recovery and joint comfort",
      "Relieves severe full-body muscle stiffness and aching joints",
      "Nourishes bodily tissues and protects from degenerative wear",
      "Restores systemic circulation and whole-body vitality"
    ],
    indications: ["Neuromuscular stiffness", "Arthritis", "Body weakness", "Rejuvenation"],
    faqs: [
      {
        question: "Why is Pizhichil called the King's Treatment?",
        answer: "Historically, Pizhichil was reserved for royalty in Kerala because of the generous quantity of medicated herbal oils and synchronized therapists required."
      },
      {
        question: "Who can take Pizhichil?",
        answer: "Anyone with severe muscle stiffness, joint wear, or anyone seeking restorative rejuvenation under doctor supervision."
      },
      {
        question: "How do I book a session?",
        answer: "Call our clinic at +91 6282018754 to schedule an appointment."
      }
    ]
  },
  {
    slug: "nasya",
    title: "Nasya Therapy in Kerala",
    shortDesc: "Therapeutic administration of herbal drops through the nasal passages to clear sinuses, headaches, and neck stiffness.",
    longDesc: "In Ayurveda, the nose is considered the gateway to the head and brain. Nasya involves the gentle administration of warm medicated herbal oils or juices through the nasal passages following face massage and mild steam. It eliminates accumulated toxins from the sinuses, neck, and head area.",
    duration: "30 Mins Session",
    benefits: [
      "Clears accumulated toxins from sinus cavities and nasal passages",
      "Relieves chronic sinus headaches, migraine pressure, and allergies",
      "Alleviates stiffness in the neck, jaw, and shoulder muscles",
      "Improves respiratory airflow, voice clarity, and sensory acuity"
    ],
    indications: ["Sinusitis", "Allergic rhinitis", "Cervical stiffness", "Chronic headaches"],
    faqs: [
      {
        question: "Is Nasya therapy uncomfortable?",
        answer: "A mild tingling sensation may occur as the herbal oil clears sinus pathways, but the therapy is gentle and followed by soothing herbal gargles."
      },
      {
        question: "How does Nasya help neck stiffness?",
        answer: "Nasya stimulates local cranial nerve endings and reduces muscular tension across the cervical and suboccipital region."
      },
      {
        question: "How do I book Nasya therapy?",
        answer: "Call +91 6282018754 to book your session."
      }
    ]
  },
  {
    slug: "steam-bath",
    title: "Herbal Steam Bath (Swedana) in Kerala",
    shortDesc: "Traditional herbal steam therapy (Bashpa Swedana) to open pores, eliminate toxins, and melt muscular stiffness.",
    longDesc: "Ayurvedic Steam Bath, or Bashpa Swedana, is a time-honored thermal therapy where the patient sits in a specialized wooden chamber while warm herbal-infused steam surrounds the body. This opens up microchannels (Srotas), liquefies metabolic toxins, improves circulation, and relaxes sore muscles.",
    duration: "20 - 30 Mins Session",
    benefits: [
      "Eliminates deep cellular metabolic toxins through natural perspiration",
      "Relieves generalized body stiffness, joint soreness, and muscle spasm",
      "Improves skin health and microcirculation",
      "Leaves the body feeling remarkably light, refreshed, and invigorated"
    ],
    indications: ["Full-body stiffness", "Muscle soreness", "Toxin build-up", "Circulatory sluggishness"],
    faqs: [
      {
        question: "Is the head exposed to steam during Swedana?",
        answer: "In classical Ayurveda, the head is kept cool while steam is applied only from the neck down to protect the eyes and brain."
      },
      {
        question: "Is steam bath done after oil massage?",
        answer: "Yes, Swedana is traditionally administered immediately after Abhyanga so the medicated oils penetrate deeper into tissues."
      },
      {
        question: "How do I schedule a session?",
        answer: "Call +91 6282018754 to book your session."
      }
    ]
  },
  {
    slug: "full-body-massage",
    title: "Ayurvedic Full Body Massage in Kerala",
    shortDesc: "Therapeutic and restorative full-body massage using warm herbal oils to rejuvenate muscles and soothe the mind.",
    longDesc: "Ayurvedic Full Body Massage is a deeply relaxing, therapeutic care session administered by certified practitioners using customized medicated herbal oils. It stimulates circulation, enhances lymphatic drainage, relaxes tight muscles, and soothes the nervous system to restore vitality.",
    duration: "60 - 90 Mins Session",
    benefits: [
      "Promotes deep physical relaxation and relieves muscular fatigue",
      "Enhances peripheral blood circulation and lymphatic drainage",
      "Nourishes skin texture and improves natural radiance",
      "Reduces daily stress, tension, and promotes restorative sleep"
    ],
    indications: ["Generalized body ache", "Physical fatigue", "Stress and anxiety", "Poor sleep"],
    faqs: [
      {
        question: "How does this differ from a commercial spa massage?",
        answer: "At Chiro Care, all massages use authentic medicinal herbal oils formulated for your body constitution under the guidance of BAMS doctors."
      },
      {
        question: "Can I take this therapy for general relaxation?",
        answer: "Yes, it is excellent for relieving weekly fatigue, stress, and muscle stiffness."
      },
      {
        question: "How do I book an appointment?",
        answer: "Call +91 6282018754 to reserve your slot."
      }
    ]
  }
];

// 6 Active Blogs
const blogsData = [
  {
    slug: "benefits-of-ayurveda",
    title: "The Holistic Benefits of Ayurveda for Modern Life",
    excerpt: "How Ayurveda supports balance, immunity, digestion, stress reduction, and everyday wellness.",
    author: "Dr. Neena James",
    date: "2026-05-10",
    tags: ["Ayurveda", "Wellness", "Holistic Health"]
  },
  {
    slug: "chiropractic-care-explained",
    title: "Understanding Chiropractic Care: Myths vs. Facts",
    excerpt: "A practical guide to chiropractic care, spinal alignment, nerve function, and first-visit expectations.",
    author: "Lijomon MJ",
    date: "2026-05-18",
    tags: ["Chiropractic", "Spine Health", "Pain Relief"]
  },
  {
    slug: "managing-sciatica-naturally",
    title: "How to Manage Sciatica Pain Naturally Without Surgery",
    excerpt: "Natural sciatica care using spinal decompression concepts, Ayurvedic oil support, posture, and home routines.",
    author: "Lijomon MJ",
    date: "2026-06-02",
    tags: ["Sciatica", "Spine Care", "Ayurveda"]
  },
  {
    slug: "migraine-relief-tips",
    title: "5 Ayurvedic and Postural Tips for Chronic Migraine Relief",
    excerpt: "Simple daily habits, posture corrections, and Ayurvedic care ideas for migraine trigger reduction.",
    author: "Dr. Neena James",
    date: "2026-06-15",
    tags: ["Migraine", "Ayurveda", "Posture"]
  },
  {
    slug: "joint-pain-solutions",
    title: "Integrated Solutions for Osteoarthritis and Joint Wear",
    excerpt: "How joint alignment, Ayurvedic oil therapies, diet, and mobility routines support osteoarthritis care.",
    author: "Dr. Neena James",
    date: "2026-06-25",
    tags: ["Joint Pain", "Arthritis", "Ayurveda"]
  },
  {
    slug: "healthy-lifestyle-habits",
    title: "Daily Dinacharya: Ayurvedic Habits for Lasting Energy",
    excerpt: "Ayurvedic daily routines for energy, digestion, sleep, detoxification, and mental clarity.",
    author: "Dr. Neena James",
    date: "2026-07-05",
    tags: ["Dinacharya", "Wellness", "Lifestyle"]
  }
];

const localSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  "@id": `${siteUrl}/#clinic`,
  name: siteName,
  alternateName: "Chiro Care Clinic",
  url: siteUrl,
  logo: defaultOgImage,
  image: defaultOgImage,
  telephone: "+91-6282018754",
  email: "info@chirocareclinic.in",
  priceRange: "$$",
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
    latitude: 9.995452,
    longitude: 76.2966425,
  },
  hasMap: "https://www.google.com/maps/place/Chiro+Care+Ayurveda+Treatment+Centre+Kochi/@9.995452,76.2966425,17z/data=!3m1!4b1!4m6!3m5!1s0x3b080de7495059df:0x5dd2d9429acba5d8!8m2!3d9.995452!4d76.2966425!16s%2Fg%2F11zc_bh_5g",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "09:00",
      closes: "14:00"
    }
  ],
  areaServed: ["Kaloor", "Ernakulam", "Kochi", "Kerala", "India"],
  medicalSpecialty: ["Ayurvedic", "Chiropractic", "PainManagement"]
};

const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`
  }))
});

const getFaqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
});

const pageHtml = ({ path, title, description, type = "WebPage", body, schemas = [], lastmod = "2026-08-15" }) => {
  const canonical = `${siteUrl}${path}`;
  const schemaList = [
    localSchema,
    {
      "@context": "https://schema.org",
      "@type": type,
      name: title,
      headline: title,
      description,
      url: canonical,
      dateModified: lastmod,
      isPartOf: { "@type": "WebSite", name: siteName, url: siteUrl }
    },
    ...schemas
  ];

  const headTags = [
    `<title>${escapeHtml(title)} | ${siteName}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(title)} | ${siteName}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${defaultOgImage}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)} | ${siteName}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${defaultOgImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(schemaList)}</script>`
  ].join("\n    ");

  return sourceHtml
    .replace(/<title>.*?<\/title>/, "")
    .replace("</head>", `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
};

// Render service detail body with authentic content, breadcrumbs, FAQs, and crawlable internal links
const renderServiceBody = (service) => {
  const relatedServices = servicesData.filter((s) => s.slug !== service.slug).slice(0, 4);
  const relatedTreatments = treatmentsData.slice(0, 3);

  return `
  <main class="seo-prerender">
    <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
      <a href="/">Home</a> &gt; <a href="/services">Services</a> &gt; <span>${escapeHtml(service.title)}</span>
    </nav>

    <article style="max-width: 960px; margin: 0 auto; padding: 2rem 1rem;">
      <header>
        <p style="color: #0088A9; font-weight: bold; text-transform: uppercase; font-size: 0.8rem;">Clinical Care Program &bull; ${escapeHtml(service.duration)}</p>
        <h1>${escapeHtml(service.title)}</h1>
        <p style="font-size: 1.1rem; color: #17332E; line-height: 1.6;">${escapeHtml(service.shortDesc)}</p>
      </header>

      <section style="margin-top: 2rem;">
        <h2>About This Treatment</h2>
        <p style="line-height: 1.7; color: #2C4A43;">${escapeHtml(service.longDesc)}</p>
      </section>

      <section style="margin-top: 2rem;">
        <h2>Key Benefits of Our Program</h2>
        <ul style="line-height: 1.8; color: #2C4A43;">
          ${service.benefits.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
      </section>

      <section style="margin-top: 2rem;">
        <h2>Symptoms Addressed</h2>
        <p>${service.symptoms.map((s) => `<span style="display:inline-block; background:#EEF8F6; border:1px solid #00C7A0; padding:4px 12px; border-radius:20px; margin:4px; font-size:0.85rem;">${escapeHtml(s)}</span>`).join("")}</p>
      </section>

      <section style="margin-top: 2.5rem;">
        <h2>Frequently Asked Questions</h2>
        ${service.faqs.map((faq) => `
          <div style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e0ece9;">
            <h3 style="font-size: 1.05rem; color: #005D73;">${escapeHtml(faq.question)}</h3>
            <p style="color: #2C4A43; line-height: 1.6;">${escapeHtml(faq.answer)}</p>
          </div>
        `).join("")}
      </section>

      <section style="margin-top: 2.5rem; padding: 1.5rem; background: #EEF8F6; border-radius: 1rem;">
        <h2>Book a Consultation in Kochi</h2>
        <p>Visit Chiro Care Ayurvedic Clinic at BRRA 46, Bank Road, Metro pillar 567, Avenue 5th, Kaloor, Ernakulam, Kerala 682017.</p>
        <p>Call our reception: <a href="tel:+916282018754" style="font-weight:bold; color:#0088A9;">+91 6282018754</a> | WhatsApp: <a href="https://wa.me/916282018754" style="font-weight:bold; color:#0088A9;">+91 6282018754</a></p>
      </section>

      <section style="margin-top: 3rem; border-top: 1px solid #00C7A0; padding-top: 2rem;">
        <h2>Related Clinical Services &amp; Therapies</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem;">
          ${relatedServices.map((r) => `
            <div style="padding: 1rem; border: 1px solid #d4ebe6; border-radius: 0.5rem; background: #fff;">
              <h3 style="font-size: 0.95rem;"><a href="/services/${r.slug}" style="color: #0088A9; text-decoration: underline;">${escapeHtml(r.title)}</a></h3>
              <p style="font-size: 0.8rem; color: #555;">${escapeHtml(r.shortDesc)}</p>
            </div>
          `).join("")}
          ${relatedTreatments.map((t) => `
            <div style="padding: 1rem; border: 1px solid #d4ebe6; border-radius: 0.5rem; background: #fff;">
              <h3 style="font-size: 0.95rem;"><a href="/treatments/${t.slug}" style="color: #005D73; text-decoration: underline;">${escapeHtml(t.title)}</a></h3>
              <p style="font-size: 0.8rem; color: #555;">${escapeHtml(t.shortDesc)}</p>
            </div>
          `).join("")}
        </div>
      </section>
    </article>
  </main>`;
};

// Render treatment detail body with authentic content, breadcrumbs, FAQs, and crawlable internal links
const renderTreatmentBody = (treatment) => {
  const relatedTreatments = treatmentsData.filter((t) => t.slug !== treatment.slug).slice(0, 4);
  const relatedServices = servicesData.slice(0, 3);

  return `
  <main class="seo-prerender">
    <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
      <a href="/">Home</a> &gt; <a href="/treatments">Treatments</a> &gt; <span>${escapeHtml(treatment.title)}</span>
    </nav>

    <article style="max-width: 960px; margin: 0 auto; padding: 2rem 1rem;">
      <header>
        <p style="color: #0088A9; font-weight: bold; text-transform: uppercase; font-size: 0.8rem;">Authentic Ayurvedic Therapy &bull; ${escapeHtml(treatment.duration)}</p>
        <h1>${escapeHtml(treatment.title)}</h1>
        <p style="font-size: 1.1rem; color: #17332E; line-height: 1.6;">${escapeHtml(treatment.shortDesc)}</p>
      </header>

      <section style="margin-top: 2rem;">
        <h2>Therapy Overview</h2>
        <p style="line-height: 1.7; color: #2C4A43;">${escapeHtml(treatment.longDesc)}</p>
      </section>

      <section style="margin-top: 2rem;">
        <h2>Primary Health Benefits</h2>
        <ul style="line-height: 1.8; color: #2C4A43;">
          ${treatment.benefits.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
        </ul>
      </section>

      <section style="margin-top: 2rem;">
        <h2>Clinical Indications</h2>
        <p>${treatment.indications.map((i) => `<span style="display:inline-block; background:#EEF8F6; border:1px solid #00C7A0; padding:4px 12px; border-radius:20px; margin:4px; font-size:0.85rem;">${escapeHtml(i)}</span>`).join("")}</p>
      </section>

      <section style="margin-top: 2.5rem;">
        <h2>Frequently Asked Questions</h2>
        ${treatment.faqs.map((faq) => `
          <div style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e0ece9;">
            <h3 style="font-size: 1.05rem; color: #005D73;">${escapeHtml(faq.question)}</h3>
            <p style="color: #2C4A43; line-height: 1.6;">${escapeHtml(faq.answer)}</p>
          </div>
        `).join("")}
      </section>

      <section style="margin-top: 2.5rem; padding: 1.5rem; background: #EEF8F6; border-radius: 1rem;">
        <h2>Schedule an Ayurvedic Session in Kochi</h2>
        <p>Conducted by certified therapists under the guidance of BAMS doctors at Chiro Care Ayurvedic Clinic, Kaloor, Kochi.</p>
        <p>Call for appointment: <a href="tel:+916282018754" style="font-weight:bold; color:#0088A9;">+91 6282018754</a> | WhatsApp: <a href="https://wa.me/916282018754" style="font-weight:bold; color:#0088A9;">+91 6282018754</a></p>
      </section>

      <section style="margin-top: 3rem; border-top: 1px solid #00C7A0; padding-top: 2rem;">
        <h2>Explore Other Ayurvedic Therapies &amp; Pain Services</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem;">
          ${relatedTreatments.map((t) => `
            <div style="padding: 1rem; border: 1px solid #d4ebe6; border-radius: 0.5rem; background: #fff;">
              <h3 style="font-size: 0.95rem;"><a href="/treatments/${t.slug}" style="color: #0088A9; text-decoration: underline;">${escapeHtml(t.title)}</a></h3>
              <p style="font-size: 0.8rem; color: #555;">${escapeHtml(t.shortDesc)}</p>
            </div>
          `).join("")}
          ${relatedServices.map((s) => `
            <div style="padding: 1rem; border: 1px solid #d4ebe6; border-radius: 0.5rem; background: #fff;">
              <h3 style="font-size: 0.95rem;"><a href="/services/${s.slug}" style="color: #005D73; text-decoration: underline;">${escapeHtml(s.title)}</a></h3>
              <p style="font-size: 0.8rem; color: #555;">${escapeHtml(s.shortDesc)}</p>
            </div>
          `).join("")}
        </div>
      </section>
    </article>
  </main>`;
};

// Render Services Catalog page with crawlable internal links to every active service
const renderServicesCatalogBody = () => `
  <main class="seo-prerender">
    <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
      <a href="/">Home</a> &gt; <span>Clinical Services</span>
    </nav>
    <article style="max-width: 1040px; margin: 0 auto; padding: 2rem 1rem;">
      <header style="text-align: center; margin-bottom: 2.5rem;">
        <p style="color: #0088A9; font-weight: bold; text-transform: uppercase; font-size: 0.8rem;">Non-Surgical Pain Management</p>
        <h1>Ayurvedic &amp; Chiropractic Services in Kerala</h1>
        <p style="max-width: 650px; margin: 0.5rem auto; color: #2C4A43; line-height: 1.6;">Browse our full range of Ayurveda-informed chiropractic services for spine alignment, joint mobility, nerve decompression, and chronic pain relief at Kaloor, Ernakulam.</p>
      </header>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        ${servicesData.map((s) => `
          <div style="border: 1px solid #c9e8e2; border-radius: 1rem; padding: 1.5rem; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem;"><a href="/services/${s.slug}" style="color: #005D73; text-decoration: none;">${escapeHtml(s.title)}</a></h2>
            <p style="font-size: 0.85rem; color: #2C4A43; line-height: 1.6; margin-bottom: 1rem;">${escapeHtml(s.shortDesc)}</p>
            <a href="/services/${s.slug}" style="color: #0088A9; font-weight: bold; font-size: 0.85rem; text-decoration: underline;">View Treatment Details &rarr;</a>
          </div>
        `).join("")}
      </div>
      <footer style="margin-top: 3rem; text-align: center; padding: 2rem; background: #EEF8F6; border-radius: 1rem;">
        <h2>Also Explore Ayurvedic Therapies</h2>
        <p>Looking for classical Panchakarma or detox therapies? <a href="/treatments" style="color: #0088A9; font-weight: bold;">View Our Full Ayurvedic Treatments Catalog &rarr;</a></p>
      </footer>
    </article>
  </main>`;

// Render Treatments Catalog page with crawlable internal links to every active treatment
const renderTreatmentsCatalogBody = () => `
  <main class="seo-prerender">
    <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
      <a href="/">Home</a> &gt; <span>Ayurvedic Treatments</span>
    </nav>
    <article style="max-width: 1040px; margin: 0 auto; padding: 2rem 1rem;">
      <header style="text-align: center; margin-bottom: 2.5rem;">
        <p style="color: #0088A9; font-weight: bold; text-transform: uppercase; font-size: 0.8rem;">Traditional Kerala Ayurveda</p>
        <h1>Panchakarma &amp; Ayurvedic Therapies in Kerala</h1>
        <p style="max-width: 650px; margin: 0.5rem auto; color: #2C4A43; line-height: 1.6;">Discover classical Ayurvedic rejuvenation, Panchakarma detoxification, and medicated oil therapies performed by trained therapists under doctor supervision at Chiro Care Clinic, Kochi.</p>
      </header>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        ${treatmentsData.map((t) => `
          <div style="border: 1px solid #c9e8e2; border-radius: 1rem; padding: 1.5rem; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
            <h2 style="font-size: 1.2rem; margin-bottom: 0.5rem;"><a href="/treatments/${t.slug}" style="color: #005D73; text-decoration: none;">${escapeHtml(t.title)}</a></h2>
            <p style="font-size: 0.85rem; color: #2C4A43; line-height: 1.6; margin-bottom: 1rem;">${escapeHtml(t.shortDesc)}</p>
            <a href="/treatments/${t.slug}" style="color: #0088A9; font-weight: bold; font-size: 0.85rem; text-decoration: underline;">View Therapy Process &rarr;</a>
          </div>
        `).join("")}
      </div>
      <footer style="margin-top: 3rem; text-align: center; padding: 2rem; background: #EEF8F6; border-radius: 1rem;">
        <h2>Need Chiropractic Spine Care?</h2>
        <p>Explore our specialized chiropractic alignments for back and neck pain: <a href="/services" style="color: #0088A9; font-weight: bold;">View All Clinical Services &rarr;</a></p>
      </footer>
    </article>
  </main>`;

// Render Blog Post body
const renderBlogBody = (blog) => `
  <main class="seo-prerender">
    <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
      <a href="/">Home</a> &gt; <a href="/blog">Blog</a> &gt; <span>${escapeHtml(blog.title)}</span>
    </nav>
    <article style="max-width: 820px; margin: 0 auto; padding: 2rem 1rem;">
      <header>
        <p style="color: #0088A9; font-weight: bold; font-size: 0.85rem;">Published by ${escapeHtml(blog.author)} &bull; ${escapeHtml(blog.date)}</p>
        <h1>${escapeHtml(blog.title)}</h1>
        <p style="font-size: 1.1rem; color: #2C4A43; line-height: 1.6;">${escapeHtml(blog.excerpt)}</p>
      </header>
      <section style="margin-top: 2rem; line-height: 1.8; color: #2C4A43;">
        <p>At Chiro Care Ayurvedic Clinic in Kaloor, Ernakulam, our healthcare philosophy brings together classical Ayurvedic healing traditions and precise chiropractic spine alignment. By addressing structural restrictions alongside biological rejuvenation, patients experience sustainable wellness and natural pain relief.</p>
        <p>To learn more about our non-surgical treatment programs, explore our <a href="/services" style="color:#0088A9; text-decoration:underline;">Clinical Services</a> or our classical <a href="/treatments" style="color:#0088A9; text-decoration:underline;">Ayurvedic Treatments</a>.</p>
      </section>
      <footer style="margin-top: 2.5rem; padding: 1.5rem; background: #EEF8F6; border-radius: 0.75rem;">
        <h3>Consult Our Practitioners</h3>
        <p>Book a consultation at Chiro Care Clinic in Kaloor, Kochi. Call: <a href="tel:+916282018754" style="color:#0088A9; font-weight:bold;">+91 6282018754</a></p>
      </footer>
    </article>
  </main>`;

// Static Pages Map with meaningful Lastmod Dates
const staticPages = [
  {
    path: "/about",
    title: "About Chiro Care Ayurvedic Clinic in Kaloor Ernakulam",
    description: "Learn about Chiro Care Ayurvedic Clinic, lead chiropractor Lijomon MJ, Dr. Neena James, and our integrative approach to spine and joint health in Kochi.",
    type: "AboutPage",
    lastmod: "2026-09-20",
    body: `
      <main class="seo-prerender">
        <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
          <a href="/">Home</a> &gt; <span>About Us</span>
        </nav>
        <article style="max-width: 960px; margin: 0 auto; padding: 2rem 1rem;">
          <h1>About Chiro Care Ayurvedic Clinic</h1>
          <p style="line-height: 1.7; color: #2C4A43;">Chiro Care Ayurvedic Clinic combines modern chiropractic techniques with authentic Kerala Ayurvedic therapies to deliver lasting, non-surgical relief from back pain, neck pain, sciatica, and joint disorders.</p>
          <h2>Our Medical Specialists</h2>
          <p><strong>Dr. Neena James (BAMS)</strong> &ndash; Ayurvedic Physician with over 5 years of clinical experience in Nadi Pariksha, Panchakarma detoxification, and joint health.</p>
          <p><strong>Mr. Lijomon MJ</strong> &ndash; Lead Spine Chiropractor specializing in structural alignment, spinal decompression, and mobility recovery.</p>
          <h2>Our Clinical Services &amp; Treatments</h2>
          <p>Explore our <a href="/services">Clinical Services</a> including whole back pain, sciatica, disc problems, and our classical <a href="/treatments">Ayurvedic Treatments</a> such as Panchakarma, Abhyanga, and Kizhi therapy.</p>
          <h2>Clinic Location &amp; Contact</h2>
          <p>BRRA 46, Bank Road, Metro pillar 567, Avenue 5th, Kaloor, Ernakulam, Kerala 682017.<br>Phone: <a href="tel:+916282018754">+91 6282018754</a></p>
        </article>
      </main>`
  },
  {
    path: "/contact",
    title: "Contact Ayurvedic Clinic in Kaloor Ernakulam",
    description: "Book an appointment at Chiro Care Ayurvedic Clinic in Kaloor, Ernakulam. Get directions, phone numbers, WhatsApp booking, clinic address, and working hours.",
    type: "ContactPage",
    lastmod: "2026-09-20",
    body: `
      <main class="seo-prerender">
        <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
          <a href="/">Home</a> &gt; <span>Contact Us</span>
        </nav>
        <article style="max-width: 960px; margin: 0 auto; padding: 2rem 1rem;">
          <h1>Contact Chiro Care Ayurvedic Clinic</h1>
          <p>We are conveniently located in Kaloor, Kochi, near Metro pillar 567 on Bank Road.</p>
          <h2>Clinic Address</h2>
          <p>BRRA 46, Bank Road, Metro pillar 567, Avenue 5th, Kaloor, Ernakulam, Kerala 682017</p>
          <h2>Phone &amp; WhatsApp</h2>
          <p>Clinic Desk: <a href="tel:+916282018754">+91 6282018754</a><br>Lijomon MJ: +91 9778084638<br>WhatsApp: <a href="https://wa.me/916282018754">+91 6282018754</a></p>
          <h2>Working Hours</h2>
          <p>Monday &ndash; Saturday: 9:00 AM &ndash; 8:00 PM<br>Sunday: 9:00 AM &ndash; 2:00 PM</p>
          <h2>Services Offered</h2>
          <p>See our <a href="/services">Clinical Services</a> and <a href="/treatments">Ayurvedic Treatments</a>.</p>
        </article>
      </main>`
  },
  {
    path: "/gallery",
    title: "Clinic & Treatment Gallery in Kaloor Kochi",
    description: "View photos of Chiro Care Ayurvedic Clinic in Kaloor, Kochi. Real images of our treatment rooms, chiropractic adjustments, Kizhi therapy, and consultation.",
    type: "ImageGallery",
    lastmod: "2026-09-20",
    body: `
      <main class="seo-prerender">
        <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
          <a href="/">Home</a> &gt; <span>Clinic Gallery</span>
        </nav>
        <article style="max-width: 960px; margin: 0 auto; padding: 2rem 1rem;">
          <h1>Chiro Care Clinic &amp; Treatment Gallery</h1>
          <p>Explore authentic photos of our clinical facility in Kaloor, Kochi. Our clean, welcoming rooms are designed for patient comfort, chiropractic alignment, and authentic Ayurvedic therapies.</p>
          <p>To experience our therapies firsthand, view our <a href="/services">Services</a>, explore <a href="/treatments">Treatments</a>, or <a href="/contact">Contact Us</a> to book an appointment.</p>
        </article>
      </main>`
  },
  {
    path: "/blog",
    title: "Health and Wellness Blog",
    description: "Read natural healing articles about sciatica, migraine, joint health, Ayurveda, chiropractic care, and daily wellness habits from Chiro Care Clinic.",
    type: "Blog",
    lastmod: "2026-09-20",
    body: `
      <main class="seo-prerender">
        <nav aria-label="Breadcrumb" style="padding: 1rem; background: #EEF8F6; font-size: 0.875rem;">
          <a href="/">Home</a> &gt; <span>Health Blog</span>
        </nav>
        <article style="max-width: 960px; margin: 0 auto; padding: 2rem 1rem;">
          <h1>Chiro Care Health &amp; Wellness Blog</h1>
          <p>Practical articles on spine health, pain management, and Ayurvedic living written by our clinical experts.</p>
          <div style="display: grid; gap: 1.5rem; margin-top: 2rem;">
            ${blogsData.map((b) => `
              <div style="padding: 1.5rem; border: 1px solid #d4ebe6; border-radius: 0.75rem; background: #fff;">
                <h2 style="font-size: 1.2rem;"><a href="/blog/${b.slug}" style="color: #005D73; text-decoration: underline;">${escapeHtml(b.title)}</a></h2>
                <p style="font-size: 0.9rem; color: #666;">By ${escapeHtml(b.author)} &bull; ${escapeHtml(b.date)}</p>
                <p style="color: #2C4A43; line-height: 1.6;">${escapeHtml(b.excerpt)}</p>
              </div>
            `).join("")}
          </div>
        </article>
      </main>`
  }
];

// Prerender All Routes
let count = 0;

// 1. Services Catalog
const servicesCatalogHtml = pageHtml({
  path: "/services",
  title: "Ayurvedic Pain Treatment Services in Kerala",
  description: "Browse Chiro Care's Ayurveda-informed chiropractic services for migraine, back pain, sciatica, disc problems, shoulder pain, cervical spondylosis, and joint pain in Ernakulam, Kerala.",
  type: "CollectionPage",
  body: renderServicesCatalogBody(),
  lastmod: "2026-09-20"
});
await mkdir(join(distDir, "services"), { recursive: true });
await writeFile(join(distDir, "services", "index.html"), servicesCatalogHtml, "utf8");
count++;

// 2. Treatments Catalog
const treatmentsCatalogHtml = pageHtml({
  path: "/treatments",
  title: "Panchakarma and Ayurvedic Treatments in Kerala",
  description: "Explore authentic Ayurvedic therapies including Panchakarma, Shirodhara, Abhyanga, Kizhi Therapy, Nasya, and herbal steam bath at Chiro Care Clinic in Kochi, Kerala.",
  type: "CollectionPage",
  body: renderTreatmentsCatalogBody(),
  lastmod: "2026-09-20"
});
await mkdir(join(distDir, "treatments"), { recursive: true });
await writeFile(join(distDir, "treatments", "index.html"), treatmentsCatalogHtml, "utf8");
count++;

// 3. Individual Service Pages
for (const service of servicesData) {
  const servicePath = `/services/${service.slug}`;
  const html = pageHtml({
    path: servicePath,
    title: service.title,
    description: service.shortDesc,
    type: "MedicalWebPage",
    body: renderServiceBody(service),
    schemas: [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: service.title, path: servicePath }
      ]),
      getFaqSchema(service.faqs)
    ],
    lastmod: "2026-08-15"
  });
  const outputDir = join(distDir, "services", service.slug);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html, "utf8");
  count++;
}

// 4. Individual Treatment Pages
for (const treatment of treatmentsData) {
  const treatmentPath = `/treatments/${treatment.slug}`;
  const html = pageHtml({
    path: treatmentPath,
    title: treatment.title,
    description: treatment.shortDesc,
    type: "MedicalWebPage",
    body: renderTreatmentBody(treatment),
    schemas: [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Treatments", path: "/treatments" },
        { name: treatment.title, path: treatmentPath }
      ]),
      getFaqSchema(treatment.faqs)
    ],
    lastmod: (treatment.slug === "steam-bath" || treatment.slug === "full-body-massage") ? "2026-09-20" : "2026-08-15"
  });
  const outputDir = join(distDir, "treatments", treatment.slug);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html, "utf8");
  count++;
}

// 5. Individual Blog Pages
for (const blog of blogsData) {
  const blogPath = `/blog/${blog.slug}`;
  const html = pageHtml({
    path: blogPath,
    title: blog.title,
    description: blog.excerpt,
    type: "BlogPosting",
    body: renderBlogBody(blog),
    schemas: [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: blog.title, path: blogPath }
      ])
    ],
    lastmod: blog.date
  });
  const outputDir = join(distDir, "blog", blog.slug);
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html, "utf8");
  count++;
}

// 6. Static Pages (About, Contact, Gallery, Blog Index)
for (const sp of staticPages) {
  const html = pageHtml({
    path: sp.path,
    title: sp.title,
    description: sp.description,
    type: sp.type,
    body: sp.body,
    schemas: [
      getBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: sp.title, path: sp.path }
      ])
    ],
    lastmod: sp.lastmod
  });
  const outputDir = join(distDir, sp.path.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "index.html"), html, "utf8");
  count++;
}

// 7. Static 404 Page (dist/404.html)
const notFoundHtml = pageHtml({
  path: "/404",
  title: "Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  body: `
    <main class="seo-prerender" style="max-width: 600px; margin: 4rem auto; text-align: center; padding: 2rem 1rem;">
      <h1>Page Not Found (404)</h1>
      <p>The page you requested could not be found. Explore our clinical services or visit our homepage.</p>
      <p><a href="/" style="color:#0088A9; font-weight:bold;">Return to Homepage &rarr;</a> | <a href="/services" style="color:#0088A9; font-weight:bold;">View Clinical Services &rarr;</a></p>
    </main>`,
  lastmod: "2026-09-20"
}).replace('<meta name="robots" content="index, follow, max-image-preview:large" />', '<meta name="robots" content="noindex, nofollow" />');
await writeFile(join(distDir, "404.html"), notFoundHtml, "utf8");

console.log(`SEO prerendered ${count} active routes + 404.html.`);

// 8. Generate Sitemap with Meaningful Lastmod Dates (Total 39 Active URLs)
const sitemapRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly", lastmod: "2026-09-20" },
  { path: "/about", priority: "0.8", changefreq: "monthly", lastmod: "2026-09-20" },
  { path: "/services", priority: "0.9", changefreq: "weekly", lastmod: "2026-09-20" },
  { path: "/treatments", priority: "0.9", changefreq: "weekly", lastmod: "2026-09-20" },
  { path: "/gallery", priority: "0.7", changefreq: "monthly", lastmod: "2026-09-20" },
  { path: "/contact", priority: "0.9", changefreq: "monthly", lastmod: "2026-09-20" },
  { path: "/blog", priority: "0.7", changefreq: "weekly", lastmod: "2026-09-20" },
  ...servicesData.map((s) => ({
    path: `/services/${s.slug}`,
    priority: "0.85",
    changefreq: "monthly",
    lastmod: "2026-08-15"
  })),
  ...treatmentsData.map((t) => ({
    path: `/treatments/${t.slug}`,
    priority: "0.8",
    changefreq: "monthly",
    lastmod: (t.slug === "steam-bath" || t.slug === "full-body-massage") ? "2026-09-20" : "2026-08-15"
  })),
  ...blogsData.map((b) => ({
    path: `/blog/${b.slug}`,
    priority: "0.65",
    changefreq: "monthly",
    lastmod: b.date
  }))
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (r) =>
      `  <url><loc>${siteUrl}${r.path === "/" ? "/" : r.path}</loc><lastmod>${r.lastmod}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`
  )
  .join("\n")}
</urlset>\n`;

await writeFile(join(distDir, "sitemap.xml"), sitemapXml, "utf8");
await writeFile(join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf8");
console.log(`Generated clean sitemap.xml with ${sitemapRoutes.length} active canonical URLs.`);
