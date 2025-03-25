import { useState } from 'react';
import LoyaltyForm from '@/components/LoyaltyForm';
import { useNavigate } from 'react-router';
import { FormEvent, useCallback } from 'react';
import { useEthereum } from '@/services/ethereum/context.ts';
import { useAsync } from '@/hooks/use-async.ts';
import { daiContractConfig } from '@/services/contracts.ts';

export default function Launch() {
  const [step, setStep] = useState<number>(1);
  const [businessName, setBusinessName] = useState<string>('');
  const [businessDescription, setBusinessDescription] = useState<string>('');
  const [rewardThreshold, setRewardThreshold] = useState<string>('');
  const [rewardAmount, setRewardAmount] = useState<string>('');
  const [productPrice, setProductPrice] = useState<string>('');
  const [paymentAddress, setPaymentAddress] = useState<string>('');
  const { account, getZKsync } = useEthereum();
  const zkSync = getZKsync();
  const navigate = useNavigate();

  const registerBusiness = async () => {
    try {
      if (!zkSync) {
        console.error('Provider not found');
        return;
      }
      const contract = new zkSync.L2.eth.Contract(daiContractConfig.abi, daiContractConfig.address);

      const receipt = await contract.methods
        .registerBusiness(
          businessName,
          parseInt(rewardThreshold),
          parseInt(rewardAmount),
          paymentAddress,
          businessDescription,
          parseInt(productPrice)
        )
        .send({ from: account.address || '' });

      console.log('Success:', receipt);
      // navigate(`/success?businessHash=${receipt.transactionHash}`);
    } catch (error) {
      console.error('Error registering business:', error);
    }
    console.log('Done');
  };

  const handleSubmit = (): void => {
    registerBusiness();
  };

  return (
    <div
      className='flex flex-col w-full items-center justify-center'
      style={{ minHeight: 'calc(100vh - 80px)' }}
    >
      <div className='w-1/2 text-center text-[#FFAA00]'>
        <h2 className='text-4xl font-semibold'>
          <span className='text-purple-500'>Launch</span> Your AI{' '}
          <span className='text-purple-500'>Loyalty</span> System
        </h2>
        <p className='text-[#B0B0B0] mt-2 text-lg'>
          Customize your AI-powered checkout to accept digital payments and automatically reward
          customers with a seamless loyalty program.
        </p>
      </div>
      <div className='w-1/2 h-fit flex flex-col items-center bg-[#0A192F] text-white mt-8 rounded-lg border border-purple-500 shadow-lg'>
        <LoyaltyForm
          step={step}
          setStep={setStep}
          businessName={businessName}
          setBusinessName={setBusinessName}
          businessDescription={businessDescription}
          setBusinessDescription={setBusinessDescription}
          rewardThreshold={rewardThreshold}
          setRewardThreshold={setRewardThreshold}
          rewardAmount={rewardAmount}
          setRewardAmount={setRewardAmount}
          productPrice={productPrice}
          setProductPrice={setProductPrice}
          paymentAddress={paymentAddress}
          setPaymentAddress={setPaymentAddress}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
