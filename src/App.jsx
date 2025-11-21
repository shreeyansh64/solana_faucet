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
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            overflow: 'hidden',
            color: '#fff',
            padding: '2rem',
            position: 'fixed',
            top: 0,
            left: 0,
            margin: 0
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.3), transparent 50%)',
              pointerEvents: 'none',
              zIndex: 1
            }} />
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, rgba(94, 234, 212, 0.1), rgba(59, 130, 246, 0.1))',
              borderRadius: '50%',
              filter: 'blur(80px)',
              animation: 'float 6s ease-in-out infinite',
              zIndex: 1
            }} />
            <div style={{
              position: 'absolute',
              bottom: '10%',
              right: '5%',
              width: '250px',
              height: '250px',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
              borderRadius: '50%',
              filter: 'blur(80px)',
              animation: 'float 8s ease-in-out infinite reverse',
              zIndex: 1
            }} />
            {loading ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                animation: 'fadeIn 1s ease-in-out',
                zIndex: 2,
                position: 'relative'
              }}>
                <div style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    position: 'absolute',
                    border: '3px solid transparent',
                    borderTopColor: '#14F195',
                    borderRightColor: '#9945FF',
                    borderRadius: '50%',
                    width: '80px',
                    height: '80px',
                    animation: 'spin 1.5s linear infinite'
                  }} />
                  <div style={{
                    position: 'absolute',
                    border: '3px solid transparent',
                    borderTopColor: '#9945FF',
                    borderLeftColor: '#14F195',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    top: '10px',
                    left: '10px',
                    animation: 'spin 2s linear infinite reverse'
                  }} />
                </div>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: '500',
                  background: 'linear-gradient(90deg, #14F195, #9945FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px'
                }}>Loading Faucet...</span>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                zIndex: 2,
                position: 'relative'
              }}>
                <div style={{
                  marginBottom: '3rem',
                  textAlign: 'center'
                }}>
                  <h1 style={{
                    fontSize: '4rem',
                    fontWeight: '800',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(90deg, #14F195 0%, #9945FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: 'none',
                    letterSpacing: '-2px',
                    lineHeight: '1.1'
                  }}>
                    Solana Airdrop
                  </h1>
                  <p style={{
                    fontSize: '1.1rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontWeight: '400',
                    letterSpacing: '0.5px'
                  }}>
                    Request devnet SOL tokens instantly
                  </p>
                </div>
                <AirDrop />
              </div>
            )}
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
              }
            `}</style>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;