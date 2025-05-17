const InvestmentStats = ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map(({ label, value }) => (
        <p key={label} className="text-gray-400">
          <strong>{label}:</strong> {value}
        </p>
      ))}
    </div>
  );
  
  export default InvestmentStats;