import { useLocation, useNavigate } from 'react-router';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { useRef, useState } from 'react';

const BASE_URL = 'process.env.BASE_URL as string;';

export default function Success() {
  const location = useLocation();
  const businessHash = new URLSearchParams(location.search).get('businessHash');
  const qrCodeUrl = `${BASE_URL}/checkout?businessHash=${businessHash}`;
  const qrCodeRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState<number>(120);

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

  const handleShutdownBusiness = (): void => {
    alert('Business has been shut down successfully!');
  };

  const handleClaimRewards = (): void => {
    if (userPoints >= businessInfo.rewardThreshold) {
      alert(`Congratulations! You have claimed ${businessInfo.rewardAmount}% reward.`);
      setUserPoints(userPoints - businessInfo.rewardThreshold);
    } else {
      alert('Not enough points to claim rewards.');
    }
  };

  const businessInfo = {
    name: 'Demo Business',
    description: 'This is a demo business description showcasing loyalty rewards.',
    rewardThreshold: 100,
    rewardAmount: 10,
    ownerAddress: '0x1234567890abcdef1234567890abcdef12345678',
  };

  const products = [
    { name: 'Product 1', price: '$20' },
    { name: 'Product 2', price: '$35' },
    { name: 'Product 3', price: '$50' },
  ];

  return (
    <div
      className='flex flex-col w-full items-center text-[#F0F0F0]'
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <h1 className='text-4xl text-[#FFAA00] font-semibold text-center mt-4'>
        Welcome to <span className='text-purple-500'>{businessInfo.name}</span>
      </h1>

      <div className='flex flex-col lg:flex-row w-full mt-8 px-10 gap-10'>
        <div className='flex-1'>
          <h2 className='text-2xl font-semibold text-[#FFAA00]'>Business Information</h2>
          <p className='mt-4 text-lg text-[#B0B0B0]'>{businessInfo.description}</p>
          <div className='mt-6'>
            <p className='text-lg'>
              <span className='font-semibold text-[#FFAA00]'>Reward Threshold:</span>{' '}
              {businessInfo.rewardThreshold} points
            </p>
            <p className='text-lg'>
              <span className='font-semibold text-[#FFAA00]'>Reward Amount:</span>{' '}
              {businessInfo.rewardAmount}%
            </p>
            <p className='text-lg'>
              <span className='font-semibold text-[#FFAA00]'>Owner Address:</span>{' '}
              {businessInfo.ownerAddress}
            </p>
          </div>

          <h2 className='text-2xl font-semibold text-[#FFAA00] mt-8'>Products</h2>
          <div className='mt-4 overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-[#1E1E1E] text-[#FFAA00]'>
                  <th className='px-4 py-2'>Product Name</th>
                  <th className='px-4 py-2'>Price</th>
                  <th className='px-4 py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-[#2E2E2E]' : 'bg-[#1E1E1E]'
                    } text-[#F0F0F0]`}
                  >
                    <td className='px-4 py-2'>{product.name}</td>
                    <td className='px-4 py-2'>{product.price}</td>
                    <td className='px-4 py-2'>
                      <button className='bg-[#8A2BE2] hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg'>
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='mt-8'>
            <h2 className='text-2xl font-semibold text-[#FFAA00]'>Your Points</h2>
            <p className='mt-4 text-lg text-[#B0B0B0]'>
              You currently have <span className='font-semibold text-[#FFAA00]'>{userPoints}</span>{' '}
              points.
            </p>
            <button
              onClick={handleClaimRewards}
              className='mt-4 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg cursor-pointer'
            >
              Claim Rewards
            </button>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <div ref={qrCodeRef} className='rounded-lg border border-[#F0F0F0] p-4'>
            <QRCodeSVG value={qrCodeUrl} size={224} fgColor='#1E1E1E' bgColor='#F0F0F0' level='M' />
          </div>
          <div className='flex flex-col gap-4 mt-6 w-full max-w-xs'>
            <button
              onClick={downloadQRCode}
              className='bg-[#FFAA00] hover:bg-amber-500 text-[#0A192F] font-semibold px-6 py-3 rounded-lg cursor-pointer'
            >
              {isDownloading ? 'Downloading...' : 'Download QR code'}
            </button>
            <button
              onClick={handleAssistant}
              className='bg-[#8A2BE2] hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-lg cursor-pointer'
            >
              Go to AI Assistant
            </button>
            <button
              onClick={handleShutdownBusiness}
              className='bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg cursor-pointer'
            >
              Shutdown Business
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
