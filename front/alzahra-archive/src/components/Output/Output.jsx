import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, CardActionArea, CardMedia, Box, TextField } from '@mui/material';
import axios from 'axios';
import FilterOutputComponent from './FilterOutputComponent';
import { API_BASE_URL } from '../../config';
import { UserContext } from "../layout/context";

const Output = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ released_year: '' });
  const navigate = useNavigate();
  const context = React.useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const config = {
          headers: {
            Authorization: `Bearer ${context.accessToken}`,
          },
        };

        // Build the API URL with filters
        const params = new URLSearchParams();
        if (filters.released_year) {
          params.append('released_year', filters.released_year);
        }

        const response = await axios.get(`http://${API_BASE_URL}/output/api/v1/output/?${params.toString()}`, config);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the output data:', error);
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, [filters]);

  const handleCardClick = (id) => {
    navigate(`/output/${id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Container maxWidth={false} sx={{ padding: 0 }}>
        {error && <Typography color="error">{error}</Typography>}
        
        {/* Filter and Search Bar */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{
              marginBottom: 2,
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: 2,
            }}>
          <FilterOutputComponent onFilterChange={setFilters} />
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            size="small"
          />
        </Box>
        
        <Grid container spacing={4}>
          {filteredData.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(item.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.name} - {item.released_year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.snippet}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Output;
