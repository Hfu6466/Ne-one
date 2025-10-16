import React, { useState, useCallback } from 'react';
import { FileUploader } from './components/FileUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Loader } from './components/Loader';
import { extractPhoneNumbersFromImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { GithubIcon } from './components/icons/GithubIcon';
import { PdfFileIcon } from './components/icons/PdfFileIcon';


export default function App(): React.ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedNumbers, setExtractedNumbers] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/') && selectedFile.type !== 'application/pdf') {
        setError('कृपया एक छवि (PNG, JPG) या PDF फ़ाइल अपलोड करें।');
        setFile(null);
        setImagePreview(null);
        return;
      }
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setImagePreview(previewUrl);
      } else {
        setImagePreview(null); // No preview for PDF, we'll use the file object directly
      }
      setError(null);
      setExtractedNumbers(null);
    }
  };

  const handleClear = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setFile(null);
    setImagePreview(null);
    setExtractedNumbers(null);
    setError(null);
    setIsLoading(false);
  };

  const handleExtract = useCallback(async () => {
    if (!file) {
      setError('कृपया पहले एक फ़ाइल चुनें।');
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedNumbers(null);

    try {
      const { base64, mimeType } = await fileToBase64(file);
      const numbers = await extractPhoneNumbersFromImage(base64, mimeType);
      
      if (numbers.length === 0) {
        setError('छवि या दस्तावेज़ में कोई 10-अंकीय फ़ोन नंबर नहीं मिला।');
      } else {
        setExtractedNumbers(numbers);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'एक अज्ञात त्रुटि हुई।');
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            नंबर एक्सट्रैक्टर एआई
          </h1>
          <p className="text-gray-400 mt-2">
            सभी 10-अंकीय फ़ोन नंबरों को तुरंत निकालने के लिए एक छवि या PDF अपलोड करें।
          </p>
        </header>

        <main className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
          {!file && <FileUploader onFileSelect={handleFileChange} />}

          {file && (
            <div className="text-center">
              {file.type.startsWith('image/') && imagePreview ? (
                <img
                  src={imagePreview}
                  alt="चयनित पूर्वावलोकन"
                  className="max-h-60 w-auto mx-auto rounded-lg border-2 border-gray-600"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 bg-gray-700/50 rounded-lg border-2 border-gray-600">
                  <PdfFileIcon className="w-16 h-16 text-red-400" />
                  <p className="mt-2 text-gray-300 font-mono">{file.name}</p>
                </div>
              )}
            </div>
          )}

          {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center">{error}</div>}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {file && !isLoading && !extractedNumbers && (
              <>
                <button
                  onClick={handleExtract}
                  disabled={isLoading}
                  className="w-full sm:w-auto flex-grow px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'निकाला जा रहा है...' : 'नंबर निकालें'}
                </button>
                <button
                  onClick={handleClear}
                  disabled={isLoading}
                  className="w-full sm:w-auto flex-grow px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  साफ़ करें
                </button>
              </>
            )}
             {(isLoading || extractedNumbers) && file && (
                 <button
                 onClick={handleClear}
                 disabled={isLoading}
                 className="w-full sm:w-auto flex-grow px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-300"
               >
                 नई फ़ाइल अपलोड करें
               </button>
             )}
          </div>

          {isLoading && <Loader />}
          
          {extractedNumbers && <ResultsDisplay numbers={extractedNumbers} />}
        </main>
        <footer className="text-center mt-8 text-gray-500">
            <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-indigo-400 transition-colors">
                <GithubIcon className="w-5 h-5" />
                <span>View on GitHub</span>
            </a>
        </footer>
      </div>
    </div>
  );
}