const ProgressBar = ({ current, total }) => {
    const percentage = (current / total) * 100;
    return (
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };
  
  export default ProgressBar; // <-- Add this line
  