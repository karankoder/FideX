import { Home } from '@/components/Home.tsx';
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
        </Routes>
      </BrowserRouter>
    </EthereumContextProvider>
  );
}
