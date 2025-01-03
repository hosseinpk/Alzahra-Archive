import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, CardActionArea, CardMedia, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { UserContext } from "../layout/context";


const BreakDown = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // Modal open state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const navigate = useNavigate();
  const context = React.useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
    
      
        const bearerToken=`Bearer ${context.accessToken}`

        const config = {
          headers: {
            'Authorization': bearerToken,
          },
        };

        const response = await axios.get(`http://${API_BASE_URL}/breakdown/api/v1/breakdown/`, config);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              backgroundColor: '#f5f5f5', // Gray background
              borderRadius: '8px', // Rounded edges
              padding: 2,
            }}
          >
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
