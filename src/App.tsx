import Home from '@/pages/Home';
import { Test } from '@/pages/Test';
import Launch from '@/pages/Launch';
import AllBusinesses from '@/pages/AllBusinesses';
import { EthereumContextProvider } from '@/services/ethereum/EthereumContext.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from '@/components/Navigation';

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
        </Routes>
      </BrowserRouter>
    </EthereumContextProvider>
  );
}
