import React, { useState, useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import { AirDrop } from './airDrop';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

function App() {

  const netWork = WalletAdapterNetwork.Devnet;
  const endPoint = useMemo(()=>clusterApiUrl(netWork),[netWork]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            fontFamily: 'Arial, sans-serif',
            overflow: 'hidden',
            color: '#fff',
            padding: '2rem',
            position: 'relative'
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'fadeIn 1s ease-in-out',
              }}>
                <div style={{
                  border: '5px solid rgba(255,255,255,0.2)',
                  borderTop: '5px solid #fff',
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '1rem'
                }} />
                <span>Loading Faucet...</span>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
                <h1 style={{
                  fontSize: '3rem',
                  marginBottom: '2rem',
                  textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
                  textAlign: 'center'
                }}>
                  Solana Airdrop
                </h1>
                <AirDrop />
              </div>
            )}
            {/* Keyframes */}
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
            `}</style>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
