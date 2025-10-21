import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer: React.FC = () => {
  const t = useTranslation();

  return (
    <footer>
      <p>{t('footer.copy')}</p>
    </footer>
  );
};

export default Footer;
