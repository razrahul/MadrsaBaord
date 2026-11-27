import {
  Award,
  Download,
  FileText,
  Scale,
  UsersRound,
} from 'lucide-react'
import type {
  BoardUpdate,
  ExamProgram,
  GalleryAlbum,
  GalleryImage,
  HeroSlide,
  Leader,
  NavigationItem,
  ServiceItem,
  StatItem,
  UpdateCategory,
} from '@/types/home'

export const boardName = 'Bihar State Madrasa Education Board'
export const boardNameHindi = 'बिहार राज्य मदरसा शिक्षा बोर्ड'

export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Board', href: '#leadership' },
  {
    label: 'Examination',
    href: '#examination',
    summary: {
      title: 'Examination Portal',
      description:
        'Wastania (8th), Fauquania (10th), and Moulvi (12th) admission, registration, admit cards, and results.',
      href: '#examination',
      cta: 'Overview',
    },
    children: [
      { label: 'Online Admission', href: '#services' },
      { label: 'Registration', href: '#services' },
      { label: 'Examination Form', href: '#services' },
      { label: 'Admit Card', href: '#services' },
      { label: 'Results', href: '#updates' },
    ],
  },
  { label: 'Notices', href: '#updates' },
  { label: 'Affiliation', href: '#affiliation' },
  { label: 'Contact', href: '#contact' },
]

export const heroSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    imageUrl:
      'https://images.pexels.com/photos/41296823/pexels-photo-41296823.jpeg?auto=compress&cs=tinysrgb&w=1260',
    imageAlt:
      "Inaugural lamp lighting ceremony at the BSMEB Shatabdi Samaroh with the Hon'ble Chief Minister of Bihar and Board Chairman",
    eyebrow: 'Bihar State Madrasa Education Board',
    title: 'Centenary Celebration (Shatabdi Samaroh)',
    description:
      "Hon'ble Chief Minister and board dignitaries inaugurating the BSMEB Shatabdi Samaroh — celebrating a century of madrasa education and public service in Bihar.",
    primaryAction: { label: 'View Latest Updates', href: '#updates' },
    secondaryAction: { label: 'Online Services', href: '#services' },
  },
  {
    id: 'slide-2',
    imageUrl:
      'https://images.pexels.com/photos/41296825/pexels-photo-41296825.jpeg?auto=compress&cs=tinysrgb&w=1260',
    imageAlt:
      "BSMEB Chairman and dignitaries presenting a framed commemorative citation to the Hon'ble Chief Minister at the Shatabdi Samaroh",
    eyebrow: 'Leadership & Institutional Heritage',
    title: 'Empowering Madrasas Across Bihar',
    description:
      "BSMEB Chairman presenting a commemorative citation to the Hon'ble Chief Minister, reaffirming the board's commitment to Wastania, Fauquania, and Moulvi education.",
    primaryAction: { label: 'Examination Info', href: '#examination' },
  },
  {
    id: 'slide-3',
    imageUrl:
      'https://images.pexels.com/photos/41296824/pexels-photo-41296824.jpeg?auto=compress&cs=tinysrgb&w=1260',
    imageAlt:
      "Hon'ble Chief Minister, ministers, and BSMEB Chairman releasing the official Shatabdi Samaroh Souvenir on stage",
    eyebrow: 'Centenary Souvenir Release',
    title: '100 Years of Academic Excellence',
    description:
      'Unveiling of the official BSMEB Shatabdi Samaroh Souvenir on stage, documenting decades of educational milestones and institutional affiliation across Bihar.',
    primaryAction: { label: 'Affiliation & Act', href: '#affiliation' },
  },
]

