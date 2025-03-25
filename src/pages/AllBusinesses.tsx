import { useNavigate } from 'react-router';
import { useState } from 'react';
import loaderGif from '@/assets/loader.gif';

interface Business {
  id: string;
  name: string;
  description: string;
}

const AllBusinesses: React.FC = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleBusinessClick = (businessHash: string): void => {
    navigate(`/checkout?businessHash=${businessHash}`);
  };

  const handleShowDetails = (businessHash: string): void => {
    navigate(`/success?businessHash=${businessHash}`);
  };

  if (loading) {
    return (
      <div
        className='w-full flex justify-center items-center'
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <img src={loaderGif} alt='Loading...' />
      </div>
    );
  }

  return (
    <div
      className='w-full flex flex-col items-center px-10'
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <h1 className='text-[#FFAA00] font-semibold text-5xl leading-16 mb-8'>
        Our <span className='text-[#8A2BE2]'>Businesses</span>
      </h1>
      <div className='w-full flex flex-col gap-10'>
        {businesses.map((business, index) => (
          <div
            key={index}
            className='bg-[#353535] p-8 rounded-xl shadow-lg cursor-pointer flex justify-between items-center'
            onClick={() => handleBusinessClick(business.id)}
          >
            <div>
              <h2 className='text-[#8A2BE2] font-semibold text-4xl mb-4'>{business.name}</h2>
              <p className='text-[#B0B0B0] text-2xl'>{business.description}</p>
            </div>
            <button
              className='bg-[#FFAA00] text-white p-2 rounded-xl cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                handleShowDetails(business.id);
              }}
            >
              Show Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBusinesses;
