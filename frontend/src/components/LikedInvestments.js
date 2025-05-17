import React from "react";

const LikedInvestments = ({ likedInvestments }) => {
  return (
    <div className="liked-investments">
      <h2>Liked Investments</h2>
      <ul>
        {likedInvestments.length > 0 ? (
          likedInvestments.map((investment) => (
            <li key={investment.id}>{investment.name}</li>
          ))
        ) : (
          <p>No liked investments yet.</p>
        )}
      </ul>
    </div>
  );
};

export default LikedInvestments;
