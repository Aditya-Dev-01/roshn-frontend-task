import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from "@radix-ui/themes";
import App from './App.tsx';
import '@radix-ui/themes/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme 
      appearance="light" 
      accentColor="blue" 
      grayColor="slate" 
      radius="medium"
      scaling="100%"
    >
      <App />
    </Theme>
  </StrictMode>,
);
