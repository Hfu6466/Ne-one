import React from 'react';
import { WikimediaEvent } from '../services/wikimedia';
import { useTranslation } from '../hooks/useTranslation';

interface HistoricalEventsProps {
  events: WikimediaEvent[];
}

const HistoricalEvents: React.FC<HistoricalEventsProps> = ({ events }) => {
  const t = useTranslation();

  return (
    <div className="historical-events">
      <h2>{t('historicalEvents.title')}</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.year}:</strong> {event.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoricalEvents;
