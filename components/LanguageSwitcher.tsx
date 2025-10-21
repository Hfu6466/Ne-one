import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const t = useTranslation();

  return (
    <button onClick={toggleLanguage}>
      {language === 'en' ? t('languageSwitcher.switchToHindi') : t('languageSwitcher.switchToEnglish')}
    </button>
  );
};

export default LanguageSwitcher;
