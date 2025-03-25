import PropTypes from 'prop-types';

interface LoyaltyFormProps {
  step: number;
  setStep: (step: number) => void;
  businessName: string;
  setBusinessName: (name: string) => void;
  businessDescription: string;
  setBusinessDescription: (description: string) => void;
  rewardThreshold: string;
  setRewardThreshold: (threshold: string) => void;
  rewardAmount: string;
  setRewardAmount: (amount: string) => void;
  productPrice: string;
  setProductPrice: (price: string) => void;
  paymentAddress: string;
  setPaymentAddress: (address: string) => void;
  handleSubmit: () => void;
  products: { name: string; price: string }[];
  addProduct: () => void;
  updateProduct: (index: number, field: 'name' | 'price', value: string) => void;
}

export default function LoyaltyForm({
  step,
  setStep,
  businessName,
  setBusinessName,
  businessDescription,
  setBusinessDescription,
  rewardThreshold,
  setRewardThreshold,
  rewardAmount,
  setRewardAmount,
  productPrice,
  setProductPrice,
  paymentAddress,
  setPaymentAddress,
  handleSubmit,
  products,
  addProduct,
  updateProduct,
}: LoyaltyFormProps) {
  const fillExampleData = () => {
    setBusinessName('Test Business');
    setBusinessDescription('This is an example business description.');
    setRewardThreshold('10');
    setRewardAmount('5');
    setProductPrice('20');
    setPaymentAddress('0x88B1621d8be60c66C54C125Fb5F3fd9e75c1CE87');
  };

  return (
    <>
      <h3 className='w-full h-14 text-2xl flex items-center justify-center font-semibold text-[#FFAA00] border-b border-[#FFAA00]'>
        {step === 1 ? 'Business Details' : 'Reward Configuration'}
      </h3>

      {step === 1 ? (
        <>
          <div className='w-full px-10 mt-8'>
            <label className='text-[#FFAA00] text-sm'>Business Name</label>
            <input
              type='text'
              placeholder='Type your business name here....'
              className='w-full mt-1 p-2 bg-transparent border border-[#FFAA00] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFAA00] text-white placeholder-gray-500'
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </div>

          <div className='w-full px-10 mt-5'>
            <label className='text-[#FFAA00] text-sm'>Business Description</label>
            <textarea
              placeholder='Describe your business and how your AI assistant should interact with customers....'
              className='w-full mt-1 p-2 bg-transparent border border-[#FFAA00] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFAA00] text-white placeholder-gray-500 h-44'
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
            />
          </div>

          <div className='w-full px-10 py-3 flex justify-between'>
            <a className='text-[#FFAA00] cursor-pointer' onClick={fillExampleData}>
              Fill with Example Data
            </a>
            <button
              className='bg-[#8A2BE2] text-[#F0F0F0] text-lg px-6 py-2 rounded-lg cursor-pointer shadow-lg shadow-[#8A2BE2]/50 transition-all duration-300 hover:bg-[#7a26c9] hover:scale-101 hover:shadow-[#8A2BE2]/70 active:scale-100 active:shadow-md'
              onClick={() => setStep(2)}
            >
              Next <span>&rarr;</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='w-full px-10 mt-8 flex space-x-4'>
            <div className='w-1/2'>
              <label className='text-[#FFAA00] text-sm'>Reward Threshold</label>
              <input
                type='text'
                placeholder='Type your required number of visits....'
                className='w-full mt-1 p-2 bg-transparent border border-[#FFAA00] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFAA00] text-white placeholder-gray-500'
                value={rewardThreshold}
                onChange={(e) => setRewardThreshold(e.target.value)}
              />
            </div>
            <div className='w-1/2'>
              <label className='text-[#FFAA00] text-sm'>Reward Amount</label>
              <input
                type='text'
                placeholder='Type your reward amount....'
                className='w-full mt-1 p-2 bg-transparent border border-[#FFAA00] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFAA00] text-white placeholder-gray-500'
                value={rewardAmount}
                onChange={(e) => setRewardAmount(e.target.value)}
              />
            </div>
          </div>

          <div className='w-full px-10 mt-5'>
            <label className='text-[#FFAA00] text-sm'>Payment Address</label>
            <input
              type='text'
              placeholder='Type your payment address....'
              className='w-full mt-1 p-2 bg-transparent border border-[#FFAA00] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFAA00] text-white placeholder-gray-500'
              value={paymentAddress}
              onChange={(e) => setPaymentAddress(e.target.value)}
            />
          </div>

          <div className='w-full px-10 mt-8'>
            <h4 className='text-[#FFAA00] text-lg mb-4'>Products</h4>
            {products.map((product, index) => (
              <div key={index} className='flex space-x-4 mb-4'>
                <div className='w-1/2'>
                  <label className='text-[#FFAA00] text-sm'>Product Name</label>
                  <input
                    type='text'
                    placeholder='Type product name...'
                    className='w-full mt-1 p-2 bg-transparent border border-[#FFAA00] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFAA00] text-white placeholder-gray-500'
                    value={product.name}
                    onChange={(e) => updateProduct(index, 'name', e.target.value)}
                  />
                </div>
                <div className='w-1/2'>
                  <label className='text-[#FFAA00] text-sm'>Product Price</label>
                  <input
                    type='text'
                    placeholder='Type product price...'
                    className='w-full mt-1 p-2 bg-transparent border border-[#FFAA00] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#FFAA00] text-white placeholder-gray-500'
                    value={product.price}
                    onChange={(e) => updateProduct(index, 'price', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button className='text-[#FFAA00] mt-2 cursor-pointer' onClick={addProduct}>
              + Add More
            </button>
          </div>

          <div className='w-full px-10 py-8 flex justify-between'>
            <button
              className='bg-[#8A2BE2] text-[#F0F0F0] text-lg px-6 py-2 rounded-lg cursor-pointer shadow-lg shadow-[#8A2BE2]/50 transition-all duration-300 hover:bg-[#7a26c9] hover:scale-101 hover:shadow-[#8A2BE2]/70 active:scale-100 active:shadow-md'
              onClick={() => setStep(1)}
            >
              <span>&larr;</span> Previous
            </button>
            <button
              className='bg-[#8A2BE2] text-[#F0F0F0] text-lg px-6 py-2 rounded-lg cursor-pointer shadow-lg shadow-[#8A2BE2]/50 transition-all duration-300 hover:bg-[#7a26c9] hover:scale-101 hover:shadow-[#8A2BE2]/70 active:scale-100 active:shadow-md'
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </>
  );
}

LoyaltyForm.propTypes = {
  step: PropTypes.number.isRequired,
  setStep: PropTypes.func.isRequired,
  businessName: PropTypes.string.isRequired,
  setBusinessName: PropTypes.func.isRequired,
  businessDescription: PropTypes.string.isRequired,
  setBusinessDescription: PropTypes.func.isRequired,
  rewardThreshold: PropTypes.string.isRequired,
  setRewardThreshold: PropTypes.func.isRequired,
  rewardAmount: PropTypes.string.isRequired,
  setRewardAmount: PropTypes.func.isRequired,
  productPrice: PropTypes.string.isRequired,
  setProductPrice: PropTypes.func.isRequired,
  paymentAddress: PropTypes.string.isRequired,
  setPaymentAddress: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  addProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};
