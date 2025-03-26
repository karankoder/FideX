import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Decentralized Loyalty Programs',
    description:
      'Businesses can create and manage their own loyalty programs on the blockchain with transparency and security.',
  },
  {
    title: 'AI-Powered Assistance',
    description:
      'AI Assistant helps businesses and customers interact seamlessly with real-time support.',
  },
  {
    title: 'Multi-Chain Support',
    description:
      'Expand beyond Base to include Ethereum, Polygon, and Arbitrum for more flexibility.',
  },
  {
    title: 'Cross-Business Rewards',
    description:
      'Customers can earn and redeem points across multiple partnered businesses effortlessly.',
  },
  {
    title: 'Seamless Web2 & Web3 Integration',
    description:
      'A user-friendly experience bridging traditional applications with blockchain technology.',
  },
  {
    title: 'AI-Driven Personalized Recommendations',
    description:
      'Leverage AI to analyze purchase history and suggest relevant products and rewards.',
  },
];

export default function Features() {
  return (
    <div className='bg-[#1E1E1E] text-soft-white min-h-screen py-12 px-6'>
      <div className='max-w-6xl mx-auto text-center text-[#FFAA00]'>
        <motion.h2
          className='text-4xl font-bold text-neon-cyan mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-[#0A192F] p-6 rounded-2xl shadow-lg border border-[#8A2BE2] hover:scale-105 transition-transform duration-300'>
                <div className='flex flex-col items-center text-center'>
                  <FaCheckCircle className='text-[#FFAA00] text-3xl mb-4' />
                  <h3 className='text-xl font-semibold mb-2 text-[#8A2BE2]'>{feature.title}</h3>
                  <p className='text-[#B0B0B0]'>{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