export const serviceItems: ServiceItem[] = [
  
  {
    id: 'exam-form',
    title: 'Examination Form',
    description: 'Fill and submit examination forms for Wastania, Fauquania, and Moulvi.',
    icon: FileText,
    href: '#',
    isExternal: false,
    isLive: false,
  },

  {
    id: 'equivalence',
    title: 'Equivalence Certificate',
    description: 'Apply for equivalence certificates for board qualifications.',
    icon: Scale,
    href: '#',
    isExternal: false,
    isLive: false,
  },
  {
    id: 'madrasa-services',
    title: 'Madrasa Dashboard',
    description: 'Access the institutional management portal for affiliated madrasas.',
    icon: UsersRound,
    href: '#',
    isExternal: false,
    isLive: false,
  },
  {
    id: 'downloads',
    title: 'Downloads',
    description: 'Download proformas, circulars, and official documents.',
    icon: Download,
    href: '#downloads',
    isExternal: false,
    isLive: true,
  },
  {
    id: 'teacher-details',
    title: 'Teacher Details',
    description: 'Submit and manage teacher information for your institution.',
    icon: Award,
    href: '#',
    isExternal: false,
    isLive: false,
  },
]

export const updateCategories: UpdateCategory[] = ['Notices', 'Tenders', 'Proformas']

export const boardUpdates: BoardUpdate[] = [
  // Notices
  {
    id: 'n1',
    category: 'Notices',
    title: 'वार्षिक परीक्षा 2026 की समय-सारणी घोषित',
    titleEn: 'Annual Examination 2026 Time Table Announced',
    titleHi: 'वार्षिक परीक्षा 2026 की समय-सारणी घोषित',
    publishedAt: '2026-11-20',
    documentUrl: '#',
    language: 'hi',
    fileType: 'PDF',
    isNew: true,
  },
  {
    id: 'n2',
    category: 'Notices',
    title: 'फौकानिया परीक्षा फॉर्म भरने की अंतिम तिथि',
    titleEn: 'Last Date for Submitting Fauquania Examination Form',
    titleHi: 'फौकानिया परीक्षा फॉर्म भरने की अंतिम तिथि',
    publishedAt: '2026-11-15',
    documentUrl: '#',
    language: 'hi',
    fileType: 'PDF',
    isNew: true,
  },
  {
    id: 'n3',
    category: 'Notices',
    title: 'मदरसा शिक्षकों के लिए प्रशिक्षण कार्यक्रम',
    titleEn: 'Orientation & Training Programme for Madrasa Teachers',
    titleHi: 'मदरसा शिक्षकों के लिए प्रशिक्षण कार्यक्रम',
    publishedAt: '2026-11-10',
    documentUrl: '#',
    language: 'hi',
    fileType: 'PDF',
  },
  {
    id: 'n4',
    category: 'Notices',
    title: 'वस्तानिया परीक्षा परिणाम 2025 घोषित',
    titleEn: 'Wastania Examination Result 2025 Declared',
    titleHi: 'वस्तानिया परीक्षा परिणाम 2025 घोषित',
    publishedAt: '2026-10-28',
    documentUrl: '#',
    language: 'hi',
    fileType: 'PDF',
  },
  // Tenders
  {
    id: 't1',
    category: 'Tenders',
    title: 'Tender for Supply of Examination Stationery 2026-27',
    titleEn: 'Tender for Supply of Examination Stationery 2026-27',
    titleHi: 'परीक्षा लेखन सामग्री आपूर्ति निविदा 2026-27',
    publishedAt: '2026-11-18',
    documentUrl: '#',
    language: 'en',
    fileType: 'PDF',
    isNew: true,
  },
  {
    id: 't2',
    category: 'Tenders',
    title: 'AMC for IT Equipment and Network Infrastructure',
    titleEn: 'AMC for IT Equipment and Network Infrastructure',
    titleHi: 'आईटी उपकरण एवं नेटवर्क अवसंरचना वार्षिक रखरखाव निविदा',
    publishedAt: '2026-11-12',
    documentUrl: '#',
    language: 'en',
    fileType: 'PDF',
  },
  {
    id: 't3',
    category: 'Tenders',
    title: 'Printing of Mark Sheets and Certificates',
    titleEn: 'Printing of Mark Sheets and Certificates',
    titleHi: 'अंकपत्र एवं प्रमाणपत्र मुद्रण निविदा',
    publishedAt: '2026-11-05',
    documentUrl: '#',
    language: 'en',
    fileType: 'PDF',
  },
  {
    id: 't4',
    category: 'Tenders',
    title: 'Tender for Office Furniture and Equipment',
    titleEn: 'Tender for Office Furniture and Equipment',
    titleHi: 'कार्यालय फर्नीचर एवं उपकरण आपूर्ति निविदा',
    publishedAt: '2026-10-22',
    documentUrl: '#',
    language: 'en',
    fileType: 'PDF',
  },
  // Proformas
  {
    id: 'p1',
    category: 'Proformas',
    title: 'सम्बद्धता नवीनीकरण प्रोफार्मा 2026-27',
    titleEn: 'Affiliation Renewal Proforma 2026-27',
    titleHi: 'सम्बद्धता नवीनीकरण प्रोफार्मा 2026-27',
    publishedAt: '2026-11-01',
    documentUrl: '#',
    language: 'hi',
    fileType: 'DOCX',
    isNew: true,
  },
  {
    id: 'p2',
    category: 'Proformas',
    title: 'नए शिक्षक नियुक्ति सूचना प्रोफार्मा',
    titleEn: 'New Teacher Appointment Intimation Proforma',
    titleHi: 'नए शिक्षक नियुक्ति सूचना प्रोफार्मा',
    publishedAt: '2026-10-20',
    documentUrl: '#',
    language: 'hi',
    fileType: 'DOCX',
  },
  {
    id: 'p3',
    category: 'Proformas',
    title: 'वार्षिक रिपोर्ट एवं विवरण प्रोफार्मा',
    titleEn: 'Annual Return & Institutional Report Proforma',
    titleHi: 'वार्षिक रिपोर्ट एवं विवरण प्रोफार्मा',
    publishedAt: '2026-10-10',
    documentUrl: '#',
    language: 'hi',
    fileType: 'DOCX',
  },
  {
    id: 'p4',
    category: 'Proformas',
    title: 'छात्रवृत्ति आवेदन प्रोफार्मा',
    titleEn: 'Scholarship Application Proforma',
    titleHi: 'छात्रवृत्ति आवेदन प्रोफार्मा',
    publishedAt: '2026-09-28',
    documentUrl: '#',
    language: 'hi',
    fileType: 'DOCX',
  },
]

