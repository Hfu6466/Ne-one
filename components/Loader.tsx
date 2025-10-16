import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400">AI आपकी फ़ाइल का विश्लेषण कर रहा है...</p>
    </div>
  );
};
