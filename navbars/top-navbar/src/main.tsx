import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TopNavbar from './components/TopNarbar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TopNavbar />
    <App />
  </StrictMode>
);
