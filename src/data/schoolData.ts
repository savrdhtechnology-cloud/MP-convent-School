import { AdmissionLead, SchoolEvent, MandatoryDocument, GalleryItem, TransferCertificate, FacilityItem, LeadershipMember } from '../types';

export const SCHOOL_INFO = {
  name: "M.P. Convent School",
  fullName: "M.P. Convent Higher Secondary School",
  motto: "Nurturing Excellence, Inspiring Character",
  tagline: "A Place Where Learning Becomes a Journey",
  establishedYear: 1996,
  yearsOfExcellence: 30,
  affiliationBoard: "Central Board of Secondary Education (CBSE), New Delhi",
  affiliationNo: "1030760",
  schoolCode: "50723",
  managingSociety: "Hari Om Gyan Ganga Shikshan Samiti",
  address: "Ward No. 6, Shaktinagar, Bari, Distt. Raisen, MP – 464665",
  landmark: "Near Shaktinagar Main Road, Bari",
  city: "Bari",
  district: "Raisen",
  state: "Madhya Pradesh",
  pincode: "464665",
  phones: [
    "07582-222427",
    "8989627828",
    "8989767828",
    "+91 9893461015"
  ],
  primaryPhone: "8989627828",
  landlinePhone: "07582-222427",
  whatsappNumber: "8989627828",
  email: "mpconventbari@gmail.com",
  altEmail: "mpconventhsschool@gmail.com",
  website: "https://mpconventschool.com",
  erpUrl: "https://mpconvent.nexterp.in/nlp/nlp/login",
  academicYear: "2026–27",
  admissionStatus: "ADMISSIONS OPEN FOR 2026-27 (NURSERY TO CLASS XII)",
  schoolTimings: "Monday – Saturday: 08:00 AM – 02:30 PM",
  officeTimings: "Monday – Saturday: 08:30 AM – 04:00 PM",
  studentTeacherRatio: "20:1",
  totalStudents: "500+",
  teachingStaff: "50+",
  smartClassrooms: "100% Digital Enabled",
  boardPassRate: "100%",
};

export const HERO_SLIDES = [
  {
    id: 1,
    title: "A Place Where Learning Becomes a Journey.",
    subtitle: "Affiliated to CBSE, New Delhi | Affiliation No: 1030760",
    description: "At MP Convent School, we nurture young minds to become confident, responsible and compassionate leaders of tomorrow through holistic CBSE curriculum.",
    badge: "ADMISSIONS OPEN 2026–27",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: "Apply Online",
    ctaSecondary: "Book a Campus Visit"
  },
  {
    id: 2,
    title: "Empowering Curiosity in Modern Composite Labs.",
    subtitle: "STEM Education & Practical Science Hub",
    description: "State-of-the-art Physics, Chemistry, Biology & Computer laboratories fostering hands-on scientific experimentation and critical thinking.",
    badge: "MODERN INFRASTRUCTURE",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: "Explore Labs",
    ctaSecondary: "View Academics"
  },
  {
    id: 3,
    title: "Holistic Development Through Sports & Arts.",
    subtitle: "Championing Physical Fitness & Creative Talents",
    description: "Spacious playground for cricket, football, yoga, karate along with dedicated music, dance, and fine arts activity studios.",
    badge: "BEYOND ACADEMICS",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: "Campus Facilities",
    ctaSecondary: "Enquire Now"
  },
  {
    id: 4,
    title: "Smart Learning with NEXT ERP & Digital Classrooms.",
    subtitle: "Interactive Audio-Visual Pedagogies",
    description: "Seamless parent-teacher communication, online assignments, attendance tracking, and multimedia-rich digital smart boards in every classroom.",
    badge: "SMART CAMPUS",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: "Student Zone",
    ctaSecondary: "Apply for 2026-27"
  }
];

export const HIGHLIGHT_STATS = [
  {
    label: "Since 1996",
    value: "30 Years",
    subtext: "Of Academic Heritage in Bari",
    icon: "Clock"
  },
  {
    label: "CBSE Affiliation",
    value: "No. 1030760",
    subtext: "School Code: 50723",
    icon: "Award"
  },
  {
    label: "Digital Learning",
    value: "Smart Classes",
    subtext: "Interactive NextGen Tools",
    icon: "Monitor"
  },
  {
    label: "Dedicated Mentors",
    value: "50+ Faculty",
    subtext: "Trained & Caring Teachers",
    icon: "GraduationCap"
  },
  {
    label: "Board Results",
    value: "100% Success",
    subtext: "Consistent CBSE Toppers",
    icon: "TrendingUp"
  }
];

