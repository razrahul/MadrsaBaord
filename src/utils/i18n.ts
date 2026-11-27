import { usePreferences, type Language, type ThemeId } from '@/app/PreferencesContext'
import type { UpdateCategory } from '@/types/home'

export interface SiteTranslations {
  brand: {
    primaryName: string
    secondaryName: string
    govOfBihar: string
  }
  header: {
    skipToContent: string
    biharPortal: string
    decreaseText: string
    defaultText: string
    increaseText: string
    tickerLatest: string
    openMenu: string
    closeMenu: string
    newBadge: string
    examinationOverview: string
  }
  nav: Record<
    'home' | 'about' | 'examination' | 'notices' | 'affiliation' | 'contact',
    string
  >
  examSubNav: Record<
    'admission' | 'registration' | 'examForm' | 'admitCard' | 'results',
    string
  >
  heroControls: {
    carouselLabel: string
    prevSlide: string
    nextSlide: string
    pause: string
    play: string
  }
  heroSlides: Record<
    'slide-1' | 'slide-2' | 'slide-3',
    {
      eyebrow: string
      title: string
      description: string
      primaryLabel?: string
      secondaryLabel?: string
    }
  >
  services: {
    srHeading: string
    comingSoonSuffix: string
    items: Record<
      'exam-form' | 'equivalence' | 'madrasa-services' | 'downloads' | 'teacher-details',
      { title: string; description: string }
    >
  }
  leaders: Record<'l1' | 'l2' | 'l3', { name: string; designation: string }>
  updates: {
    title: string
    pause: string
    play: string
    viewArchive: string
    officialCount: (count: number, catLabel: string) => string
    newBadge: string
    categories: Record<UpdateCategory, string>
    emptyTitle: (catLabel: string) => string
    emptyDescription: string
  }
  gallery: {
    eyebrow: string
    title: string
    description: string
    photosWord: string
    openAlbum: string
    closeViewer: string
    prevImage: string
    nextImage: string
    albums: Record<
      'album-shatabdi-samaroh' | 'album-convocation' | 'album-training' | 'album-board-meeting',
      { title: string; date: string; captions: string[] }
    >
  }
  examination: {
    eyebrow: string
    title: string
    description: string
    keySubjects: string
    equivalentTo: string
    programs: Record<
      'wastania' | 'fauquania' | 'moulvi',
      {
        name: string
        secondaryName: string
        level: string
        duration: string
        description: string
        subjects: string[]
        equivalentTo: string
      }
    >
  }
  affiliation: {
    eyebrow: string
    title: string
    description: string
    cards: Record<
      'process' | 'search' | 'inspection' | 'act-regulations',
      { title: string; description: string; linkLabel: string }
    >
  }
  footer: {
    govLabel: string
    tagline: string
    quickLinksTitle: string
    contactTitle: string
    policiesTitle: string
    quickLinks: {
      notices: string
      examination: string
      affiliation: string
      services: string
      gallery: string
    }
    policies: {
      privacy: string
      accessibility: string
      rti: string
      terms: string
    }
    address: string
    hours: string
    socialLabels: Record<'facebook' | 'twitter' | 'youtube', string>
    copyrightSuffix: string
    portalTag: string
  }
  themeSwitcher: {
    buttonLabel: string
    heading: string
    themes: Record<ThemeId, string>
  }
}

