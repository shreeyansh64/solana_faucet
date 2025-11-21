import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect } from "react";

export function AirDrop() {
    const [amount, setAmount] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection();

    async function drop() {
        try {
            const signature = await connection.requestAirdrop(wallet.publicKey, amount * 1_000_000_000);


            const result = await connection.confirmTransaction(signature);

            if (result.value.err) {
                alert('Airdrop failed! Please try again.');
            } else {
                alert('✅ Sol Airdropped!');
            }
        } catch (error) {

            if (error?.message?.includes('429') || error?.code === 429) {
                alert('⚠️ Too many requests on endPoint! Try again later.');
            } else {
                console.error(error);
                alert('❌ An error occurred! Check console.');
            }
        }
    }


    useEffect(() => setLoaded(true), []);

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(20, 241, 149, 0.05) 0%, rgba(153, 69, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '2.5rem',
            width: '420px',
            maxWidth: '90vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transform: loaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
            opacity: loaded ? 1 : 0,
            transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 30% 20%, rgba(20, 241, 149, 0.08), transparent 60%), radial-gradient(circle at 70% 80%, rgba(153, 69, 255, 0.08), transparent 60%)',
                pointerEvents: 'none'
            }} />
            <div style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                marginBottom: '2rem',
                width: '100%',
                position: 'relative',
                zIndex: 1
            }}>
                <WalletMultiButton style={{
                    flex: 1,
                    padding: '0.9rem 1.2rem',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #14F195 0%, #0ec27d 100%)',
                    color: '#0f0c29',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 8px 20px rgba(20, 241, 149, 0.3)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.3px'
                }} />
                <WalletDisconnectButton style={{
                    flex: 1,
                    padding: '0.9rem 1.2rem',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.3px'
                }} />
            </div>
            <div style={{
                width: '100%',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.8)',
                    letterSpacing: '0.5px'
                }}>
                    Amount (SOL)
                </label>
                <input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{
                        width: '100%',
                        padding: '1rem 1.2rem',
                        borderRadius: '14px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#fff',
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        textAlign: 'center',
                        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(20, 241, 149, 0.5)';
                        e.target.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(20, 241, 149, 0.1)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.boxShadow = 'inset 0 2px 8px rgba(0, 0, 0, 0.2)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                />
            </div>
            <button
                onClick={drop}
                style={{
                    width: '100%',
                    padding: '1.1rem 1.5rem',
                    borderRadius: '14px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #9945FF 0%, #7635d4 100%)',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(153, 69, 255, 0.4)',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    zIndex: 1,
                    overflow: 'hidden'
                }}
                onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(153, 69, 255, 0.5)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #a855ff 0%, #8b44e5 100%)';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(153, 69, 255, 0.4)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #9945FF 0%, #7635d4 100%)';
                }}
            >
                Request Airdrop
            </button>
        </div>
    );
}