export const WHY_CHOOSE_CARDS = [
  {
    id: 1,
    title: "Experienced & Dedicated Faculty",
    icon: "Users",
    description: "Our highly qualified educators provide individualized mentorship, fostering both conceptual clarity and moral discipline.",
    highlights: ["Regular teacher development", "Child-centric guidance", "Remedial doubt sessions"]
  },
  {
    id: 2,
    title: "Modern Digital Smart Classrooms",
    icon: "Laptop",
    description: "Equipped with LCD projectors, interactive smartboards, and rich audio-visual modules making complex subjects intuitive and engaging.",
    highlights: ["Visual learning modules", "NCERT aligned digital content", "Spacious airy rooms"]
  },
  {
    id: 3,
    title: "Well-Equipped Science & Tech Labs",
    icon: "FlaskConical",
    description: "Composite Science, Mathematics, and Computer laboratories designed for hands-on research and experimental learning.",
    highlights: ["Physics, Chem & Bio setups", "Hi-tech Computer Lab", "High-speed Internet access"]
  },
  {
    id: 4,
    title: "Sports, Yoga & Cultural Activities",
    icon: "Trophy",
    description: "Extensive playgrounds and indoor arenas for cricket, badminton, chess, carom, plus dedicated dance, music, and art studios.",
    highlights: ["Annual Sports Meet", "Inter-school competitions", "Yoga & physical fitness"]
  },
  {
    id: 5,
    title: "Safe, Secure & CCTV Monitored",
    icon: "ShieldCheck",
    description: "Round-the-clock security, complete CCTV campus surveillance, GPS-enabled school transport, and purified RO drinking water.",
    highlights: ["24x7 Security guards", "Separate hygienic washrooms", "Safe transport fleet"]
  },
  {
    id: 6,
    title: "NEXT ERP & Parent Mobile App",
    icon: "Smartphone",
    description: "Real-time updates on attendance, circulars, homework, academic calendar, and report cards directly to parent smartphones.",
    highlights: ["Next Learning Platform (NLP)", "Instant SMS/App alerts", "Online fee updates"]
  }
];

export const ACADEMIC_PROGRAMS = [
  {
    id: "pre-primary",
    name: "Pre-Primary Wing",
    classes: "Playgroup, Nursery, LKG, UKG",
    ageGroup: "Age 3 to 6 Years",
    tagline: "Foundational Joy of Discovery",
    description: "Activity-based, playway pedagogical approach that stimulates cognitive curiosity, language fluency, fine motor coordination, and foundational numeracy.",
    features: [
      "Colourful, safe & stimulating play zones",
      "Phonics, storytelling & rhymes integration",
      "Montessori sensory learning equipment",
      "Nurturing female care assistants & teachers"
    ],
    curriculum: "Early Childhood Care and Education (ECCE) aligned with NEP 2020",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "primary",
    name: "Primary Wing",
    classes: "Class I – Class V",
    ageGroup: "Age 6 to 11 Years",
    tagline: "Building Core Academic Foundations",
    description: "Focus on experiential conceptual learning in English, Hindi, Mathematics, Environmental Studies (EVS), General Knowledge, and Computer Science.",
    features: [
      "Theme-based holistic learning modules",
      "Interactive Smart Class audio-visual lessons",
      "Spoken English & reading habit promotion",
      "Art, craft, physical training & moral science"
    ],
    curriculum: "CBSE & NCERT foundational syllabus with continuous formative assessment",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "middle",
    name: "Middle School",
    classes: "Class VI – Class VIII",
    ageGroup: "Age 11 to 14 Years",
    tagline: "Analytical Thinking & Problem Solving",
    description: "Transitioning into structured subject mastery across Science, Social Sciences, Mathematics, Languages (English, Hindi, Sanskrit), and Information Technology.",
    features: [
      "Hands-on Science & Math lab experiments",
      "Project-based group learning and debates",
      "Computer coding & digital literacy",
      "Co-curricular clubs (Eco club, Quiz, Sports)"
    ],
    curriculum: "CBSE Middle School Framework with emphasis on scientific inquiry",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "secondary",
    name: "Secondary & Senior Secondary",
    classes: "Class IX – Class XII",
    ageGroup: "Age 14 to 18 Years",
    tagline: "Excellence for Board & Career Horizons",
    description: "Rigorous academic coaching for CBSE All India Secondary and Senior School Certificate Examinations, preparing students for competitive milestones.",
    features: [
      "Dedicated Science & Commerce streams",
      "Experienced Senior Faculty with board evaluation expertise",
      "Extensive lab practicals and mock pre-board exams",
      "Career counseling & entrance examination guidance"
    ],
    curriculum: "CBSE Board Curriculum (AISSE & AISSCE) with NCERT standards",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  }
];

