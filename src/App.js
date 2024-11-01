import React, { useEffect, useState } from 'react';
import CustomNavbar from './components/Navbar'; // Importing the custom navbar component
import DataTable from './components/DataTable'; // Importing the data table component

const App = () => {
  const [data, setData] = useState([]); // State to hold the fetched data

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`);


        // Log the response for debugging
        console.log('Response:', response);

        // Check if the response is okay (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON
        const result = await response.json();
        console.log('Fetched data:', result);

        // Set the fetched data into the state
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('There was an error fetching the data. Please try again later.');
      }
    };


    fetchData(); // Call the fetch function
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div>
      <CustomNavbar /> {/* Render the custom navbar */}
      <div className="container mt-4">
        <h1>Top 10 Holdings</h1>
        <DataTable data={data} /> {/* Pass fetched data to the DataTable component */}
      </div>
    </div>
  );
};

export default App; // Export the App component for use in other parts of the application
