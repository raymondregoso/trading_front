import React, { useState } from 'react';
import '../App.css';

const DataTable = ({ data }) => {
  const [searchDate, setSearchDate] = useState(''); // State for the date filter

  if (!data.length) {
    return <p>No data available.</p>; // Handle empty data case
  }

  // Sort data by Weightings from higher to lower
  const sortedData = data.sort((a, b) => {
    const weightA = parseFloat(a.Weightings.replace('%', '')); // Convert string to number
    const weightB = parseFloat(b.Weightings.replace('%', ''));
    return weightB - weightA;
  });

  // Filter data by searchDate if provided
  const filteredData = searchDate
    ? sortedData.filter(item => item.Date && item.Date.startsWith(searchDate))
    : sortedData;

  // Limit the displayed records to 10
  const limitedData = filteredData.slice(0, 10);

  return (
    <div>
      <input
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        placeholder="Search by date"
        className="date-search"
      />
      
      <table className="table">
        <thead>
          <tr>
            <th>SECURITY NAME</th>
            <th>CUSIP</th>
            <th>SHARES</th>
            <th>MARKET VALUE</th>
            <th>NET ASSETS</th>
            <th>WEIGHTINGS</th>
          </tr>
        </thead>
        <tbody>
          {limitedData.map((item, index) => (
            <tr key={item._id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td>{item.SecurityName}</td>
              <td>{item.CUSIP}</td>
              <td>{item.Shares.toLocaleString()}</td>
              <td>{item.MarketValue.toLocaleString()}</td>
              <td>{item.NetAssets.toLocaleString()}</td>
              <td>{item.Weightings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