export const LEADERSHIP: LeadershipMember[] = [
  {
    name: "Mr. Mahindra Pratap Dubey (M. P. Dubey)",
    designation: "Director",
    qualification: "Hari Om Gyan Ganga Shikshan Samiti",
    message: "Education is about awakening – awakening to the power and beauty that lies within all of us.",
    fullMessage: [
      "Our mission is to provide positive catalytic impulses to every CHILD to stretch his inherent learning competencies through a self discovery process.",
      "At M.P.CONVENT School, the uniqueness of each child is recognized, nurtured and treasured. Emphasis is on LEARNING and not on teaching only.",
      "Education is a complete process that leads to the attainment of the full potential of the child. Our endeavor is to equip our students with life-skills to face the real world with planning, organizing, deciding, questioning, reasoning, analyzing, team-building, communicating effectively or dealing with challenges confidently.",
      "Our focus is to develop our students as global citizens, with tolerance, respect and appreciation of diverse cultures and religions for a life-time learning experience. They should be self-motivated, independent, confident decision makers to take up a leadership roles in future.",
      "At MPCS, we arm our students with technological supremacy and help them integrate it with values, morals and our cultural legacy. The school curriculum has been painstakingly planned on scientific guidelines to provide students with intellectual stimulation, physical robustness, social adaptability, emotional independence and leadership qualities. It is our endeavor to establish a quality - conscious school where......."
    ],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Mrs. Shailja Dubey",
    designation: "Principal",
    qualification: "M.A., B.Ed.",
    message: "We strive to sculpt well-rounded personalities endowed with sound academic rigor, cultural sensitivity, and moral fortitude.",
    fullMessage: [
      "At M.P. Convent School, each school day brings a fresh journey of discovery and growth. As Principal, it is a profound honor to lead a dedicated faculty committed to holistic education.",
      "Our pedagogical approach blends CBSE NCERT academic standards with sportsmanship, creative expression, and digital skills via the Next Learning Platform (NLP). We teach our children not only what to learn, but how to think critically and act responsibly in society.",
      "I welcome you to explore our vibrant campus and experience how we transform learning into an enriching life adventure."
    ],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
  }
];

export const ABOUT_PILLARS = [
  {
    id: "holistic",
    title: "Holistic Education",
    subtitle: "Nurturing intellectual, physical, emotional and social growth.",
    icon: "GraduationCap"
  },
  {
    id: "student-centered",
    title: "Student Centered",
    subtitle: "Recognizing and nurturing the uniqueness in every child.",
    icon: "UserCheck"
  },
  {
    id: "beyond-class",
    title: "Learning Beyond Class",
    subtitle: "Focus on learning through experience, not just teaching.",
    icon: "BookOpen"
  },
  {
    id: "global-perspective",
    title: "Global Perspective",
    subtitle: "Building global citizens with tolerance and cultural appreciation.",
    icon: "Globe"
  },
  {
    id: "values-ethics",
    title: "Values & Ethics",
    subtitle: "Strengthening success through values, ethics and morals.",
    icon: "ShieldCheck"
  },
  {
    id: "technology-driven",
    title: "Technology Driven",
    subtitle: "Integrating technology with values for a better tomorrow.",
    icon: "Laptop"
  }
];

export const GUIDING_VALUES = [
  {
    id: "excellence",
    title: "Excellence",
    subtitle: "We strive for excellence in all our endeavors.",
    icon: "Award"
  },
  {
    id: "integrity",
    title: "Integrity",
    subtitle: "Success is strengthened by ethics and integrity.",
    icon: "Handshake"
  },
  {
    id: "tradition-modernity",
    title: "Tradition with Modernity",
    subtitle: "Modernity is fortified by our rich traditions.",
    icon: "Landmark"
  }
];

