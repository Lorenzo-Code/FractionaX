import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import MapComponent from "../components/MapComponent";
import MonthlyEarningsCalculator from "../components/MonthlyEarningsCalculator";
import ProgressBar from "../components/ProgressBar";
import InvestmentStats from "../components/InvestmentStats";


// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const InvestmentDetails = () => {
  const { id } = useParams();
  const [availableTokens, setAvailableTokens] = useState(500);
  const [selectedPercentage, setSelectedPercentage] = useState(1);
  const totalTokens = 500;
  const propertyLocation = {
    latitude: 40.7128, // Example coordinates for NYC
    longitude: -74.0060,
  };




  const investments = [
    {
      id: 1,
      name: "Luxury Apartment in NYC",
      image: "real-estate-1.jpg",
      location: "New York, USA",
      description: "A stunning luxury apartment located in the heart of NYC. Features modern amenities and unparalleled city views.",
      details: "This property offers 3 bedrooms, 2 bathrooms, and a private rooftop terrace. The building includes a gym, pool, and concierge services.",
      projectedRevenue: "$50,000/year",
      costToValue: "85%",
      appreciationRate: "5% per year",
      maintenanceCost: "$5,000/year",
      propertyTax: "$10,000/year",
      neighborRating: "4.5/5",
      lotSize: "2,000 sqft",
      layout: "Open Floor Plan",
      numberOfUnits: 1,
      bedroomsPerUnit: 3,
      bathroomsPerUnit: 2,
      conditionRating: "Excellent",
      propertyAge: "10 years",
      schoolZoneRating: "A+",
      schoolZoneName: "Greenwood High School District",
      HOAStatus: "Active",
      crimeRate: "Low",
      permitsComplianceStatus: "Fully Compliant",
      communityAmenities: "Gym, Pool, Rooftop Terrace",
      scalabilityStrategy: "Opportunity to add 2 additional units",
      professionalInspectionStatus: "Passed",
      inspectionCompany: "Urban Inspections LLC",
      fractionaXRating: "4.8/5",
      operatingCosts: {
        insurance: "$2,000/year",
        utilities: "$1,500/year",
        employees: "$6,000/year",
        other: "$500/year",
      },
    },
    {
      id: 2,
      name: "Beachfront Villa",
      image: "real-estate-2.jpg",
      location: "Malibu, USA",
      description: "A gorgeous beachfront villa with direct access to the ocean.",
      operatingCosts: {}, // Missing properties for testing
    },
    {
      id: 3,
  name: "Cozy Townhouse in Humble, TX",
  location: "517 5th St #4, Humble, TX 77338",
  description:
    "A charming townhouse in the heart of Humble, TX, offering modern amenities and convenient access to local attractions.",
  image: "https://via.placeholder.com/800x600?text=Cozy+Townhouse", // Replace with a real URL for production
  projectedRevenue: "$40,000/year",
  costToValue: "80%",
  appreciationRate: "4% per year",
  maintenanceCost: "$3,000/year",
  propertyTax: "$7,000/year",
  neighborRating: "4.2/5",
  lotSize: "1,500 sqft",
  layout: "Two-Story Layout",
  numberOfUnits: 1,
  bedroomsPerUnit: 2,
  bathroomsPerUnit: 2,
  conditionRating: "Good",
  propertyAge: "8 years",
  schoolZoneRating: "B+",
  schoolZoneName: "Humble Independent School District",
  HOAStatus: "Active",
  crimeRate: "Moderate",
  permitsComplianceStatus: "Fully Compliant",
  communityAmenities: "Community Pool, Nearby Park",
  scalabilityStrategy: "Potential for backyard upgrades",
  professionalInspectionStatus: "Passed",
  inspectionCompany: "Texas Home Inspections",
  fractionaXRating: "4.5/5",
  operatingCosts: {
    insurance: "$1,500/year",
    utilities: "$1,200/year",
    employees: "$0/year",
    other: "$300/year",
      },
    }
  ];
  
  
  const investment = investments.find((inv) => inv.id === parseInt(id));
  const [selectedYear, setSelectedYear] = useState(0); // Default to Year 1
  
  const financialData = [
    { year: "Year 1", projectedRevenue: "$1,000,000", appreciationValue: "$1,000,000" },
    { year: "Year 2", projectedRevenue: "$1,050,000", appreciationValue: "$1,050,000" },
    { year: "Year 3", projectedRevenue: "$1,100,000", appreciationValue: "$1,100,000" },
    { year: "Year 4", projectedRevenue: "$1,150,000", appreciationValue: "$1,150,000" },
    { year: "Year 5", projectedRevenue: "$1,200,000", appreciationValue: "$1,200,000" },
  ];
  
  const financialStats = [
    { label: "Projected Revenue", value: financialData[selectedYear].projectedRevenue },
    { label: "Appreciation Value", value: financialData[selectedYear].appreciationValue },
    { label: "Cost-to-Value Ratio", value: investment.costToValue },
    { label: "Appreciation Rate", value: investment.appreciationRate },
    { label: "Maintenance Cost", value: investment.maintenanceCost },
    { label: "Property Tax", value: investment.propertyTax },
  ];

  const propertyDetails = [
    { label: "Neighbor Rating", value: investment.neighborRating },
    { label: "Lot Size", value: investment.lotSize },
    { label: "Layout", value: investment.layout },
    { label: "Number of Units", value: investment.numberOfUnits },
    { label: "Bedrooms Per Unit", value: investment.bedroomsPerUnit },
    { label: "Bathrooms Per Unit", value: investment.bathroomsPerUnit },
    { label: "Condition Rating", value: investment.conditionRating },
    { label: "Property Age", value: investment.propertyAge },
  ];

  const additionalDetails = [
    { label: "School Zone Rating", value: investment.schoolZoneRating },
    { label: "School Zone Name", value: investment.schoolZoneName },
    { label: "HOA Status", value: investment.HOAStatus },
    { label: "Crime Rate", value: investment.crimeRate },
    { label: "Permits Compliance Status", value: investment.permitsComplianceStatus },
    { label: "Community Amenities", value: investment.communityAmenities },
    { label: "Scalability Strategy", value: investment.scalabilityStrategy },
    { label: "Professional Inspection Status", value: investment.professionalInspectionStatus },
    { label: "Inspection Company", value: investment.inspectionCompany },
    { label: "FractionaX Rating", value: investment.fractionaXRating },
  ];

  const operatingCosts = [
    { label: "Operating Costs - Insurance", value: investment.operatingCosts.insurance },
    { label: "Operating Costs - Utilities", value: investment.operatingCosts.utilities },
    { label: "Operating Costs - Employees", value: investment.operatingCosts.employees },
    { label: "Operating Costs - Other", value: investment.operatingCosts.other },
  ];
  const chartData = {
    labels: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    datasets: [
      {
        label: "Appreciation Value ($)",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [1000000, 1050000, 1100000, 1150000, 1200000], // Matches financialData
      },
    ],
  }

  

  if (!investment) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-center mb-4">
          Sorry, the investment you are looking for could not be found.
        </p>
        <Link to="/investments" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Browse Other Investments
        </Link>
      </div>
    );
  }


  const calculateTotalOperatingCosts = () => {
    const { insurance = "$0/year", utilities = "$0/year", employees = "$0/year", other = "$0/year" } =
      investment.operatingCosts || {};

    const totalCosts = [
      parseFloat(insurance.replace(/[^\d.]/g, "")),
      parseFloat(utilities.replace(/[^\d.]/g, "")),
      parseFloat(employees.replace(/[^\d.]/g, "")),
      parseFloat(other.replace(/[^\d.]/g, "")),
    ].reduce((a, b) => a + b, 0);

    return `$${totalCosts.toLocaleString()}/year`;

  };
  const InteractiveBarChart = ({ data, labels }) => {
    const [selectedBar, setSelectedBar] = useState(null); // Track the selected bar
    const [hoveredBar, setHoveredBar] = useState(null); // Track the hovered bar

    const chartData = {
      labels,
      datasets: [
        {
          label: "Revenue (USD)",
          data,
          backgroundColor: labels.map((_, index) =>
            index === hoveredBar ? "rgba(54, 162, 235, 0.8)" : "rgba(54, 162, 235, 0.6)"
          ),
          borderColor: labels.map((_, index) =>
            index === hoveredBar ? "rgba(54, 162, 235, 1)" : "rgba(54, 162, 235, 0.6)"
          ),
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `Revenue: $${context.raw.toLocaleString()}`,
          },
        },
      },
      onClick: (event, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          setSelectedBar(labels[index]);
          alert(`You clicked on: ${labels[index]} with Revenue: $${data[index].toLocaleString()}`);
        }
      },
      onHover: (event, elements) => {
        const index = elements.length > 0 ? elements[0].index : null;
        setHoveredBar(index);
      },
    };

    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-white text-lg font-bold mb-4">Interactive Revenue Chart</h3>
        <Bar data={chartData} options={chartOptions} />
        {selectedBar && (
          <div className="text-white mt-4">
            <strong>Selected Bar:</strong> {selectedBar}
          </div>
        )}
      </div>

    );
  };

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <section className="py-12 px-4 sm:px-6 md:px-12 lg:px-24"> {/* Reduced py-16 to py-12 */}
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
          {/* Image Section */}
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/${investment.image}`}
            alt={investment.name}
            className="w-full h-auto sm:h-80 object-cover rounded-lg mb-4"
          />
  
          {/* Header Section */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-400 text-center">
            {investment.name}
          </h1>
          <p className="text-gray-400 text-center mb-4">
            <strong>Location:</strong> {investment.location}
          </p>
          <p className="text-gray-300 text-center mb-4">{investment.description}</p>
  
          {/* Token Progress Bar */}
          <div className="mt-4"> {/* Reduced mt-6 to mt-4 */}
            <p className="text-gray-400 mb-2 text-center">
              <strong>Available FST Tokens:</strong> {availableTokens}/{totalTokens}
            </p>
            <ProgressBar current={availableTokens} total={totalTokens} />
          </div>
  
          {/* Monthly Earnings Calculator */}
          <div className="mt-6"> {/* Reduced mt-8 to mt-6 */}
            <MonthlyEarningsCalculator
              totalTokens={totalTokens}
              projectedRevenue={investment.projectedRevenue}
              selectedPercentage={selectedPercentage}
              onChange={setSelectedPercentage}
            />
          </div>
  
          {/* Year Selection Buttons */}
          <section className="bg-gray-800 py-4 rounded-lg mt-6"> {/* Reduced py-6 to py-4, mt-8 to mt-6 */}
            <div className="flex flex-wrap justify-center gap-4">
              {financialData.map((data, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg font-bold ${
                    selectedYear === index
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setSelectedYear(index)}
                >
                  {data.year}
                </button>
              ))}
            </div>
          </section>
  
          {/* Financial Details */}
          <section className="bg-gray-800 py-4 rounded-lg mt-6"> {/* Adjusted py and mt */}
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 text-center mb-4">
              Financial Details
            </h3>
            <InvestmentStats stats={financialStats} />
          </section>
  
          {/* Property Details */}
          <section className="bg-gray-800 py-4 rounded-lg mt-6"> {/* Adjusted py and mt */}
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 text-center mb-4">
              Property Details
            </h3>
            <InvestmentStats stats={propertyDetails} />
          </section>
  
          {/* Additional Details */}
          <section className="bg-gray-800 py-4 rounded-lg mt-6"> {/* Adjusted py and mt */}
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 text-center mb-4">
              Additional Information
            </h3>
            <InvestmentStats stats={additionalDetails} />
          </section>
  
          {/* Operating Costs */}
          <section className="bg-gray-800 py-4 rounded-lg mt-6"> {/* Adjusted py and mt */}
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 text-center mb-4">
              Operating Costs
            </h3>
            <InvestmentStats stats={operatingCosts} />
          </section>
  
          {/* Map Section */}
          <div className="mt-8"> {/* Reduced mt-10 to mt-8 */}
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 text-center mb-4">
              Property Location
            </h2>
            <div className="rounded-lg overflow-hidden">
              <MapComponent
                latitude={propertyLocation.latitude}
                longitude={propertyLocation.longitude}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
  
  
};

export default InvestmentDetails;
