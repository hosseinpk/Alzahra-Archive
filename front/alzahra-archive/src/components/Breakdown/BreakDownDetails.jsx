import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button, Container,Box } from '@mui/material';
import axios from 'axios';

const BreakDownDetails = () => {
  const { id } = useParams(); 
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };

        const response = await axios.get(`http://127.0.0.1:8000/breakdown/api/v1/breakdown/${id}/`, config);
        setItem(response.data);
        
      } catch (error) {
        console.error('Error fetching archive details:', error);
        setError('Failed to load archive details.');
      }
    };

    fetchData();
  }, [id]);

  if (!item) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{padding:3}}>
      <Container>
      {error && <Typography color="error">{error}</Typography>}
      
      <Card>
        
        <CardMedia
          component="img"
          height="300"
          image={item.image} 
          alt={item.name}
        />
        <CardContent>
          <Typography variant="h4" component="div">
            {item.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        
        <Button
          variant="contained"
          color="primary"
          href={item.file} 
          download
        >
          Download File
        </Button>
      </Card>
    </Container>
    </Box>
  );
};

export default BreakDownDetails;
