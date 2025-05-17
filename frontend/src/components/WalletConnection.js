// import React, { useState } from 'react';

// const WalletConnection = () => {
//     const [walletAddress, setWalletAddress] = useState(null);

//     const connectWallet = async () => {
//         try {
//             // Replace with Hedera Wallet SDK or HashConnect logic
//             const address = await window.hedera.connect();
//             setWalletAddress(address);
//         } catch (error) {
//             console.error("Wallet connection failed:", error);
//         }
//     };

//     const authenticateWallet = async () => {
//         const signature = await signMessage(walletAddress, "Authenticate");
//         const response = await fetch("/auth/wallet/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ wallet_address: walletAddress, signature }),
//         });
//         const data = await response.json();
//         console.log("Authenticated User:", data);
//     };

//     return (
//         <div>
//             {!walletAddress ? (
//                 <button onClick={connectWallet}>Connect Wallet</button>
//             ) : (
//                 <>
//                     <p>Connected: {walletAddress}</p>
//                     <button onClick={authenticateWallet}>Authenticate</button>
//                 </>
//             )}
//         </div>
//     );
// };

// const signMessage = async (walletAddress, message) => {
//     // Example signing logic; replace with Hedera SDK
//     return "signature_placeholder";
// };

// export default WalletConnection;
