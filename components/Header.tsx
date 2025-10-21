import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Header: React.FC = () => {
  const t = useTranslation();

  return (
    <header>
      <h1>{t('header.title')}</h1>
    </header>
  );
};

export default Header;
