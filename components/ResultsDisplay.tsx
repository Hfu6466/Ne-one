import React, { useState } from 'react';
import { downloadCsv, downloadPdf, downloadVcf } from '../utils/exportUtils';
import { CsvIcon } from './icons/CsvIcon';
import { PdfIcon } from './icons/PdfIcon';
import { VcfIcon } from './icons/VcfIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { CheckIcon } from './icons/CheckIcon';

interface ResultsDisplayProps {
  numbers: string[];
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ numbers }) => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [contactName, setContactName] = useState<string>('');

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handleWhatsApp = (number: string) => {
    // Assuming Indian numbers, prepend 91 if not present.
    const whatsappNumber = number.startsWith('91') ? number : `91${number}`;
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="space-y-6 pt-4 animate-fade-in-up">
      <div>
        <h2 className="text-xl font-semibold text-center mb-4 text-gray-300">निकाले गए नंबर ({numbers.length})</h2>
        <div className="max-h-60 overflow-y-auto bg-gray-900/70 p-4 rounded-lg border border-gray-700 space-y-2">
          {numbers.map((number, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded">
              <span className="font-mono text-indigo-300">{number}</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleWhatsApp(number)} 
                  className="text-green-400 hover:text-green-300 transition-colors"
                  title="WhatsApp पर चैट करें"
                  aria-label="WhatsApp पर चैट करें"
                >
                  <WhatsappIcon className="w-5 h-5" />
                </button>
                <button onClick={() => handleCopy(number)} className="text-gray-400 hover:text-white transition-colors w-5 h-5 flex items-center justify-center">
                  {copiedNumber === number ? <CheckIcon className="text-green-400 w-5 h-5" /> : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-300">निर्यात विकल्प</h3>
        <div className="mb-4">
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-400 mb-2">
                संपर्क नाम (वैकल्पिक):
            </label>
            <input
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="उदा. Amit"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => downloadCsv(numbers)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            <CsvIcon className="w-5 h-5"/>
            <span>CSV डाउनलोड करें</span>
          </button>
          <button
            onClick={() => downloadPdf(numbers)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300"
          >
            <PdfIcon className="w-5 h-5"/>
            <span>PDF डाउनलोड करें</span>
          </button>
          <button
            onClick={() => downloadVcf(numbers, contactName)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <VcfIcon className="w-5 h-5"/>
            <span>संपर्क सहेजें (VCF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};