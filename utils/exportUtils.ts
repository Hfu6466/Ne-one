// This makes TypeScript aware of the global jsPDF variable from the CDN
declare const jspdf: any;

const createAndClickLink = (fileName: string, dataUrl: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const downloadCsv = (numbers: string[]) => {
    let csvContent = "data:text/csv;charset=utf-8,PhoneNumber\n";
    csvContent += numbers.join("\n");
    const encodedUri = encodeURI(csvContent);
    createAndClickLink('extracted_numbers.csv', encodedUri);
};

export const downloadPdf = (numbers: string[]) => {
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    
    // Add a font that supports Hindi characters.
    // Note: jsPDF has limited built-in support for Unicode. This is a basic implementation.
    // For full support, a custom font would need to be embedded.
    doc.setFont("Helvetica"); // A standard font
    doc.setFontSize(22);
    // Using a transliterated title that works with standard fonts
    doc.text("Nikale Gaye Phone Number", 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    numbers.forEach((number, index) => {
        const y = 35 + (index * 10);
        // Add new page if content exceeds current page
        if (y > 280) {
            doc.addPage();
            doc.text(number, 20, 20); // Reset position on new page
        } else {
            doc.text(number, 20, y);
        }
    });

    doc.save('extracted_numbers.pdf');
};

export const downloadVcf = (numbers: string[], baseName: string) => {
    let vcfContent = "";
    const trimmedBaseName = baseName.trim();

    numbers.forEach((number, index) => {
        const contactName = trimmedBaseName 
            ? `${trimmedBaseName} ${index + 1}` 
            : `Extracted Contact ${index + 1}`;
            
        vcfContent += "BEGIN:VCARD\n";
        vcfContent += "VERSION:3.0\n";
        vcfContent += `FN:${contactName}\n`;
        vcfContent += `TEL;TYPE=CELL:${number}\n`;
        vcfContent += "END:VCARD\n";
    });

    const blob = new Blob([vcfContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    createAndClickLink('extracted_contacts.vcf', url);
    URL.revokeObjectURL(url);
};