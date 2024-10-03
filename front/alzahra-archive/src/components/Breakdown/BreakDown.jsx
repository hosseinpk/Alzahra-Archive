import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, CardActionArea, CardMedia, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import FilterComponent from '../FilterComponent';

const BreakDown = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // Modal open state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
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

        const response = await axios.get('http://127.0.0.1:8000/breakdown/api/v1/breakdown/', config);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the breakdown data:', error);
        setError('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/breakdown/${id}`);
  };

  const handleOpen = () => {
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle saving file
  const handleSaveFile = async (fileData) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      };

      // Make your POST request to save the file here
      await axios.post('http://127.0.0.1:8000/breakdown/api/v1/breakdown/', fileData, config);
      setOpen(false); 
    } catch (error) {
      console.error('Error saving the file:', error);
    }
  };

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Container maxWidth={false} sx={{ padding: 0 }}>
          {error && <Typography color="error">{error}</Typography>}
          
          {/* Menu Bar */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              marginBottom: 2,
              backgroundColor: 'gray', // Gray background
              borderRadius: '8px', // Rounded edges
              padding: 2 
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FilterComponent />
              <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                size="small"
              />
            </Box>
            
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

export default BreakDown;
