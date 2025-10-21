import React, { useContext, useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AgeCalculatorForm from './components/AgeCalculatorForm';
import AgeDisplay from './components/AgeDisplay';
import { calculateAge, Age } from './lib/ageCalculator';
import { ThemeContext } from './contexts/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from './hooks/useTranslation';
import { fetchHistoricalEvents, WikimediaEvent } from './services/wikimedia';
import HistoricalEvents from './components/HistoricalEvents';
import { LanguageContext } from './contexts/LanguageContext';

function App() {
  const [age, setAge] = useState<Age | null>(null);
  const [dob, setDob] = useState<string | null>(null);
  const [events, setEvents] = useState<WikimediaEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const t = useTranslation();

  useEffect(() => {
    if (dob) {
      const interval = setInterval(() => {
        setAge(calculateAge(dob));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dob]);

  const handleCalculate = async (newDob: string) => {
    setDob(newDob);
    setAge(calculateAge(newDob));

    const date = new Date(newDob);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    setLoading(true);
    const fetchedEvents = await fetchHistoricalEvents(language, month, day);
    setEvents(fetchedEvents);
    setLoading(false);
  };

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main>
        <div className="controls">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <AgeCalculatorForm onCalculate={handleCalculate} />
        <AgeDisplay age={age} />
        {loading && <p className="loading">{t('app.loading')}</p>}
        {events.length > 0 && <HistoricalEvents events={events} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
