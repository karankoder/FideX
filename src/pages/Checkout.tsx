import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { FaRobot, FaUser, FaTrophy, FaDollarSign } from 'react-icons/fa';
import socket from '../utils/socket';
import { v4 as uuidv4 } from 'uuid';
import { useEthereum } from '@/services/ethereum/context.ts';
import { daiContractConfig } from '@/services/contracts.ts';
import { Provider, Contract, types } from 'zksync-ethers';

interface Message {
  id?: string;
  content: string;
}

interface MessageGroup {
  id?: string;
  author: 'ai' | 'user';
  messages: Message[];
}

interface Product {
  name: string;
  price: string;
}

interface Business {
  name: string;
  owner: string;
  reward_threshold: string;
  reward_amount: string;
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
  const { account, getZKsync, getProvider } = useEthereum();
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
        .buySomething2(parseInt(businessHash || '0'), 0)
        .send({ from: account.address || '', value: '1000000000000000000' });

      console.log('Success:', receipt);
    } catch (error) {
      console.error('Error :', error);
    }
    console.log('Done buying');
  };
  const claim_reward = async () => {
    try {
      const zkSync = getZKsync();
      if (!zkSync) {
        console.error('Provider not found');
        return;
      }
      const contract = new zkSync.L2.eth.Contract(daiContractConfig.abi, daiContractConfig.address);

      const receipt = await contract.methods
        .claimReward(parseInt(businessHash || '0'))
        .send({ from: account.address || '' });

      console.log('Success:', receipt);
    } catch (error) {
      console.error('Error ', error);
    }
    console.log('Done claim reward');
  };
  const shutdown_business = async () => {
    try {
      const zkSync = getZKsync();
      if (!zkSync) {
        console.error('Provider not found');
        return;
      }
      const contract = new zkSync.L2.eth.Contract(daiContractConfig.abi, daiContractConfig.address);

      const receipt = await contract.methods
        .shutdownBusiness(parseInt(businessHash || '0'))
        .send({ from: account.address || '' });

      console.log('Success:', receipt);
    } catch (error) {
      console.error('Error ', error);
    }
    console.log('Done  shutdown_business');
  };

  interface NewMessage {
    content: string;
    id: string;
  }

  interface NewMessageGroup {
    author: 'ai' | 'user';
    messages: NewMessage[];
    id: string;
  }

  const addNewMessage = (author: 'ai' | 'user', content: string): void => {
    const groups: MessageGroup[] = messageGroupsRef.current;
    if (groups.length > 0) {
      const lastMessageGroup: MessageGroup = { ...groups[groups.length - 1] };
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

  async function txnfunction(txnhash: string) {
    const provider = Provider.getDefaultProvider(types.Network.Sepolia);
    const contract = new Contract(daiContractConfig.address, daiContractConfig.abi, provider);
    const receipt = await provider.getTransactionReceipt(txnhash);
    if (!receipt) {
      console.error('Transaction receipt is null');
      return;
    }
    const events = receipt.logs;
    const parsedEvents = events
      .map((log) => {
        try {
          return contract.interface.parseLog(log);
        } catch (error) {
          console.error('Failed to parse log:', log, error);
          return null;
        }
      })
      .filter((event) => event !== null);

    console.log('Parsed events:', parsedEvents);

    const eventNamesToCheck = [
      'BuyEvent',
      'UpdateRewardConfig',
      'ClaimRewardEvent',
      'BusinessShutdownEvent',
      'RegisterBusinessEvent',
    ];
    let matchedEvent = null;

    for (const event of parsedEvents) {
      if (event && eventNamesToCheck.some((name) => event.name.includes(name))) {
        matchedEvent = event;
        console.log('Matched Event:', matchedEvent.name);
        return matchedEvent.name;

        // if (matchedEvent.name === 'UpdateRewardConfigEvent') {
        //   console.log('Handling UpdateRewardConfigEvent:', matchedEvent.args[0]);
        //   // Add logic to handle the event, e.g., updating state or notifying the user
        //   alert(`Reward configuration updated: ${matchedEvent.args[0]}`);
        // }
      }
    }
  }
  function extractTransactionHashes(content: string) {
    const regex = /[a-zA-Z0-9]{31,}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[0]);
    }

    return matches.length > 0 ? matches : null;
  }

  async function handleSend() {
    const trimmedInput = input.trim();
    if (trimmedInput === '') return;
    let inputs = trimmedInput;
    console.log('trimmed', inputs.length);
    for (let i = 0; i < inputs.length - 4; i++) {
      if (
        inputs[i] == 'p' &&
        inputs[i + 1] == 'o' &&
        inputs[i + 2] == 'i' &&
        inputs[i + 3] == 'n' &&
        inputs[i + 4] == 't'
      ) {
        inputs += `.`;
        const signedAccountId = account?.address || 'unknown';
        inputs += `{ "arguments" : {"Business Number":${businessHash},"userId hash": "${signedAccountId}" }}`;
        break;
      }
    }
    console.log('input string', inputs);
    socket.emit('message', inputs);
    addNewMessage('user', trimmedInput);
    setInput('');
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  async function fetchBusinessesInfo() {
    const zkSync = getZKsync();
    try {
      if (!zkSync) {
        console.error('Provider not found');
        return;
      }
      const contract = new zkSync.L2.eth.Contract(daiContractConfig.abi, daiContractConfig.address);
      const response: {
        owner: string;
        name: string;
        rewardThreshold: number;
        rewardAmount: number;
      } = await contract.methods.getBusinesInfo(businessHash).call();
      console.log(response);
      const parsedBusiness: Business = {
        owner: response.owner,
        name: response.name,
        reward_threshold: `${response.rewardThreshold} points`,
        reward_amount: `$${response.rewardAmount}`,
      };

      setBusiness(parsedBusiness);
      console.log('Business details updated:', parsedBusiness);
    } catch (error) {
      console.error('Error fetching businesses:', error);
    }
  }

  useEffect(() => {
    socket.connect();
    console.log('socket', socket);
    fetchBusinessesInfo();
    const onResponse = async (value) => {
      const txnhashes = extractTransactionHashes(value);
      console.log('txnhashes', txnhashes);
      if (txnhashes != null) {
        for (const txnhash of txnhashes) {
          console.log('txnhash', txnhash);
          const methodName = await txnfunction(txnhash);
          console.log(methodName);
          if (methodName === 'RegisterBusinessEvent') {
            console.log('RegisterBusinessEvent');
            navigate('/launch');
          } else if (methodName === 'BuyEvent') {
            buy();
          } else if (methodName === 'ClaimRewardEvent') {
            claim_reward();
          } else if (methodName === 'BusinessShutdownEvent') {
            shutdown_business();
          }
        }
      }
      addNewMessage('ai', value);
    };

    socket.on('response', onResponse);

    return () => {
      socket.off('response', onResponse);
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
            placeholder='I want to register a business....'
            className='flex-1 bg-[#1E1E1E] py-3 text-gray-300 px-5 border-1 border-[#00FFFF] placeholder-gray-500 rounded-4xl focus:outline-none focus:ring-1 focus:ring-[#00FFFF]'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
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