export const CAMPUS_FACILITIES: FacilityItem[] = [
  {
    id: "smart-classes",
    title: "Digital Smart Classrooms",
    icon: "Monitor",
    description: "Every classroom is equipped with interactive audio-visual displays, LCD projection systems, and digitized NCERT teaching modules.",
    features: ["Audio-visual pedagogy", "Ergonomic seating", "Well-ventilated learning spaces"],
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "science-lab",
    title: "Composite Science Laboratories",
    icon: "FlaskConical",
    description: "Fully equipped with modern apparatus, chemicals, optical equipment, and biological specimens for practical demonstrations.",
    features: ["Safety compliant setups", "Individual experiment workstations", "Modern microscopes & meters"],
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "computer-lab",
    title: "Multimedia Computer Lab",
    icon: "Cpu",
    description: "Modern network of high-speed desktop computers with filtered broadband internet, coding software, and cyber-safety protocols.",
    features: ["1:1 student-computer ratio during practicals", "High-speed broadband", "Licensed educational software"],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "library",
    title: "Central Library & Reading Room",
    icon: "BookOpen",
    description: "Rich collection of over 4,000+ reference volumes, encyclopedias, NCERT textbooks, children's literature, magazines, and daily periodicals.",
    features: ["Quiet reading lounge", "CBSE sample paper archives", "Storybooks for junior learners"],
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "sports-ground",
    title: "Sports Playground & Athletics",
    icon: "Trophy",
    description: "Spacious outdoor grounds for cricket, football, volleyball, track & field athletics, overseen by qualified Physical Training Instructors (PTI).",
    features: ["Cricket pitch & football arena", "Annual athletic meets", "Yoga & physical conditioning"],
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "indoor-games",
    title: "Indoor Games & Recreation Room",
    icon: "Gamepad2",
    description: "Dedicated indoor hall for chess tournaments, table tennis, badminton, carom boards, and mental agility activities.",
    features: ["Inter-house chess competitions", "Table tennis boards", "Badminton courts"],
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "arts-music",
    title: "Music, Dance & Fine Arts Studio",
    icon: "Music",
    description: "A vibrant creative hub for vocal music, instrumental training (harmonium, tabla, keyboard), classical/folk dance, and painting.",
    features: ["Classical & folk dance", "Instrumental instruments", "Art & craft exhibitions"],
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "transport",
    title: "Safe Transport Fleet",
    icon: "Bus",
    description: "Reliable school buses covering Bari town and adjacent rural/suburban routes with GPS tracking, experienced drivers, and bus attendants.",
    features: ["GPS tracking enabled", "First-aid boxes in every bus", "Designated pickup & drop points"],
    imageUrl: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "safety-health",
    title: "Safety, Security & RO Water",
    icon: "ShieldAlert",
    description: "24/7 CCTV surveillance across corridors and grounds, fire fighting safety systems, separate hygienic washrooms, and multi-stage RO drinking water.",
    features: ["20+ girls & 22+ boys toilets", "Industrial RO water plant", "Fire extinguishers & emergency exits"],
    imageUrl: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80"
  }
];

export const TIMELINE_HISTORY = [
  {
    year: "1996",
    title: "Foundation & Inception",
    description: "Established under Hari Om Gyan Ganga Shikshan Samiti with the vision of providing accessible quality English medium education in Bari, Raisen."
  },
  {
    year: "2004",
    title: "Campus Expansion & Middle Wing",
    description: "Expanded school premises to Shaktinagar with dedicated science activity rooms, sports grounds, and enhanced faculty team."
  },
  {
    year: "2012",
    title: "CBSE Affiliation (ID: 1030760)",
    description: "Formal affiliation with Central Board of Secondary Education (CBSE), New Delhi, implementing national curriculum and standardized pedagogy."
  },
  {
    year: "2018",
    title: "Smart Learning & Digital Infrastructure",
    description: "Introduction of multimedia smart boards, computerized labs, and comprehensive sports infrastructure."
  },
  {
    year: "2023",
    title: "NextERP & Modern Learning Integration",
    description: "Adoption of Next Learning Platform (NLP) for end-to-end digital school administration, parent communication, and student analytics."
  },
  {
    year: "2026",
    title: "30 Years of Educational Heritage",
    description: "Celebrating three decades of academic excellence, 100% board results, and community trust as Bari's leading educational institution."
  }
];

