export interface WikimediaEvent {
  text: string;
  year: number;
}

export const fetchHistoricalEvents = async (
  language: 'en' | 'hi',
  month: string,
  day: string
): Promise<WikimediaEvent[]> => {
  try {
    const response = await fetch(
      `https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/all/${month}/${day}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch historical events');
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
