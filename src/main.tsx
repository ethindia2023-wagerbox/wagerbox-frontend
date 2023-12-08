import ReactDOM from 'react-dom/client'
import { AirstackProvider } from "@airstack/airstack-react";

import App from './App.tsx'
import './index.css'

import RainbowSetup from './web3/RainbowSetup.tsx';

// const key = import.meta.env.VITE_AIRSTACK_API_PROD_KEY;
const key = import.meta.env.VITE_AIRSTACK_API_TEST_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <AirstackProvider apiKey={key}>
      <RainbowSetup>
        <App />
      </RainbowSetup>
    </AirstackProvider>
  // </React.StrictMode>,
)
