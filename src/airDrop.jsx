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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
            padding: '2rem',
            width: '350px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            opacity: loaded ? 1 : 0,
            transition: 'all 0.6s ease-out',
        }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <WalletMultiButton style={{
                    flex: 1,
                    padding: '0.8rem',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    color: '#764ba2',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                }} />
                <WalletDisconnectButton style={{
                    flex: 1,
                    padding: '0.8rem',
                    borderRadius: '12px',
                    backgroundColor: '#ff6b6b',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                }} />
            </div>
            <input
                type="number"
                placeholder="Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '12px',
                    border: 'none',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    textAlign: 'center',
                    boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s ease-in-out'
                }}
                onFocus={(e) => e.target.style.boxShadow = 'inset 0 4px 12px rgba(0,0,0,0.3)'}
                onBlur={(e) => e.target.style.boxShadow = 'inset 0 4px 12px rgba(0,0,0,0.1)'}
            />
            <button
                onClick={drop}
                style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#764ba2',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease-in-out',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                }}
                onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#667eea';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
                }}
                onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = '#764ba2';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                }}
            >
                Send Airdrop
            </button>
        </div>
    );
}