export const leaders: Leader[] = [
  {
    id: 'l1',
    name: 'Shri Samrat Choudhary',
    designation: "Hon'ble Chief Minister, Bihar",
    imageUrl:
      'https://state.bihar.gov.in/educationbihar/cache/18/HOME_IMAGES/1504%20cm%20image%20web%20225x225.jpg.jpg',
    displayOrder: 1,
  },
  {
    id: 'l2',
    name: 'Shri Mithlesh Tiwari',
    designation: "Hon'ble Education Minister, Bihar",
    imageUrl:
      'https://state.bihar.gov.in/educationbihar/cache/18/HOME_IMAGES/WhatsApp_Image_2026-05-08_at_6.46.18_PM_cropped.jpg',
    displayOrder: 2,
  },
  {
    id: 'l3',
    name: 'Janab Salim Parwez',
    designation: "Hon'ble Chairman\nBihar State Madrasa Education Board",
    imageUrl:
      'https://bsmeb2.techprotocol.in/public//wakfboard/img/team/Chairman_BSMEB.png',
    displayOrder: 3,
  },
]

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: 'album-shatabdi-samaroh',
    title: 'BSMEB Shatabdi Samaroh (Centenary Celebration)',
    date: 'Centenary Event',
    images: [
      {
        id: 'ss-1',
        src: 'https://images.pexels.com/photos/41296821/pexels-photo-41296821.jpeg?auto=compress&cs=tinysrgb&w=1000',
        alt: 'Packed auditorium filled with madrasa teachers, scholars, and delegates attending BSMEB Shatabdi Samaroh',
        caption: 'Thousands of madrasa educators and delegates gathered at the Shatabdi Samaroh auditorium',
        width: 1000,
        height: 667,
      },
      {
        id: 'ss-2',
        src: 'https://images.pexels.com/photos/41296823/pexels-photo-41296823.jpeg?auto=compress&cs=tinysrgb&w=1000',
        alt: "Ceremonial lamp lighting by the Hon'ble Chief Minister, Board Chairman Janab Salim Parwez, and dignitaries",
        caption: "Inaugural ceremonial lamp lighting by the Hon'ble Chief Minister and BSMEB Chairman",
        width: 1000,
        height: 667,
      },
      {
        id: 'ss-3',
        src: 'https://images.pexels.com/photos/41296818/pexels-photo-41296818.jpeg?auto=compress&cs=tinysrgb&w=1000',
        alt: "Grand floral garland welcome of the Hon'ble Chief Minister, ministers, and BSMEB Chairman on stage",
        caption: "Grand floral garland welcome accorded to the Hon'ble Chief Minister and dignitaries",
        width: 1000,
        height: 667,
      },
      {
        id: 'ss-4',
        src: 'https://images.pexels.com/photos/41296825/pexels-photo-41296825.jpeg?auto=compress&cs=tinysrgb&w=1000',
        alt: "Board Chairman Janab Salim Parwez presenting a framed commemorative citation to the Hon'ble Chief Minister",
        caption: "Presentation of commemorative citation to the Hon'ble Chief Minister on stage",
        width: 1000,
        height: 667,
      },
      {
        id: 'ss-5',
        src: 'https://images.pexels.com/photos/41296824/pexels-photo-41296824.jpeg?auto=compress&cs=tinysrgb&w=1000',
        alt: "Unveiling of the official BSMEB Shatabdi Samaroh Souvenir by the Hon'ble Chief Minister and dignitaries",
        caption: 'Official release of the BSMEB Shatabdi Samaroh Centenary Souvenir',
        width: 1000,
        height: 667,
      },
      {
        id: 'ss-6',
        src: 'https://images.pexels.com/photos/41296822/pexels-photo-41296822.jpeg?auto=compress&cs=tinysrgb&w=1000',
        alt: 'Scholar delivering an address from the flower-decorated BSMEB podium during Shatabdi Samaroh',
        caption: 'Address from the Bihar State Madrasa Education Board podium',
        width: 1000,
        height: 667,
      },
      {
        id: 'ss-7',
        src: 'https://images.pexels.com/photos/41296820/pexels-photo-41296820.jpeg?auto=compress&cs=tinysrgb&w=1000',
        alt: 'BSMEB Chairman Janab Salim Parwez seated on the dais during the Shatabdi Samaroh',
        caption: "Hon'ble Chairman Janab Salim Parwez seated on stage at the Shatabdi Samaroh",
        width: 667,
        height: 1000,
      },
    ],
  },
  {
    id: 'album-convocation',
    title: 'Annual Convocation & Award Ceremony',
    date: 'Nov 2026',
    images: [
      {
        id: 'ac-1',
        src: 'https://images.pexels.com/photos/5905509/pexels-photo-5905509.jpeg?auto=compress&h=600&w=800',
        alt: 'Students celebrating at the annual convocation ceremony',
        caption: 'Meritorious students honoured at the annual ceremony',
        width: 800,
        height: 600,
      },
      {
        id: 'ac-2',
        src: 'https://images.pexels.com/photos/5905555/pexels-photo-5905555.jpeg?auto=compress&h=600&w=800',
        alt: 'Students seated in the convocation hall',
        caption: 'Graduating batch of Fauquania and Moulvi',
        width: 800,
        height: 600,
      },
      {
        id: 'ac-3',
        src: 'https://images.pexels.com/photos/5905492/pexels-photo-5905492.jpeg?auto=compress&h=600&w=800',
        alt: 'Keynote address during the ceremony',
        caption: 'Keynote address on academic excellence',
        width: 800,
        height: 600,
      },
    ],
  },
  {
    id: 'album-training',
    title: 'Madrasa Teachers Training Workshop',
    date: 'Oct 2026',
    images: [
      {
        id: 'tr-1',
        src: 'https://images.pexels.com/photos/5905560/pexels-photo-5905560.jpeg?auto=compress&h=600&w=800',
        alt: 'Educator leading an interactive classroom session',
        caption: 'Interactive pedagogy workshop for madrasa teachers',
        width: 800,
        height: 600,
      },
      {
        id: 'tr-2',
        src: 'https://images.pexels.com/photos/5905492/pexels-photo-5905492.jpeg?auto=compress&h=600&w=800',
        alt: 'Teachers attending the training lecture',
        caption: 'Curriculum modernisation briefing',
        width: 800,
        height: 600,
      },
      {
        id: 'tr-3',
        src: 'https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg?auto=compress&h=600&w=800',
        alt: 'Group study and resource review session',
        caption: 'Digital teaching materials review',
        width: 800,
        height: 600,
      },
    ],
  },
  {
    id: 'album-board-meeting',
    title: 'Board Governance & Review Meeting',
    date: 'Sep 2026',
    images: [
      {
        id: 'bm-1',
        src: 'https://images.pexels.com/photos/8613084/pexels-photo-8613084.jpeg?auto=compress&h=600&w=800',
        alt: 'Official board governance meeting in progress',
        caption: 'Quarterly review of examination and affiliation policies',
        width: 800,
        height: 600,
      },
      {
        id: 'bm-2',
        src: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&h=600&w=800',
        alt: 'BSMEB administrative campus view',
        caption: 'Board headquarters and administrative block',
        width: 800,
        height: 600,
      },
    ],
  },
]

