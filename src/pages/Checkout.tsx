import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FaRobot, FaUser, FaTrophy, FaDollarSign, FaTag } from 'react-icons/fa';
import socket from "../utils/socket";
import { v4 as uuidv4 } from "uuid";
import { useEthereum } from '@/services/ethereum/context.ts';
import { daiContractConfig } from '@/services/contracts.ts';

interface Message {
  id?: string;
  content: string;
}

interface MessageGroup {
  id?: string;
  author: 'ai' | 'user';
  messages: Message[];
}

interface Business {
  name: string;
  owner: string;
  reward_threshold: string;
  reward_amount: string;
  product_price: string;
}

export default function Checkout() {
  const [input, setInput] = useState<string>('');
  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([
    {
      author: 'ai',
      messages: [{ content: 'Hi there, how can I help you?' }],
    },
  ]);
  const [business, setBusiness] = useState<Business | null>(null);
 const { account, getZKsync } = useEthereum();
  const navigate = useNavigate();
  const location = useLocation();
  const businessHash = new URLSearchParams(location.search).get('businessHash');
  const messageGroupsRef = useRef<MessageGroup[]>([]);
  messageGroupsRef.current = messageGroups;

  const buy = async () => {
    try {
      const zkSync = getZKsync();
      if (!zkSync) {
        console.error('Provider not found');
        return;
      }
      const contract = new zkSync.L2.eth.Contract(daiContractConfig.abi, daiContractConfig.address);

      const receipt = await contract.methods
        .buySomething(
          parseInt(businessHash),
          0
        )
        .send({ from: account.address || '' });

      console.log('Success:', receipt);
   
    } catch (error) {
      console.error('Error :', error);
    }
    console.log('Done buying');
  }
  const claim_reward = async () => {
    try {
      const zkSync = getZKsync();
      if (!zkSync) {
        console.error('Provider not found');
        return;
      }
      const contract = new zkSync.L2.eth.Contract(daiContractConfig.abi, daiContractConfig.address);

      const receipt = await contract.methods
        .claimReward(
          parseInt(businessHash)
        )
        .send({ from: account.address || '' });

      console.log('Success:', receipt);
    } catch (error) {
      console.error('Error ', error);
    }
    console.log('Done claim reward');
  }
  const shutdown_business = async () => {
    try {
      const zkSync = getZKsync();
      if (!zkSync) {
        console.error('Provider not found');
        return;
      }
      const contract = new zkSync.L2.eth.Contract(daiContractConfig.abi, daiContractConfig.address);

      const receipt = await contract.methods
        .claimReward(
          parseInt(businessHash)
        )
        .send({ from: account.address || '' });

      console.log('Success:', receipt);
    } catch (error) {
      console.error('Error ', error);
    }
    console.log('Done  shutdown_business');
}

  const addNewMessage = (author, content) => {
    const groups = messageGroupsRef.current;
    if (groups.length > 0) {
        const lastMessageGroup = { ...groups[groups.length - 1] };
        if (lastMessageGroup.author === author) {
            lastMessageGroup.messages.push({ content, id: uuidv4() });
            setMessageGroups((oldGroups) => [...oldGroups.slice(0, -1), lastMessageGroup]);
            return;
        }
    }
    setMessageGroups((oldMessageGroups) => [
        ...oldMessageGroups,
        { author, messages: [{ content, id: uuidv4() }], id: uuidv4() },
    ]);
  };

  async function txnfunction(txnhash) {
      
  }
  function extractTransactionHashes(content) {
    const regex = /[a-zA-Z0-9]{31,}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        matches.push(match[0]);
    }
  
    return matches.length > 0 ? matches : null;
  }
  
  useEffect(() => {
    // Dummy business data for demo purposes
    socket.connect();
    console.log("socket", socket);
    setBusiness({
      name: 'Demo Business',
      owner: '0x1234567890abcdef1234567890abcdef12345678',
      reward_threshold: '500 points',
      reward_amount: '$50',
      product_price: '$20',
    });
    const onResponse = async (value) => {
      const txnhashes = extractTransactionHashes(value);
      console.log("txnhashes", txnhashes);
      if (txnhashes != null) {
          for (const txnhash of txnhashes) {
              console.log("txnhash", txnhash);
              const methodNames = await txnfunction(txnhash);
              console.log(methodNames);
              if (methodNames[0] === "RegisterBusinessEvent") {
                  console.log("RegisterBusinessEvent");
                  navigate("/launch");
              }
              else if (methodNames[0] === "BuyEvent") {
                  buy();
              }
              else if (methodNames[0] === "ClaimRewardEvent") {
                  claim_reward();
              }
              else if (methodNames[0] === "BusinessShutdownEvent") {
                  shutdown_business();
              }
          }
      }
      addNewMessage("ai", value);
  };

  socket.on("response", onResponse);

  return () => {
      socket.off("response", onResponse);
      socket.disconnect();
  };
  }, []);

  return (
    <div
      className='w-full flex text-[#F0F0F0] p-10 px-14 gap-8'
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className='w-3/10 min-h-80 bg-[#353535] text-black font-semibold text-lg rounded-xl flex flex-col shadow-lg p-4'>
        {businessHash ? (
          business ? (
            <>
              <h2 className='text-4xl font-semibold text-[#FFAA00] mb-2'>{business.name}</h2>
              <p className='text-[#F0F0F0] text-lg mb-1'>
                Owner:{' '}
                {business.owner.length > 20
                  ? `${business.owner.substring(0, 10)}....${business.owner.substring(business.owner.length - 10)}`
                  : business.owner}
              </p>
              <div className='mt-4 space-y-4'>
                <div className='flex items-center justify-between bg-[#2C2C2C] p-3 rounded-lg shadow-md'>
                  <FaTrophy className='text-[#FFAA00] text-xl' />
                  <div className='text-right'>
                    <span className='block font-bold text-[#FFAA00]'>Reward Threshold</span>
                    <span className='text-[#F0F0F0]'>{business.reward_threshold}</span>
                  </div>
                </div>
                <div className='flex items-center justify-between bg-[#2C2C2C] p-3 rounded-lg shadow-md'>
                  <FaDollarSign className='text-[#FFAA00] text-xl' />
                  <div className='text-right'>
                    <span className='block font-bold text-[#FFAA00]'>Reward Amount</span>
                    <span className='text-[#F0F0F0]'>{business.reward_amount}</span>
                  </div>
                </div>
                <div className='flex items-center justify-between bg-[#2C2C2C] p-3 rounded-lg shadow-md'>
                  <FaTag className='text-[#FFAA00] text-xl' />
                  <div className='text-right'>
                    <span className='block font-bold text-[#FFAA00]'>Product Price</span>
                    <span className='text-[#F0F0F0]'>{business.product_price}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className='flex items-center justify-center h-full'>
              <span className='text-white'>Loading....</span>
            </div>
          )
        ) : (
          <div className='flex items-center justify-center h-full'>
            <span className='text-[#FFAA00] text-xl'>Welcome to the AI Assistant</span>
          </div>
        )}
      </div>

      <div className='w-7/10 flex-1 border border-purple-500 rounded-xl p-4 bg-[#0A192F] flex flex-col shadow-lg'>
        <h2 className='text-xl text-center font-semibold text-purple-400 border-b-2 border-purple-500 pb-4'>
          <span className='text-[#FFAA00]'>Loyalty AI</span> - Your Smart Business Assistant
        </h2>
        <div
          className='mt-4 space-y-3 flex-grow overflow-auto'
          style={{ maxHeight: '60vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {messageGroups.map((group) => (
            <div key={group.id} className='mb-4'>
              {group.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-center gap-2 ${group.author === 'user' ? 'justify-end' : ''}`}
                >
                  {group.author === 'ai' && (
                    <div className='text-sm font-bold text-gray-300 bg-[#8A2BE2] px-2 py-1 rounded-full shadow-md flex items-center justify-center w-8 h-8'>
                      <FaRobot />
                    </div>
                  )}
                  <div
                    className={`w-2/5 max-w-2/5 pl-2 py-2 mt-1 rounded-lg shadow-md break-words ${group.author === 'ai' ? 'bg-[#9D00CD] text-white' : 'bg-[#8A2BE2] text-white'}`}
                  >
                    {message.content}
                  </div>
                  {group.author === 'user' && (
                    <div className='text-sm font-bold text-gray-300 bg-[#9D00CD] px-2 py-1 rounded-full shadow-md flex items-center justify-center w-8 h-8'>
                      <FaUser />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className='w-full flex items-center gap-8 pt-5 border-t-2 border-[#35445A]'>
          <input
            type='text'
            placeholder='Chat with the assistant....'
            className='flex-1 bg-[#1E1E1E] py-3 text-gray-300 px-5 border-1 border-[#00FFFF] placeholder-gray-500 rounded-4xl focus:outline-none focus:ring-1 focus:ring-[#00FFFF]'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <style>
        {`
                    .overflow-auto::-webkit-scrollbar {
                        display: none;
                    }
                `}
      </style>
    </div>
  );
}
