import React, { useState, useEffect } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import axios from 'axios';

const FilterOutputComponent = ({ onFilterChange }) => {
  const [releasedYears, setReleasedYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
  
        const response = await axios.get('http://127.0.0.1:8000/output/api/v1/output/', config);
        // Extract unique released years from the fetched data without using map
        const yearsSet = new Set();
        response.data.forEach(item => {
          yearsSet.add(item.released_year);
        });
        const years = [...yearsSet];
        setReleasedYears(years);
      } catch (error) {
        console.error('Error fetching output data:', error);
      }
    };
  
    fetchYears();
  }, []);  

  // Handle the year change and call the parent component to filter data
  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onFilterChange(year ? { released_year: year } : {}); // Pass an empty object if no year is selected
  };

  return (
    <Box sx={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap', paddingTop: '4px' }}>
      <TextField
        name="released_year"
        label="Released Year"
        select
        value={selectedYear}
        onChange={handleYearChange}
        sx={{ minWidth: '200px' }} // Adjust size as needed
      >
        {releasedYears.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default FilterOutputComponent;
