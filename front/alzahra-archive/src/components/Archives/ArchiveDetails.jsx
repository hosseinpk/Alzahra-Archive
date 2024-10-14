import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, CardMedia, Button, Container, Box, Grid, Dialog, DialogContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import CancelIcon from '@mui/icons-material/Cancel'; // Import Cancel for cross
import axios from 'axios';

const ArchiveDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State to handle modal open/close
  const [isStaff, setIsStaff] = useState(false); // State for checking if user is staff

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const is_staff = localStorage.getItem("is_staff") === 'true'; // Convert string to boolean
        setIsStaff(is_staff); // Set the isStaff state based on the localStorage value

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.get(`http://192.168.160.60:8000/archive/api/v1/archive/${id}/`, config);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching archive details:', error);
        setError('Failed to load archive details.');
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
          {/* Left Column for Image */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={item.image}
                alt={item.name}
                onClick={handleClickOpen} // Open modal when image is clicked
                sx={{ cursor: 'pointer' }} // Indicate image is clickable
              />
            </Card>
          </Grid>

          {/* Right Column for Details */}
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h3" component="div" gutterBottom>
                {item.name} {/* Make the name bigger */}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.2rem' }}>
                {item.description} {/* Increase description font size */}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Added By: {item.added_by.email} {/* Bigger font */}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Project Name: {item.project.prj_name} {/* Bigger font */}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Category: {item.category.name} {/* Bigger font */}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                File Type: {item.file_type.name} {/* Bigger font */}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Asset Type: {item.asset_type.type} {/* Bigger font */}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Rigged: {item.rigged ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />} {/* Show tick or cross */}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Textured: {item.textured ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />} {/* Show tick or cross */}
              </Typography>
              <Box sx={{ mt: 3, textAlign: 'right' }}>
                {isStaff && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={item.file}
                    download
                    sx={{ fontSize: '1rem', padding: '10px 20px' }} // Larger button
                  >
                    Download File
                  </Button>
                )}
              </Box>
            </CardContent>
          </Grid>
        </Grid>

        {/* Modal for displaying the image larger */}
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DialogContent>
            <img src={item.image} alt={item.name} style={{ width: '100%' }} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ArchiveDetails;
