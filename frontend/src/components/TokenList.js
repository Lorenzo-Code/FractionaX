import React, { useEffect, useState } from 'react';

const TokenList = ({ walletAddress }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`/api/tokens/${walletAddress}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTokens(data.tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [walletAddress]);

  return (
    <div>
      <h2>Token Holdings</h2>
      <ul>
        {tokens.map((token, index) => (
          <li key={index}>
            {token.type}: {token.amount} (Rewards: {token.staking_rewards})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenList;
