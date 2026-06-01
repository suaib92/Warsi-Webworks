import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

/**
 * Captures a DOM element and exports it as a multi-page A4 PDF.
 */
export async function exportToPDF(elementId: string, filename: string = 'document.pdf', forceWhiteBackground: boolean = true) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found.`);
    return;
  }

  // To ensure the PDF doesn't capture a dark mode background if not desired
  const originalBackground = element.style.backgroundColor;
  if (forceWhiteBackground) {
    element.style.backgroundColor = '#ffffff';
  }

  try {
    const imgData = await toPng(element, {
      pixelRatio: 2,
      backgroundColor: forceWhiteBackground ? '#ffffff' : undefined,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // We need to calculate original image dimensions, so let's load it in an Image object first
    const img = new Image();
    img.src = imgData;
    await new Promise((resolve) => { img.onload = resolve; });

    const imgWidth = img.width;
    const imgHeight = img.height;
    
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = 0;
    const imgY = 0;

    // We calculate if it needs multiple pages. For simplicity and standard A4 scaling:
    // If the image is taller than A4, we need to add pages.
    const scaledHeight = imgHeight * (pdfWidth / imgWidth);
    
    if (scaledHeight <= pdfHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledHeight);
    } else {
      // Multi-page handling
      let heightLeft = scaledHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
      heightLeft -= pdfHeight;

      while (heightLeft >= 0) {
        position = heightLeft - scaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
        heightLeft -= pdfHeight;
      }
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    if (forceWhiteBackground) {
      element.style.backgroundColor = originalBackground;
    }
  }
}

/**
 * Generates a text file download.
 */
export function exportToText(content: string, filename: string = 'export.txt') {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Generates a JSON file download.
 */
export function exportToJSON(data: object, filename: string = 'export.json') {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Generates a CSV file download from a 2D array of strings.
 */
export function exportToCSV(data: string[][], filename: string = 'export.csv') {
  const content = data.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Generates a CSS file download.
 */
export function exportToCSS(content: string, filename: string = 'styles.css') {
  const blob = new Blob([content], { type: 'text/css;charset=utf-8' });
  triggerDownload(blob, filename);
}

/**
 * Helper to trigger the browser download behavior
 */
function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
