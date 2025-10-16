import React, { useRef } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-gray-800 transition-all duration-300"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, application/pdf"
      />
      <div className="flex flex-col items-center justify-center space-y-4 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <p className="font-semibold">ब्राउज़ करने के लिए क्लिक करें या एक छवि/PDF खींचें और छोड़ें</p>
        <p className="text-sm">PNG, JPG, JPEG, या PDF।</p>
      </div>
    </div>
  );
};