export const MANDATORY_DOCUMENTS: MandatoryDocument[] = [
  {
    id: "doc-cbse-aff",
    title: "CBSE Affiliation Grant Letter (Senior Secondary)",
    category: "Affiliation",
    documentNumber: "CBSE/AFF/1030760/EX-02488-2223",
    issueDate: "01-04-2022",
    validity: "31-03-2027 (Extended Regular)",
    fileSize: "1.4 MB",
    fileUrl: "#",
    description: "Official confirmation of CBSE affiliation up to Senior Secondary level issued by Central Board of Secondary Education, New Delhi."
  },
  {
    id: "doc-society-reg",
    title: "Society Registration Certificate (Hari Om Gyan Ganga Shikshan Samiti)",
    category: "Administration",
    documentNumber: "MP/SOC/REG/1996/3412",
    issueDate: "12-08-1996",
    validity: "Permanent / Active Renewal",
    fileSize: "920 KB",
    fileUrl: "#",
    description: "Certificate of Registration of Hari Om Gyan Ganga Shikshan Samiti under Madhya Pradesh Societies Registration Act."
  },
  {
    id: "doc-noc",
    title: "No Objection Certificate (NOC) from State Government",
    category: "Affiliation",
    documentNumber: "DPI/NOC/CBSE/RSN/2012/104",
    issueDate: "15-05-2012",
    validity: "Permanent",
    fileSize: "780 KB",
    fileUrl: "#",
    description: "NOC granted by the Directorate of Public Instruction (DPI), School Education Department, Government of Madhya Pradesh."
  },
  {
    id: "doc-rte-rec",
    title: "Recognition Certificate under RTE Act 2009",
    category: "Affiliation",
    documentNumber: "DEO/RSN/RTE/REC/2023/889",
    issueDate: "20-03-2023",
    validity: "31-03-2028",
    fileSize: "650 KB",
    fileUrl: "#",
    description: "Certificate of Recognition issued by District Education Officer (DEO), Raisen for Class I to VIII under Right to Education Act."
  },
  {
    id: "doc-building-safety",
    title: "Building Safety Certificate",
    category: "Safety",
    documentNumber: "PWD/EE/RSN/SAFE/2024/412",
    issueDate: "10-01-2024",
    validity: "09-01-2027",
    fileSize: "840 KB",
    fileUrl: "#",
    description: "Structural soundness and safety certificate issued by Public Works Department (PWD) / Authorized Chartered Structural Engineer."
  },
  {
    id: "doc-fire-safety",
    title: "Fire Safety Certificate & NOC",
    category: "Safety",
    documentNumber: "FIRE/NOC/BARI/2024/118",
    issueDate: "14-02-2024",
    validity: "13-02-2027",
    fileSize: "1.1 MB",
    fileUrl: "#",
    description: "Certificate of Fire Safety compliance, firefighting equipment installation and drills issued by Municipal/Fire Safety Authority."
  },
  {
    id: "doc-water-sanitation",
    title: "Safe Drinking Water and Sanitary Health Certificate",
    category: "Safety",
    documentNumber: "PHED/CMHO/RSN/WATER/2024/76",
    issueDate: "05-04-2024",
    validity: "04-04-2025 (Annual Inspection)",
    fileSize: "710 KB",
    fileUrl: "#",
    description: "Inspection report by District Health and Public Health Engineering Department (PHED) certifying pure RO water and sanitary hygiene."
  },
  {
    id: "doc-smc-list",
    title: "School Management Committee (SMC) Constitution",
    category: "Administration",
    documentNumber: "MPC/SMC/2025-26/01",
    issueDate: "01-07-2025",
    validity: "30-06-2028",
    fileSize: "520 KB",
    fileUrl: "#",
    description: "Detailed list of members of the School Management Committee including educationists, parents, teachers, and society representatives."
  },
  {
    id: "doc-pta-list",
    title: "Parents Teachers Association (PTA) Committee",
    category: "Administration",
    documentNumber: "MPC/PTA/2025-26/02",
    issueDate: "15-07-2025",
    validity: "Annual Academic Term",
    fileSize: "480 KB",
    fileUrl: "#",
    description: "Constitution and executive committee members of the Parents Teachers Association of MP Convent School Bari."
  },
  {
    id: "doc-academic-calendar",
    title: "Annual Academic Calendar 2026-27",
    category: "Academics",
    documentNumber: "MPC/ACAD/CAL/2026-27",
    issueDate: "01-03-2026",
    validity: "Session 2026–27",
    fileSize: "1.3 MB",
    fileUrl: "#",
    description: "Comprehensive schedule of academic terms, examination cycles, holidays, cultural events, and sports meets for session 2026-27."
  },
  {
    id: "doc-board-results",
    title: "Last 3-Year CBSE Board Examination Results (Class X & XII)",
    category: "Results",
    documentNumber: "MPC/EXAM/CBSE/RES/2023-25",
    issueDate: "15-06-2025",
    validity: "Permanent Record",
    fileSize: "960 KB",
    fileUrl: "#",
    description: "Consolidated performance analysis and pass percentages for CBSE AISSE (Class X) and AISSCE (Class XII) examinations."
  }
];

