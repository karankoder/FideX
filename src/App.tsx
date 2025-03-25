import Home from '@/pages/Home';
import { Test } from '@/pages/Test';
import Launch from '@/pages/Launch';
import AllBusinesses from '@/pages/AllBusinesses';
import { EthereumContextProvider } from '@/services/ethereum/EthereumContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from '@/components/Navigation';
import Success from '@/pages/Success';
import Checkout from './pages/Checkout';

export function App() {
  return (
    <EthereumContextProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/test' element={<Test />} />
          <Route path='/launch' element={<Launch />} />
          <Route path='/businesses' element={<AllBusinesses />} />
          <Route path='/success' element={<Success />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </EthereumContextProvider>
  );
}
