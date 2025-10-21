import React from 'react';
import { Age } from '../lib/ageCalculator';
import { useTranslation } from '../hooks/useTranslation';

interface AgeDisplayProps {
  age: Age | null;
}

const AgeDisplay: React.FC<AgeDisplayProps> = ({ age }) => {
  const t = useTranslation();

  if (!age) {
    return null;
  }

  return (
    <div>
      <h2>{t('ageDisplay.title')}</h2>
      <p>{age.years} {t('ageDisplay.years')}</p>
      <p>{age.months} {t('ageDisplay.months')}</p>
      <p>{age.days} {t('ageDisplay.days')}</p>
      <p>{age.hours} {t('ageDisplay.hours')}</p>
      <p>{age.minutes} {t('ageDisplay.minutes')}</p>
      <p>{age.seconds} {t('ageDisplay.seconds')}</p>
    </div>
  );
};

export default AgeDisplay;