export const INITIAL_LEADS: AdmissionLead[] = [
  {
    id: "MPC-2026-0101",
    parentName: "Rajesh Sharma",
    studentName: "Aarav Sharma",
    mobile: "+91 9826012345",
    email: "rajesh.sharma@example.com",
    classApplying: "Class VI",
    city: "Bari",
    message: "Interested in admission for session 2026-27. Need details about school transport route to Shaktinagar.",
    date: "2026-08-28",
    source: "Website Form",
    status: "COUNSELLING",
    assignedStaff: "Admission Officer (Mrs. S. Mishra)",
    followUpDate: "2026-09-03",
    notes: ["Parent contacted via phone.", "Campus visit scheduled for Friday."]
  },
  {
    id: "MPC-2026-0102",
    parentName: "Sunil Verma",
    studentName: "Ananya Verma",
    mobile: "+91 9425098765",
    email: "sunilverma.bari@gmail.com",
    classApplying: "Nursery",
    city: "Bari",
    message: "Looking for pre-primary admission for 3.5 years child.",
    date: "2026-08-29",
    source: "Website Form",
    status: "CAMPUS_VISIT",
    assignedStaff: "Pre-Primary Coordinator",
    followUpDate: "2026-09-02",
    notes: ["Parent visited play area.", "Application kit issued."]
  },
  {
    id: "MPC-2026-0103",
    parentName: "Dr. Manoj Patel",
    studentName: "Rohan Patel",
    mobile: "+91 9753112233",
    email: "dr.mpatel@yahoo.com",
    classApplying: "Class XI (Science)",
    city: "Raisen",
    message: "Enquiring about Science stream subjects (PCM + Computer) and CBSE board past records.",
    date: "2026-08-30",
    source: "Apply Online CTA",
    status: "APPLICATION",
    assignedStaff: "Senior Wing Counselor",
    followUpDate: "2026-09-05",
    notes: ["Class 10 mark sheet verified.", "Entrance assessment completed with A+."]
  },
  {
    id: "MPC-2026-0104",
    parentName: "Pooja Rajput",
    studentName: "Divyansh Rajput",
    mobile: "+91 9131445566",
    email: "pooja.rajput@gmail.com",
    classApplying: "Class I",
    city: "Bari",
    message: "Transfer from private convent in Bhopal. Seeking admission in Class 1.",
    date: "2026-08-31",
    source: "Website Form",
    status: "NEW",
    assignedStaff: "Admission Team",
    followUpDate: "2026-09-01",
    notes: ["Fresh lead submitted via online portal."]
  }
];