export const galleryImages: GalleryImage[] = galleryAlbums.map((a) => a.images[0])

export const examPrograms: ExamProgram[] = [
  {
    id: 'wastania',
    name: 'Wastania',
    nameHindi: 'वस्तानिया',
    level: 'Middle Level',
    duration: '3 Years',
    description:
      'Foundation-level certification covering Islamic studies, Arabic, Urdu, Hindi, mathematics, and general subjects.',
    subjects: ['Islamic Studies', 'Arabic', 'Urdu', 'Hindi', 'Mathematics', 'Science & Social Studies'],
    equivalentTo: 'Class 8 (Middle School Standard)',
  },
  {
    id: 'fauquania',
    name: 'Fauquania',
    nameHindi: 'फौकानिया',
    level: 'Secondary Level',
    duration: '2 Years',
    description:
      'Secondary-level board examination building on Wastania, covering Islamic studies, languages, mathematics, and science.',
    subjects: ['Islamic Studies', 'Arabic', 'Urdu', 'Hindi / English', 'Mathematics', 'Science & Social Science'],
    equivalentTo: 'Class 10 (Matriculation Standard)',
  },
  {
    id: 'moulvi',
    name: 'Moulvi',
    nameHindi: 'मौलवी',
    level: 'Higher Secondary Level',
    duration: '2 Years',
    description:
      'Higher secondary qualification in Islamic theology, Arabic, and elective streams (Arts, Science, Commerce, Islamiyat).',
    subjects: ['Islamic Theology', 'Arabic & Persian', 'Urdu & English', 'Arts / Science / Commerce'],
    equivalentTo: 'Class 12 (Intermediate Standard)',
  },
]

export const statItems: StatItem[] = [
  { id: 's1', label: 'Affiliated Madrasas', value: '3,000+', note: 'Across all districts of Bihar' },
  { id: 's2', label: 'Students Enrolled', value: '5 Lakh+', note: 'Active students (approximate)' },
  { id: 's3', label: 'Examination Centres', value: '500+', note: 'Across Bihar' },
  { id: 's4', label: 'Years of Service', value: '50+', note: 'Serving education since establishment' },
]
