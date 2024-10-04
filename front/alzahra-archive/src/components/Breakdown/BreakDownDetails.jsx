import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button, Container, Box, Grid, Dialog, DialogContent } from '@mui/material';
import axios from 'axios';

const BreakDownDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State to handle modal open/close

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
        console.error('Error fetching breakdown details:', error);
        setError('Failed to load breakdown details.');
      }
    };

    fetchData();
  }, [id]);

  // Function to handle modal open and close
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!item) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 10 }}>
    <Container>
      {error && <Typography color="error">{error}</Typography>}

      <Grid container spacing={3}>
        {/* Details Section */}
        <Grid item xs={12} md={12}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom>
                {item.name}
              </Typography>
              
            </CardContent>

            <Box sx={{ padding: 2 }}>
              {item.file ? (
                <video width="100%" height="400" controls>
                  <source src={item.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Typography variant="body1" align="center">
                  No Video Available
                </Typography>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
};

export default BreakDownDetails;
