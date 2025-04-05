import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './app.tsx';

import './locales/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
