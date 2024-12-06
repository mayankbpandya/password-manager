'use client'; // Client-side component

import { useState, useEffect } from 'react';

export default function ViewCreds() {
  const [credentials, setCredentials] = useState([]); // Default as empty array
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const res = await fetch(`/api/credentials?page=${currentPage}`);
        
        // Log the response to inspect the structure
        const data = await res.json();
        console.log("API Response:", data);

        // Validate the response format
        if (data && Array.isArray(data.data)) {
          setCredentials(data.data);
          setTotalPages(data.totalPages); // Ensure totalPages is correctly set
        } else {
          // If the data is not in the expected format, log and handle it gracefully
          console.error("Invalid data format", data);
          setCredentials([]); // Set to empty array
          setTotalPages(1); // Set to default if there is an issue
        }
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };

    fetchCredentials();
  }, [currentPage]);

  // Handle the copy functionality
  const handleCopy = (value) => {
    navigator.clipboard.writeText(value).then(() => {
      alert('Copied to clipboard!');
    });
  };

  // Handle the pagination
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Filter credentials based on search query
  const filteredCredentials = credentials.filter(
    (cred) =>
      cred.siteurl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.password.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800">Saved Credentials</h2>

      {/* Search input */}
      <div className="mt-4 mb-6">
        <input
          type="text"
          placeholder="Search.. "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
          className="w-full p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        {filteredCredentials.length === 0 ? (
          <p>No credentials found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredCredentials.map((cred) => (
              <li key={cred.id} className="bg-white p-4 border rounded shadow hover:bg-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-700">
                      <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() => handleCopy(cred.siteurl)}
                      >
                        URL: {cred.siteurl}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() => handleCopy(cred.username)}
                      >
                        Username: {cred.username}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() => handleCopy(cred.password)}
                      >
                        ******
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      
                        {cred.comment}
                      
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