const translations: Record<Language, SiteTranslations> = {
  en: {
    brand: {
      primaryName: 'Bihar State Madrasa Education Board',
      secondaryName: 'बिहार राज्य मदरसा शिक्षा बोर्ड',
      govOfBihar: 'Government of Bihar',
    },
    header: {
      skipToContent: 'Skip to Main Content',
      biharPortal: 'Bihar Govt Portal',
      decreaseText: 'Decrease text size',
      defaultText: 'Default text size',
      increaseText: 'Increase text size',
      tickerLatest: 'Latest',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      newBadge: 'New',
      examinationOverview: 'Examination Overview',
    },
    nav: {
      home: 'Home',
      about: 'About Board',
      examination: 'Examination',
      notices: 'Notices',
      affiliation: 'Affiliation',
      contact: 'Contact',
    },
    examSubNav: {
      admission: 'Online Admission',
      registration: 'Registration',
      examForm: 'Examination Form',
      admitCard: 'Admit Card',
      results: 'Results',
    },
    heroControls: {
      carouselLabel: 'Hero carousel',
      prevSlide: 'Previous slide',
      nextSlide: 'Next slide',
      pause: 'Pause carousel',
      play: 'Play carousel',
    },
    heroSlides: {
      'slide-1': {
        eyebrow: 'Bihar State Madrasa Education Board',
        title: 'Centenary Celebration (Shatabdi Samaroh)',
        description:
          "Hon'ble Chief Minister and board dignitaries inaugurating the BSMEB Shatabdi Samaroh — celebrating a century of madrasa education and public service in Bihar.",
        primaryLabel: 'View Latest Updates',
        secondaryLabel: 'Online Services',
      },
      'slide-2': {
        eyebrow: 'Leadership & Institutional Heritage',
        title: 'Empowering Madrasas Across Bihar',
        description:
          "BSMEB Chairman presenting a commemorative citation to the Hon'ble Chief Minister, reaffirming the board's commitment to Wastania, Fauquania, and Moulvi education.",
        primaryLabel: 'Examination Info',
      },
      'slide-3': {
        eyebrow: 'Centenary Souvenir Release',
        title: '100 Years of Academic Excellence',
        description:
          'Unveiling of the official BSMEB Shatabdi Samaroh Souvenir on stage, documenting decades of educational milestones and institutional affiliation across Bihar.',
        primaryLabel: 'Affiliation & Act',
      },
    },
    services: {
      srHeading: 'Online services',
      comingSoonSuffix: 'Coming soon',
      items: {
        'exam-form': {
          title: 'Examination Form',
          description: 'Fill and submit examination forms for Wastania, Fauquania, and Moulvi.',
        },
        equivalence: {
          title: 'Equivalence Certificate',
          description: 'Apply for equivalence certificates for board qualifications.',
        },
        'madrasa-services': {
          title: 'Madrasa Dashboard',
          description: 'Access the institutional management portal for affiliated madrasas.',
        },
        downloads: {
          title: 'Downloads',
          description: 'Download proformas, circulars, and official documents.',
        },
        'teacher-details': {
          title: 'Teacher Details',
          description: 'Submit and manage teacher information for your institution.',
        },
      },
    },
    leaders: {
      l1: {
        name: 'Shri Samrat Choudhary',
        designation: "Hon'ble Chief Minister, Bihar",
      },
      l2: {
        name: 'Shri Mithlesh Tiwari',
        designation: "Hon'ble Education Minister, Bihar",
      },
      l3: {
        name: 'Janab Salim Parwez',
        designation: "Hon'ble Chairman\nBihar State Madrasa Education Board",
      },
    },
    updates: {
      title: 'Notice Board',
      pause: 'Pause',
      play: 'Play',
      viewArchive: 'View Archive',
      officialCount: (count, cat) => `${count} Official ${cat}`,
      newBadge: 'NEW',
      categories: {
        Notices: 'Notices',
        Tenders: 'Tenders',
        Proformas: 'Proformas',
      },
      emptyTitle: (cat) => `No ${cat.toLowerCase()} published yet.`,
      emptyDescription:
        'Once verified content is available, it will be listed here with date, document type, and a secure view/download link.',
    },
    gallery: {
      eyebrow: 'Activities & Gallery',
      title: 'Programmes & Event Albums',
      description: 'Select any programme folder to view its photographs.',
      photosWord: 'Photos',
      openAlbum: 'Open Album',
      closeViewer: 'Close image viewer',
      prevImage: 'Previous image',
      nextImage: 'Next image',
      albums: {
        'album-shatabdi-samaroh': {
          title: 'BSMEB Shatabdi Samaroh (Centenary Celebration)',
          date: 'Centenary Event',
          captions: [
            'Thousands of madrasa educators and delegates gathered at the Shatabdi Samaroh auditorium',
            "Inaugural ceremonial lamp lighting by the Hon'ble Chief Minister and BSMEB Chairman",
            "Grand floral garland welcome accorded to the Hon'ble Chief Minister and dignitaries",
            "Presentation of commemorative citation to the Hon'ble Chief Minister on stage",
            'Official release of the BSMEB Shatabdi Samaroh Centenary Souvenir',
            'Address from the Bihar State Madrasa Education Board podium',
            "Hon'ble Chairman Janab Salim Parwez seated on stage at the Shatabdi Samaroh",
          ],
        },
        'album-convocation': {
          title: 'Annual Convocation & Award Ceremony',
          date: 'Nov 2026',
          captions: [
            'Meritorious students honoured at the annual ceremony',
            'Graduating batch of Fauquania and Moulvi',
            'Keynote address on academic excellence',
          ],
        },
        'album-training': {
          title: 'Madrasa Teachers Training Workshop',
          date: 'Oct 2026',
          captions: [
            'Interactive pedagogy workshop for madrasa teachers',
            'Curriculum modernisation briefing',
            'Digital teaching materials review',
          ],
        },
        'album-board-meeting': {
          title: 'Board Governance & Review Meeting',
          date: 'Sep 2026',
          captions: [
            'Quarterly review of examination and affiliation policies',
            'Board headquarters and administrative block',
          ],
        },
      },
    },
    examination: {
      eyebrow: 'Examinations & Equivalence',
      title: 'Examination Programmes',
      description:
        'BSMEB conducts three core board examinations recognised across academic and government institutions.',
      keySubjects: 'Key Subjects',
      equivalentTo: 'Equivalent to',
      programs: {
        wastania: {
          name: 'Wastania',
          secondaryName: 'वस्तानिया',
          level: 'Middle Level',
          duration: '3 Years',
          description:
            'Foundation-level certification covering Islamic studies, Arabic, Urdu, Hindi, mathematics, and general subjects.',
          subjects: [
            'Islamic Studies',
            'Arabic',
            'Urdu',
            'Hindi',
            'Mathematics',
            'Science & Social Studies',
          ],
          equivalentTo: 'Class 8 (Middle School Standard)',
        },
        fauquania: {
          name: 'Fauquania',
          secondaryName: 'फौकानिया',
          level: 'Secondary Level',
          duration: '2 Years',
          description:
            'Secondary-level board examination building on Wastania, covering Islamic studies, languages, mathematics, and science.',
          subjects: [
            'Islamic Studies',
            'Arabic',
            'Urdu',
            'Hindi / English',
            'Mathematics',
            'Science & Social Science',
          ],
          equivalentTo: 'Class 10 (Matriculation Standard)',
        },
        moulvi: {
          name: 'Moulvi',
          secondaryName: 'मौलवी',
          level: 'Higher Secondary Level',
          duration: '2 Years',
          description:
            'Higher secondary qualification in Islamic theology, Arabic, and elective streams (Arts, Science, Commerce, Islamiyat).',
          subjects: [
            'Islamic Theology',
            'Arabic & Persian',
            'Urdu & English',
            'Arts / Science / Commerce',
          ],
          equivalentTo: 'Class 12 (Intermediate Standard)',
        },
      },
    },
    affiliation: {
      eyebrow: 'Affiliation & Regulations',
      title: 'Affiliation, Act & Regulations',
      description:
        'Official resources for affiliated madrasas, statutory rules, and institutional guidelines.',
      cards: {
        process: {
          title: 'Affiliation Process',
          description:
            'Guidelines, eligibility criteria, and application forms for new affiliation and renewal of madrasas.',
          linkLabel: 'View guidelines',
        },
        search: {
          title: 'Institution Search',
          description:
            'Look up BSMEB-affiliated madrasas by district, block, or madrasa code once directory data is published.',
          linkLabel: 'Search directory',
        },
        inspection: {
          title: 'Inspection & Compliance',
          description:
            'Inspection checklists, infrastructure norms, and annual compliance requirements for affiliated madrasas.',
          linkLabel: 'View checklist',
        },
        'act-regulations': {
          title: 'Act & Regulations',
          description:
            'Bihar State Madrasa Education Board Act, statutory rules, service conditions, and official board bye-laws.',
          linkLabel: 'Read Act & rules',
        },
      },
    },
    footer: {
      govLabel: 'Government of Bihar',
      tagline:
        'Statutory autonomous board for madrasa education, examinations, and affiliation in Bihar.',
      quickLinksTitle: 'Quick links',
      contactTitle: 'Contact',
      policiesTitle: 'Policies',
      quickLinks: {
        notices: 'Notices & Tenders',
        examination: 'Examination info',
        affiliation: 'Affiliation & Act',
        services: 'Online services',
        gallery: 'Photo gallery',
      },
      policies: {
        privacy: 'Privacy policy',
        accessibility: 'Accessibility statement',
        rti: 'RTI information',
        terms: 'Terms of use',
      },
      address: '5, Vidyapati Marg, Patna, Bihar — 800001',
      hours: 'Mon–Fri: 9:30 am – 6:00 pm',
      socialLabels: {
        facebook: 'Facebook',
        twitter: 'Twitter',
        youtube: 'YouTube',
      },
      copyrightSuffix: 'Government of Bihar.',
      portalTag: 'Official Public Information Portal',
    },
    themeSwitcher: {
      buttonLabel: 'Theme',
      heading: 'Display Theme',
      themes: {
        'navy-saffron': 'Navy / Saffron',
        'maroon-gold': 'Maroon / Gold',
        'royal-blue-teal': 'Royal Blue / Teal',
        'emerald-sage': 'Green / Light Green',
        'clean-white': 'White / Slate',
        chaiui: 'Warm Amber',
      },
    },
  },
  hi: {
    brand: {
      primaryName: 'बिहार राज्य मदरसा शिक्षा बोर्ड',
      secondaryName: 'Bihar State Madrasa Education Board',
      govOfBihar: 'बिहार सरकार',
    },
    header: {
      skipToContent: 'मुख्य सामग्री पर जाएँ',
      biharPortal: 'बिहार सरकार पोर्टल',
      decreaseText: 'फ़ॉन्ट छोटा करें',
      defaultText: 'सामान्य फ़ॉन्ट आकार',
      increaseText: 'फ़ॉन्ट बड़ा करें',
      tickerLatest: 'नवीनतम',
      openMenu: 'मेनू खोलें',
      closeMenu: 'मेनू बंद करें',
      newBadge: 'नया',
      examinationOverview: 'परीक्षा अवलोकन',
    },
    nav: {
      home: 'मुख्य पृष्ठ',
      about: 'बोर्ड परिचय',
      examination: 'परीक्षा',
      notices: 'सूचनाएँ',
      affiliation: 'सम्बद्धता',
      contact: 'संपर्क',
    },
    examSubNav: {
      admission: 'ऑनलाइन नामांकन',
      registration: 'पंजीकरण',
      examForm: 'परीक्षा फॉर्म',
      admitCard: 'प्रवेश पत्र',
      results: 'परीक्षा परिणाम',
    },
    heroControls: {
      carouselLabel: 'मुख्य स्लाइडर',
      prevSlide: 'पिछली स्लाइड',
      nextSlide: 'अगली स्लाइड',
      pause: 'स्लाइडर रोकें',
      play: 'स्लाइडर चलाएँ',
    },
    heroSlides: {
      'slide-1': {
        eyebrow: 'बिहार राज्य मदरसा शिक्षा बोर्ड',
        title: 'शताब्दी समारोह एवं गौरवशाली यात्रा',
        description:
          'माननीय मुख्यमंत्री एवं बोर्ड के पदाधिकारियों द्वारा बीएसएमईबी शताब्दी समारोह का दीप प्रज्वलन कर उद्घाटन — बिहार में मदरसा शिक्षा के सौ वर्षों की सेवा।',
        primaryLabel: 'नवीनतम सूचनाएँ देखें',
        secondaryLabel: 'ऑनलाइन सेवाएँ',
      },
      'slide-2': {
        eyebrow: 'नेतृत्व एवं संस्थागत विरासत',
        title: 'बिहार भर के मदरसों का सशक्तिकरण',
        description:
          'शताब्दी समारोह में माननीय मुख्यमंत्री को सम्मान-पत्र भेंट करते बोर्ड अध्यक्ष — वस्तानिया, फौकानिया और मौलवी शिक्षा के आधुनिकीकरण का संकल्प।',
        primaryLabel: 'परीक्षा जानकारी',
      },
      'slide-3': {
        eyebrow: 'शताब्दी स्मारिका विमोचन',
        title: 'शैक्षणिक उत्कृष्टता के १०० वर्ष',
        description:
          'समारोह मंच से बीएसएमईबी शताब्दी समारोह स्मारिका का आधिकारिक विमोचन — दशकों की शैक्षणिक उपलब्धियों, शिक्षक विकास और सम्बद्धता का संकलन।',
        primaryLabel: 'सम्बद्धता एवं अधिनियम',
      },
    },
    services: {
      srHeading: 'ऑनलाइन सेवाएँ',
      comingSoonSuffix: 'शीघ्र उपलब्ध',
      items: {
        'exam-form': {
          title: 'परीक्षा फॉर्म',
          description: 'वस्तानिया, फौकानिया और मौलवी के लिए परीक्षा फॉर्म भरें।',
        },
        equivalence: {
          title: 'समकक्षता प्रमाणपत्र',
          description: 'बोर्ड योग्यताओं के लिए समकक्षता प्रमाणपत्र हेतु आवेदन करें।',
        },
        'madrasa-services': {
          title: 'मदरसा डैशबोर्ड',
          description: 'सम्बद्ध मदरसों के लिए संस्थागत प्रबंधन पोर्टल खोलें।',
        },
        downloads: {
          title: 'डाउनलोड',
          description: 'प्रोफार्मा, परिपत्र और आधिकारिक दस्तावेज़ डाउनलोड करें।',
        },
        'teacher-details': {
          title: 'शिक्षक विवरण',
          description: 'अपने संस्थान के शिक्षकों का विवरण दर्ज व अद्यतन करें।',
        },
      },
    },
    leaders: {
      l1: {
        name: 'श्री सम्राट चौधरी',
        designation: 'माननीय मुख्यमंत्री, बिहार',
      },
      l2: {
        name: 'श्री मिथिलेश तिवारी',
        designation: 'माननीय शिक्षा मंत्री, बिहार',
      },
      l3: {
        name: 'जनाब सलीम परवेज़',
        designation: 'माननीय अध्यक्ष\nबिहार राज्य मदरसा शिक्षा बोर्ड',
      },
    },
    updates: {
      title: 'सूचना पट्ट',
      pause: 'रोकें',
      play: 'चलाएँ',
      viewArchive: 'संग्रह देखें',
      officialCount: (count, cat) => `${count} आधिकारिक ${cat}`,
      newBadge: 'नया',
      categories: {
        Notices: 'सूचनाएँ',
        Tenders: 'निविदाएँ',
        Proformas: 'प्रोफार्मा',
      },
      emptyTitle: (cat) => `अभी कोई ${cat} प्रकाशित नहीं है।`,
      emptyDescription:
        'सत्यापित सामग्री उपलब्ध होते ही यहाँ तिथि, दस्तावेज़ प्रकार और सुरक्षित लिंक के साथ प्रदर्शित की जाएगी।',
    },
    gallery: {
      eyebrow: 'गतिविधियाँ एवं गैलरी',
      title: 'कार्यक्रम एवं छायाचित्र एल्बम',
      description: 'कार्यक्रम की तस्वीरें देखने के लिए किसी भी फ़ोल्डर पर क्लिक करें।',
      photosWord: 'तस्वीरें',
      openAlbum: 'एल्बम खोलें',
      closeViewer: 'छवि दर्शक बंद करें',
      prevImage: 'पिछली तस्वीर',
      nextImage: 'अगली तस्वीर',
      albums: {
        'album-shatabdi-samaroh': {
          title: 'बीएसएमईबी शताब्दी समारोह',
          date: 'शताब्दी कार्यक्रम',
          captions: [
            'शताब्दी समारोह सभागार में बड़ी संख्या में उपस्थित मदरसा शिक्षक एवं प्रतिनिधिगण',
            'माननीय मुख्यमंत्री एवं बोर्ड अध्यक्ष द्वारा दीप प्रज्वलन कर समारोह का शुभारंभ',
            'मंच पर माननीय मुख्यमंत्री व गणमान्य अतिथियों का विशाल पुष्पमाला से स्वागत',
            'माननीय मुख्यमंत्री को बोर्ड अध्यक्ष द्वारा सम्मान-पत्र भेंट',
            'बीएसएमईबी शताब्दी समारोह स्मारिका का आधिकारिक विमोचन',
            'बिहार राज्य मदरसा शिक्षा बोर्ड के मंच से संबोधन',
            'शताब्दी समारोह मंच पर आसीन माननीय अध्यक्ष जनाब सलीम परवेज़',
          ],
        },
        'album-convocation': {
          title: 'वार्षिक दीक्षांत एवं सम्मान समारोह',
          date: 'नवंबर 2026',
          captions: [
            'वार्षिक समारोह में मेधावी छात्र-छात्राओं का सम्मान',
            'फौकानिया और मौलवी के उत्तीर्ण विद्यार्थी',
            'शैक्षणिक उत्कृष्टता पर मुख्य उद्बोधन',
          ],
        },
        'album-training': {
          title: 'मदरसा शिक्षक प्रशिक्षण कार्यशाला',
          date: 'अक्टूबर 2026',
          captions: [
            'मदरसा शिक्षकों के लिए संवादात्मक शिक्षण कार्यशाला',
            'पाठ्यक्रम आधुनिकीकरण पर चर्चा सत्र',
            'डिजिटल शिक्षण सामग्री की समीक्षा',
          ],
        },
        'album-board-meeting': {
          title: 'बोर्ड समीक्षा एवं संचालन बैठक',
          date: 'सितंबर 2026',
          captions: [
            'परीक्षा और सम्बद्धता नीतियों की त्रैमासिक समीक्षा',
            'बोर्ड मुख्यालय एवं प्रशासनिक भवन',
          ],
        },
      },
    },
    examination: {
      eyebrow: 'परीक्षा एवं समकक्षता',
      title: 'परीक्षा कार्यक्रम',
      description:
        'बीएसएमईबी तीन प्रमुख बोर्ड परीक्षाएँ आयोजित करता है जिन्हें शैक्षणिक व सरकारी संस्थानों में मान्यता प्राप्त है।',
      keySubjects: 'प्रमुख विषय',
      equivalentTo: 'समकक्षता',
      programs: {
        wastania: {
          name: 'वस्तानिया',
          secondaryName: 'Wastania',
          level: 'मध्य स्तर',
          duration: '3 वर्ष',
          description:
            'आधारभूत स्तर की परीक्षा जिसमें इस्लामी अध्ययन, अरबी, उर्दू, हिंदी, गणित और सामान्य विषय शामिल हैं।',
          subjects: [
            'इस्लामी अध्ययन',
            'अरबी',
            'उर्दू',
            'हिंदी',
            'गणित',
            'विज्ञान एवं सामाजिक विज्ञान',
          ],
          equivalentTo: 'कक्षा 8 (मध्य विद्यालय समकक्ष)',
        },
        fauquania: {
          name: 'फौकानिया',
          secondaryName: 'Fauquania',
          level: 'माध्यमिक स्तर',
          duration: '2 वर्ष',
          description:
            'वस्तानिया के बाद माध्यमिक स्तर की बोर्ड परीक्षा, जिसमें इस्लामी अध्ययन, भाषाएँ, गणित और विज्ञान शामिल हैं।',
          subjects: [
            'इस्लामी अध्ययन',
            'अरबी',
            'उर्दू',
            'हिंदी / अंग्रेज़ी',
            'गणित',
            'विज्ञान एवं सामाजिक विज्ञान',
          ],
          equivalentTo: 'कक्षा 10 (मैट्रिक समकक्ष)',
        },
        moulvi: {
          name: 'मौलवी',
          secondaryName: 'Moulvi',
          level: 'उच्च माध्यमिक स्तर',
          duration: '2 वर्ष',
          description:
            'इस्लामी धर्मशास्त्र, अरबी और ऐच्छिक संकायों (कला, विज्ञान, वाणिज्य, इस्लामियात) में उच्च माध्यमिक योग्यता।',
          subjects: [
            'इस्लामी धर्मशास्त्र',
            'अरबी एवं फ़ारसी',
            'उर्दू एवं अंग्रेज़ी',
            'कला / विज्ञान / वाणिज्य',
          ],
          equivalentTo: 'कक्षा 12 (इंटरमीडिएट समकक्ष)',
        },
      },
    },
    affiliation: {
      eyebrow: 'सम्बद्धता एवं नियमावली',
      title: 'सम्बद्धता, अधिनियम एवं नियमावली',
      description:
        'सम्बद्ध मदरसों के लिए आधिकारिक संसाधन, वैधानिक नियम और संस्थागत दिशा-निर्देश।',
      cards: {
        process: {
          title: 'सम्बद्धता प्रक्रिया',
          description:
            'मदरसों की नई सम्बद्धता एवं नवीनीकरण हेतु दिशा-निर्देश, पात्रता मानदंड और आवेदन प्रपत्र।',
          linkLabel: 'दिशा-निर्देश देखें',
        },
        search: {
          title: 'संस्थान खोजें',
          description:
            'डायरेक्टरी डेटा प्रकाशित होने पर जिला, प्रखंड या मदरसा कोड द्वारा सम्बद्ध मदरसों को खोजें।',
          linkLabel: 'डायरेक्टरी खोजें',
        },
        inspection: {
          title: 'निरीक्षण एवं अनुपालन',
          description:
            'सम्बद्ध मदरसों के लिए निरीक्षण सूची, आधारभूत संरचना मानक और वार्षिक अनुपालन विवरण।',
          linkLabel: 'चेकलिस्ट देखें',
        },
        'act-regulations': {
          title: 'अधिनियम एवं नियमावली',
          description:
            'बिहार राज्य मदरसा शिक्षा बोर्ड अधिनियम, वैधानिक नियम, सेवा शर्तें और आधिकारिक उप-नियम।',
          linkLabel: 'अधिनियम व नियम पढ़ें',
        },
      },
    },
    footer: {
      govLabel: 'बिहार सरकार',
      tagline:
        'बिहार में मदरसा शिक्षा, परीक्षाओं और सम्बद्धता के लिए वैधानिक स्वायत्त बोर्ड।',
      quickLinksTitle: 'त्वरित लिंक',
      contactTitle: 'संपर्क',
      policiesTitle: 'नीतियाँ',
      quickLinks: {
        notices: 'सूचनाएँ एवं निविदाएँ',
        examination: 'परीक्षा जानकारी',
        affiliation: 'सम्बद्धता एवं अधिनियम',
        services: 'ऑनलाइन सेवाएँ',
        gallery: 'फोटो गैलरी',
      },
      policies: {
        privacy: 'गोपनीयता नीति',
        accessibility: 'सुगम्यता विवरण',
        rti: 'आरटीआई जानकारी',
        terms: 'उपयोग की शर्तें',
      },
      address: '5, विद्यापति मार्ग, पटना, बिहार — 800001',
      hours: 'सोम–शुक्र: सुबह 9:30 – शाम 6:00 बजे',
      socialLabels: {
        facebook: 'फेसबुक',
        twitter: 'ट्विटर',
        youtube: 'यूट्यूब',
      },
      copyrightSuffix: 'बिहार सरकार।',
      portalTag: 'आधिकारिक जन सूचना पोर्टल',
    },
    themeSwitcher: {
      buttonLabel: 'थीम',
      heading: 'प्रदर्शन थीम',
      themes: {
        'navy-saffron': 'नेवी / केसरिया',
        'maroon-gold': 'मैरून / सुनहरा',
        'royal-blue-teal': 'रॉयल ब्लू / टील',
        'emerald-sage': 'हरा / हल्का हरा',
        'clean-white': 'सफ़ेद / स्लेट',
        chaiui: 'वॉर्म एम्बर',
      },
    },
  },
}

export function getTranslations(language: Language): SiteTranslations {
  return translations[language]
}

export function useTranslations(): SiteTranslations {
  const { language } = usePreferences()
  return translations[language]
}
