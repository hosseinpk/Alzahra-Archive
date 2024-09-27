import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, CardActionArea, CardMedia } from '@mui/material';
import axios from 'axios';

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
    <Container>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {data.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(item.id)}>
                {/* Image */}
                <CardMedia
                  component="img"
                  height="140"
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
  );
};

export default HomePage;
