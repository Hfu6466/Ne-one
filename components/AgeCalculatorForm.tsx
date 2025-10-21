import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface AgeCalculatorFormProps {
  onCalculate: (dob: string) => void;
}

const AgeCalculatorForm: React.FC<AgeCalculatorFormProps> = ({ onCalculate }) => {
  const [dob, setDob] = useState('');
  const t = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob) {
      onCalculate(dob);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="dob">{t('ageCalculatorForm.label')}</label>
      <input
        type="date"
        id="dob"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button type="submit">{t('ageCalculatorForm.button')}</button>
    </form>
  );
};

export default AgeCalculatorForm;