export const SCHOOL_EVENTS: SchoolEvent[] = [
  {
    id: "evt-01",
    title: "CBSE Admissions Open for Academic Session 2026–27",
    date: "August 2026 onwards",
    category: "Academic",
    description: "Online and offline registration begins for Playgroup, Nursery to Class XII. Limited seats available in each grade to ensure ideal student-teacher ratio.",
    fullContent: "MP Convent School invites applications from prospective students for the 2026-27 academic session. Parents can apply online or visit the school admission office between 08:30 AM to 03:30 PM. Documents required: Birth certificate, Aadhaar card, previous grade marksheet, and passport size photographs.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    featured: true
  },
  {
    id: "evt-02",
    title: "Annual Science & STEM Exhibition 'Vigyan Tarang'",
    date: "September 15, 2026",
    category: "Academic",
    description: "Students from Middle and Senior wings will showcase live scientific models, robotics prototypes, and environmental conservation projects.",
    fullContent: "The exhibition provides a platform for young innovators to apply theoretical classroom physics, chemistry, and biology to real-world solutions. Parents and eminent educationists from Raisen district will judge the working models.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    featured: true
  },
  {
    id: "evt-03",
    title: "Inter-House Sports Meet & Athletic Championship",
    date: "October 10-12, 2026",
    category: "Sports",
    description: "Three-day athletic event featuring track races, football championship, cricket league, yoga drills, and march past on school grounds.",
    fullContent: "Four school houses (Tagore, Raman, Shivaji, and Ashoka) will compete for the prestigious Annual Sports Championship Trophy under the supervision of qualified sports instructors.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    featured: false
  },
  {
    id: "evt-04",
    title: "Independence Day & Cultural Harmony Celebration",
    date: "August 15, 2026",
    category: "Celebration",
    description: "Flag hoisting ceremony followed by patriotic songs, classical dance presentations, and prize distribution for academic achievers.",
    fullContent: "The event witnessed patriotic fervor with spectacular cultural items presented by students from pre-primary to senior secondary sections.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    isPublished: true,
    featured: false
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Main Campus & Administrative Block",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80",
    caption: "Spacious campus situated in Shaktinagar, Bari"
  },
  {
    id: "gal-02",
    title: "Composite Science & Practical Lab",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",
    caption: "Students conducting hands-on chemistry and physics experiments"
  },
  {
    id: "gal-03",
    title: "Digital Smart Classroom Session",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
    caption: "Interactive visual teaching with smart screen modules"
  },
  {
    id: "gal-04",
    title: "Annual Sports Tournament on School Ground",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80",
    caption: "Track and field events during the annual athletics meet"
  },
  {
    id: "gal-05",
    title: "Pre-Primary Activity & Playgroup Wing",
    category: "Activities",
    imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80",
    caption: "Young learners exploring interactive educational toys"
  },
  {
    id: "gal-06",
    title: "Cultural Dance & Music Presentation",
    category: "Celebrations",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
    caption: "Students performing traditional folk dance at Annual Day"
  },
  {
    id: "gal-07",
    title: "High-Tech Computer & IT Laboratory",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    caption: "Individual workstations for digital literacy and coding"
  },
  {
    id: "gal-08",
    title: "Central Library & Knowledge Hub",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
    caption: "Over 4,000 reference books and quiet study zone"
  },
  {
    id: "gal-09",
    title: "Student Leadership Council & Achievers",
    category: "Students",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
    caption: "CBSE board toppers and student council representatives"
  }
];

export const SAMPLE_TCS: TransferCertificate[] = [
  {
    tcNumber: "TC/MPC/2025/084",
    scholarNo: "SCH-3104",
    studentName: "Aditya Pratap Singh",
    fatherName: "Mr. R. P. Singh",
    motherName: "Mrs. Meena Singh",
    dateOfBirth: "14-06-2009",
    classPassed: "Class X (CBSE Board AISSE)",
    dateOfIssue: "25-06-2025",
    reasonForLeaving: "Higher Secondary Stream Choice at New Center",
    status: "Verified"
  },
  {
    tcNumber: "TC/MPC/2025/092",
    scholarNo: "SCH-4219",
    studentName: "Prachi Chouksey",
    fatherName: "Mr. Vijay Chouksey",
    motherName: "Mrs. Sunita Chouksey",
    dateOfBirth: "08-11-2011",
    classPassed: "Class VIII",
    dateOfIssue: "10-07-2025",
    reasonForLeaving: "Parents Relocation / Transfer",
    status: "Verified"
  },
  {
    tcNumber: "TC/MPC/2025/115",
    scholarNo: "SCH-2890",
    studentName: "Manish Gour",
    fatherName: "Mr. Rameshwar Gour",
    motherName: "Mrs. Pushpa Gour",
    dateOfBirth: "22-03-2007",
    classPassed: "Class XII (CBSE Board AISSCE - Science)",
    dateOfIssue: "18-06-2025",
    reasonForLeaving: "Completed Senior Secondary Schooling",
    status: "Verified"
  }
];

export const BOARD_RESULTS_DATA = [
  {
    year: "2024-25",
    classXPass: "100%",
    classXIIPass: "100%",
    classXTopper: "96.4%",
    classXIITopper: "95.8%",
    distinctions: "78%"
  },
  {
    year: "2023-24",
    classXPass: "100%",
    classXIIPass: "98.5%",
    classXTopper: "95.6%",
    classXIITopper: "94.2%",
    distinctions: "72%"
  },
  {
    year: "2022-23",
    classXPass: "100%",
    classXIIPass: "100%",
    classXTopper: "96.0%",
    classXIITopper: "94.8%",
    distinctions: "74%"
  }
];
