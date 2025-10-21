// Minimal dictionary-based i18n for EN/ID
import React from 'react';

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.map': 'Map',
    'nav.resources': 'Resources',
    'nav.campaigns': 'Campaigns',
    'nav.events': 'Events',
    'nav.calculator': 'Calculator',
    'nav.about': 'About',
    'nav.contribute': 'Contribute',
    
    // Home
    'home.hero.title': 'Zero Waste Indonesia',
    'home.hero.subtitle': 'Connecting communities, resources, and initiatives for a waste-free future',
    'home.featured.campaigns': 'Featured Campaigns',
    'home.featured.resources': 'Featured Resources',
    'home.featured.events': 'Upcoming Events',
    'home.spotlight.title': 'Spotlight',
    'home.cta.contribute': 'Contribute an entry',
    'home.cta.join': 'Join a campaign',
    'home.cta.explore': 'Explore calculator',
    
    // Map
    'map.title': 'Map & Directory',
    'map.search': 'Search locations...',
    'map.filters': 'Filters',
    'map.verified': 'Verified only',
    'map.results': 'Results',
    'map.directions': 'Get Directions',
    
    // Resources
    'resources.title': 'Resource Library',
    'resources.search': 'Search resources...',
    'resources.viewGrid': 'Grid view',
    'resources.viewList': 'List view',
    'resources.year': 'Year',
    'resources.format': 'Format',
    'resources.access': 'Access',
    'resources.topic': 'Topic',
    
    // Campaigns
    'campaigns.title': 'Campaigns',
    'campaigns.featured': 'Featured',
    'campaigns.archive': 'All Campaigns',
    'campaigns.status': 'Status',
    'campaigns.partners': 'Partners',
    
    // Events
    'events.title': 'Events',
    'events.upcoming': 'Upcoming',
    'events.past': 'Past Events',
    'events.rsvp': 'RSVP',
    'events.addToCalendar': 'Add to Calendar',
    
    // Calculator
    'calc.title': 'Waste Calculator',
    'calc.inputs': 'Inputs',
    'calc.results': 'Results',
    'calc.population': 'Population',
    'calc.wgpPerCapita': 'Waste per capita (kg/day)',
    'calc.currentDiversion': 'Current diversion rate (%)',
    'calc.targetDiversion': 'Target diversion rate (%)',
    'calc.composition': 'Waste composition',
    'calc.reset': 'Reset to defaults',
    'calc.share': 'Share',
    'calc.download': 'Download JSON',
    'calc.generated': 'Waste generated (tonnes/year)',
    'calc.diverted': 'Diverted',
    'calc.disposed': 'Disposed',
    'calc.emissions': 'CO₂e avoided (tonnes/year)',
    'calc.jobs': 'Jobs created (estimated)',
    
    // About
    'about.title': 'About',
    'about.credits': 'Credits & Data',
    'about.contact': 'Contact',
    
    // Footer
    'footer.countrySwitch': 'This is the Indonesia microsite. Explore other countries:',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.contact': 'Contact',
    'footer.credit': 'A project by GAIA Asia Pacific',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.readMore': 'Read more',
    'common.learnMore': 'Learn more',
    'common.viewAll': 'View all',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.filter': 'Filter',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
  },
  
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.map': 'Peta',
    'nav.resources': 'Sumber Daya',
    'nav.campaigns': 'Kampanye',
    'nav.events': 'Acara',
    'nav.calculator': 'Kalkulator',
    'nav.about': 'Tentang',
    'nav.contribute': 'Berkontribusi',
    
    // Home
    'home.hero.title': 'Zero Waste Indonesia',
    'home.hero.subtitle': 'Menghubungkan komunitas, sumber daya, dan inisiatif untuk masa depan bebas sampah',
    'home.featured.campaigns': 'Kampanye Unggulan',
    'home.featured.resources': 'Sumber Daya Unggulan',
    'home.featured.events': 'Acara Mendatang',
    'home.spotlight.title': 'Sorotan',
    'home.cta.contribute': 'Kontribusi entri',
    'home.cta.join': 'Bergabung dengan kampanye',
    'home.cta.explore': 'Jelajahi kalkulator',
    
    // Map
    'map.title': 'Peta & Direktori',
    'map.search': 'Cari lokasi...',
    'map.filters': 'Filter',
    'map.verified': 'Hanya terverifikasi',
    'map.results': 'Hasil',
    'map.directions': 'Petunjuk Arah',
    
    // Resources
    'resources.title': 'Perpustakaan Sumber Daya',
    'resources.search': 'Cari sumber daya...',
    'resources.viewGrid': 'Tampilan kisi',
    'resources.viewList': 'Tampilan daftar',
    'resources.year': 'Tahun',
    'resources.format': 'Format',
    'resources.access': 'Akses',
    'resources.topic': 'Topik',
    
    // Campaigns
    'campaigns.title': 'Kampanye',
    'campaigns.featured': 'Unggulan',
    'campaigns.archive': 'Semua Kampanye',
    'campaigns.status': 'Status',
    'campaigns.partners': 'Mitra',
    
    // Events
    'events.title': 'Acara',
    'events.upcoming': 'Mendatang',
    'events.past': 'Acara Lampau',
    'events.rsvp': 'RSVP',
    'events.addToCalendar': 'Tambahkan ke Kalender',
    
    // Calculator
    'calc.title': 'Kalkulator Sampah',
    'calc.inputs': 'Input',
    'calc.results': 'Hasil',
    'calc.population': 'Populasi',
    'calc.wgpPerCapita': 'Sampah per kapita (kg/hari)',
    'calc.currentDiversion': 'Tingkat pengalihan saat ini (%)',
    'calc.targetDiversion': 'Target pengalihan (%)',
    'calc.composition': 'Komposisi sampah',
    'calc.reset': 'Atur ulang ke default',
    'calc.share': 'Bagikan',
    'calc.download': 'Unduh JSON',
    'calc.generated': 'Sampah yang dihasilkan (ton/tahun)',
    'calc.diverted': 'Dialihkan',
    'calc.disposed': 'Dibuang',
    'calc.emissions': 'CO₂e yang dihindari (ton/tahun)',
    'calc.jobs': 'Pekerjaan yang diciptakan (perkiraan)',
    
    // About
    'about.title': 'Tentang',
    'about.credits': 'Kredit & Data',
    'about.contact': 'Kontak',
    
    // Footer
    'footer.countrySwitch': 'Ini adalah situs mikro Indonesia. Jelajahi negara lain:',
    'footer.privacy': 'Privasi',
    'footer.terms': 'Ketentuan',
    'footer.contact': 'Kontak',
    'footer.credit': 'Sebuah proyek oleh GAIA Asia Pacific',
    
    // Common
    'common.loading': 'Memuat...',
    'common.error': 'Kesalahan',
    'common.readMore': 'Baca lebih lanjut',
    'common.learnMore': 'Pelajari lebih lanjut',
    'common.viewAll': 'Lihat semua',
    'common.back': 'Kembali',
    'common.next': 'Berikutnya',
    'common.previous': 'Sebelumnya',
    'common.close': 'Tutup',
    'common.open': 'Buka',
    'common.filter': 'Filter',
    'common.clear': 'Hapus',
    'common.apply': 'Terapkan',
    'common.cancel': 'Batal',
    'common.save': 'Simpan',
  }
};

// Get current language from localStorage or default to 'en'
export function getCurrentLanguage() {
  return localStorage.getItem('zwa-lang') || 'en';
}

// Set language and persist to localStorage
export function setLanguage(lang) {
  localStorage.setItem('zwa-lang', lang);
  window.dispatchEvent(new Event('languagechange'));
}

// Get translation by key
export function t(key, lang = getCurrentLanguage()) {
  return translations[lang]?.[key] || translations.en[key] || key;
}

// React hook for translations with live updates
export function useTranslation() {
  const [lang, setLang] = React.useState(getCurrentLanguage());
  
  React.useEffect(() => {
    const handleLanguageChange = () => {
      setLang(getCurrentLanguage());
    };
    
    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, []);
  
  const translate = React.useCallback((key) => t(key, lang), [lang]);
  
  return { t: translate, lang, setLang: setLanguage };
}


