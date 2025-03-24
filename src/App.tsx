import Home from '@/pages/Home';
import { Test } from '@/pages/Test';
// import Home from '@/pages/Home.tsx';
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
        </Routes>
      </BrowserRouter>
    </EthereumContextProvider>
  );
}
