import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTranslation } from '../hooks/useTranslation';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const t = useTranslation();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? t('themeSwitcher.switchToDark') : t('themeSwitcher.switchToLight')}
    </button>
  );
};

export default ThemeSwitcher;
