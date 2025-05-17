import React, { useState, useEffect } from "react";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Mock transaction data
  useEffect(() => {
    const mockTransactions = [
      {
        id: "1",
        fstTokenId: "FST123",
        fromWallet: "0x1234abcd",
        toWallet: "0x5678efgh",
        timestamp: "2024-12-15 10:30:00",
        txHash: "0xabcdef1234567890",
      },
      {
        id: "2",
        fstTokenId: "FST123",
        fromWallet: "0x5678efgh",
        toWallet: "0x91011ijkl",
        timestamp: "2024-12-16 14:45:00",
        txHash: "0x1234567890abcdef",
      },
      {
        id: "3",
        fstTokenId: "FST124",
        fromWallet: "0x91011ijkl",
        toWallet: "0x121314mnop",
        timestamp: "2024-12-17 12:00:00",
        txHash: "0xabcdef9876543210",
      },
    ];
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = transactions.filter(
      (transaction) =>
        transaction.fstTokenId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.fromWallet.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.toWallet.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTransactions(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  }, [searchQuery, transactions]);

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "next" && prev < totalPages) return prev + 1;
      if (direction === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["FST Token ID", "From Wallet", "To Wallet", "Timestamp", "Transaction Hash"];
    const rows = transactions.map((txn) => [
      txn.fstTokenId,
      txn.fromWallet,
      txn.toWallet,
      txn.timestamp,
      txn.txHash,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transaction_history.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">
        Transaction History
      </h2>

      {/* Search and Export Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by FST Token ID, From Wallet, or To Wallet"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded-md bg-gray-800 text-white border border-gray-700 mb-4 md:mb-0"
        />
        <button
          onClick={exportToCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Export to CSV
        </button>
      </div>

      {/* Transaction Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="py-2">FST Token ID</th>
            <th className="py-2">From Wallet</th>
            <th className="py-2">To Wallet</th>
            <th className="py-2">Timestamp</th>
            <th className="py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-700">
              <td className="py-2">{transaction.fstTokenId}</td>
              <td className="py-2">{transaction.fromWallet}</td>
              <td className="py-2">{transaction.toWallet}</td>
              <td className="py-2">{transaction.timestamp}</td>
              <td className="py-2 text-blue-400">
                <button
                  onClick={() =>
                    setExpanded(expanded === transaction.id ? null : transaction.id)
                  }
                  className="hover:underline"
                >
                  {expanded === transaction.id ? "Hide" : "View"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Expanded Transaction Details */}
      {expanded && (
        <div className="bg-gray-800 p-4 rounded-lg mt-4">
          <h3 className="text-lg font-bold text-blue-400 mb-2">Transaction Details</h3>
          {filteredTransactions
            .filter((transaction) => transaction.id === expanded)
            .map((transaction) => (
              <div key={transaction.id}>
                <p>
                  <strong>Transaction Hash:</strong> {transaction.txHash}
                </p>
                <p>
                  <strong>From Wallet:</strong> {transaction.fromWallet}
                </p>
                <p>
                  <strong>To Wallet:</strong> {transaction.toWallet}
                </p>
                <p>
                  <strong>Timestamp:</strong> {transaction.timestamp}
                </p>
              </div>
            ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1 ? "bg-gray-700 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages ? "bg-gray-700 text-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
