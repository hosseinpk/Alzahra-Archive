import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, CardActionArea, CardMedia, Box } from '@mui/material';
import axios from 'axios';
import FilterComponent from './FilterComponent';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        };

        const response = await axios.get('http://127.0.0.1:8000/archive/api/v1/archive/', config);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the archive data:', error);
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/archive/${id}`);
  };

  return (
  <>
  <FilterComponent/>
  <Box sx={{ padding: 4 }}> {/* Adjust padding here */}
  <Container maxWidth={false} sx={{ padding: 0 }}> {/* Remove padding */}
    {error && <Typography color="error">{error}</Typography>}
    <Grid container spacing={4}>
      {data.map((item) => (
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
                  {item.name}
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
  </>
  

  );
};

export default HomePage;
