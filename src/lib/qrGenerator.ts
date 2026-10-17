import QRCode from 'qrcode';

/**
 * Generates a PNG data URL for a given target URL.
 */
export async function generateQrPngDataUrl(url: string, size = 320): Promise<string> {
  if (!url) return '';
  return await QRCode.toDataURL(url, {
    width: size,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
}

/**
 * Generates an SVG string for a given target URL.
 */
export async function generateQrSvgString(url: string): Promise<string> {
  if (!url) return '';
  return await QRCode.toString(url, {
    type: 'svg',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
    errorCorrectionLevel: 'M',
  });
}

/**
 * Initiates browser download of the QR code as PNG image.
 */
export async function downloadQrCode(url: string, filename = 'bioforge-qr.png'): Promise<void> {
  const dataUrl = await generateQrPngDataUrl(url, 600);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
