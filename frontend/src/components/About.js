import React from "react";

const About = () => {
  return (
    <div className="relative bg-white py-16 px-6 md:px-12 lg:px-24 mt-[-1px] z-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          About FractionaX
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mt-4">
          Revolutionizing access to premium investments through fractional ownership, built on Hedera Hashgraph.
        </p>
      </div>

      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21V3m6 18V3"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700">
              To democratize wealth creation by providing easy access to high-value investment opportunities through fractional ownership, empowering individuals and institutions to grow financially.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <div className="bg-purple-100 p-6 rounded-lg shadow-md transform hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.75L17.25 9H14v6H10V9H6.75L12 4.75z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-purple-600 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To lead the shift toward an inclusive and transparent financial ecosystem, making premium investments accessible to everyone through innovation and blockchain technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
