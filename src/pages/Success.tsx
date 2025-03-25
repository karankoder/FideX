import { useLocation, useNavigate } from 'react-router';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

const BASE_URL = 'process.env.BASE_URL as string;';

export default function Success() {
  const location = useLocation();
  const businessHash = new URLSearchParams(location.search).get('businessHash');
  const qrCodeUrl = `${BASE_URL}/checkout?businessHash=${businessHash}`;
  console.log('qrCodeUrl', qrCodeUrl);
  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAssistant = (): void => {
    if (businessHash) {
      navigate(`/checkout?businessHash=${businessHash}`);
    }
  };

  const downloadQRCode = (): void => {
    if (qrCodeRef.current) {
      setIsDownloading(true);
      toPng(qrCodeRef.current)
        .then((dataUrl: string) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'qr-code.png';
          link.click();
          setIsDownloading(false);
        })
        .catch((error: unknown) => {
          console.error('Error generating QR code image', error);
          setIsDownloading(false);
        });
    }
  };

  console.log('businessHash', businessHash);
  return (
    <div
      className='flex flex-col w-full items-center text-[#F0F0F0]'
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <h1 className='text-4xl  text-[#FFAA00] font-semibold text-center mt-4'>
        Your <span className='text-purple-500'>Loyalty</span> Program is{' '}
        <span className='text-purple-500'>Live!</span>
      </h1>
      <p className='mt-8 text-xl text-[#F0F0F0]'>Scan to earn rewards</p>

      <div ref={qrCodeRef} className='mt-2 rounded-lg border border-[#F0F0F0] p-2'>
        <QRCodeSVG value={qrCodeUrl} size={224} fgColor='#1E1E1E' bgColor='#F0F0F0' level='M' />
      </div>

      <p className='w-3/5 mt-4 text-center text-[#B0B0B0] text-lg'>
        Customers can scan this QR code to start earning rewards instantly. Just display it at
        checkout, and let every purchase turn into a rewarding experience!
      </p>

      <div className='flex gap-80 mt-10 w-full items-center justify-center'>
        <button
          className='bg-[#8A2BE2] hover:bg-purple-600 text-white font-medium px-10 py-3 rounded-lg cursor-pointer'
          onClick={handleAssistant}
        >
          Try AI Assistant
        </button>
        <button
          onClick={downloadQRCode}
          className='bg-[#FFAA00] hover:bg-amber-500 text-[#0A192F] font-semibold px-6 py-3 rounded-lg cursor-pointer'
        >
          {isDownloading ? 'Downloading...' : 'Download QR code'}
        </button>
      </div>
    </div>
  );
}
