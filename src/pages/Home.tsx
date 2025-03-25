import logo from '@/assets/home-logo.png';
import { useNavigate } from 'react-router';
import Ripples from 'react-ripples';
import { FC } from 'react';

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className='w-full flex justify-between items-center px-10'
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className='left h-full w-3/5 flex flex-col justify-center'>
        <div className='text-[#FFAA00] font-semibold text-6xl leading-16 mb-8'>
          <span className='text-[#8A2BE2]'>Scan</span> &{' '}
          <span className='text-[#8A2BE2]'>Earn</span> Instantly. <br />
          Loyalty Like Never Before!
        </div>
        <div className='text-[#B0B0B0] text-3xl mb-20'>
          Turn every visit into rewards! No cards, no hassle—just scan the QR and get rewarded
          instantly on the blockchain
        </div>
        <div className='flex gap-10'>
          <Ripples
            className='rounded-xl text-inherit'
            color='rgba(255, 255, 255, 0.4)'
            during={1000}
          >
            <button
              className='bg-[#8A2BE2] font-semibold text-[#F0F0F0] text-xl px-8 py-5 rounded-xl cursor-pointer 
                   shadow-lg shadow-[#8A2BE2]/50 transition-all duration-300 ease-in-out 
                   hover:bg-[#7a26c9] hover:shadow-[#8A2BE2]/60
                   active:shadow-md relative overflow-hidden'
              onClick={() => navigate('/launch')}
            >
              Launch Loyalty Program
            </button>
          </Ripples>

          <Ripples
            className='rounded-xl text-inherit'
            color='rgba(255, 255, 255, 0.3)'
            during={1000}
          >
            <button
              className='bg-[#FFAA00] font-semibold text-[#0A192F] text-xl px-17 py-5 rounded-xl cursor-pointer 
                   shadow-lg shadow-[#FFAA00]/40 transition-all duration-300 ease-in-out
                   hover:bg-[#E69A00] hover:shadow-[#FFAA00]/50
                   relative overflow-hidden'
              onClick={() => navigate('/')}
            >
              Chat Assistant
            </button>
          </Ripples>
        </div>
      </div>
      <div className='right'>
        <img src={logo} alt='Home Logo' />
      </div>
    </div>
  );
};

export default Home;
