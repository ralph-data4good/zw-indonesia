import { useTranslation } from '../lib/i18n';

export default function LangSwitch() {
  const { lang, setLang } = useTranslation();

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'id' : 'en';
    setLang(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-lg border-2 border-gray-300 hover:border-zwa-primary text-sm font-medium transition-colors"
      aria-label={`Switch language to ${lang === 'en' ? 'Indonesian' : 'English'}`}
    >
      {lang === 'en' ? 'ID' : 'EN'}
    </button>
  );
}

