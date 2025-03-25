import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useEthereum } from '@/services/ethereum/context.ts';
import logo from '../assets/logo.png';

export const Navigation: React.FC = () => {
  const { account, connect, disconnect } = useEthereum();
  const [action, setAction] = useState<() => void>(() => () => {});
  const [label, setLabel] = useState<string>('Loading...');

  useEffect(() => {
    if (!account) return;
    console.log('Account:', account);
    if (account.isConnected) {
      setAction(() => disconnect);
      setLabel(`Logout ${account.address.slice(0, 5)}...${account.address.slice(-4)}`);
    } else {
      setAction(() => connect);
      setLabel('Connect');
    }
  }, [account.isConnected]);

  return (
    <nav className='bg-[#0A192F] w-full h-20 flex items-center justify-between px-5'>
      <div className='flex items-center gap-4'>
        <img src={logo} alt='Logo' className='h-[50px] w-[50px]' />
        <Link to='/' className='text-lg text-white font-semibold'>
          FideX
        </Link>
      </div>
      <div className='flex items-center gap-8 text-lg text-[#F0F0F0]'>
        <Link to='/' className='hover:text-white transition'>
          Home
        </Link>
        <Link to='/features' className='hover:text-white transition'>
          Features
        </Link>
        <Link to='/checkout' className='hover:text-white transition'>
          Assistant
        </Link>
        <Link to='/businesses' className='hover:text-white transition'>
          Businesses
        </Link>
        <button
          className='bg-[#FFAA00] font-semibold text-[#0A192F] px-8 py-2 rounded-full ml-10 cursor-pointer transition-transform transform active:scale-95'
          onClick={action}
        >
          {label}
        </button>
      </div>
    </nav>
  );
};
