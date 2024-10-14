import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActionArea,
  CardMedia,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import FilterComponent from './FilterArComponent';
import AddFile from './AddFile';
import { UserContext } from "../layout/context";
import { API_BASE_URL } from '../../config';


const Archive = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({ category: '', project: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const context = React.useContext(UserContext);

  // Fetch data from API based on filters or search query
  const fetchData = async () => {
    try {
      
      const config = {
        headers: {
          Authorization: `Bearer ${context.accessToken}`,
        },
        params: {
          category: filters.category || undefined,
          project: filters.project || undefined,
          search: searchQuery || undefined,
        },
      };

      const response = await axios.get(`http://${API_BASE_URL}/archive/api/v1/archive/`, config);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching the archive data:', error);
      setError('Failed to fetch data.');
    }
  };

  // Fetch data on component load and whenever filters or search query change
  useEffect(() => {
    fetchData();
  }, [filters, searchQuery]);

  // Handle navigation on card click
  const handleCardClick = (id) => {
    navigate(`/archive/${id}`);
  };

  // Open/Close AddFile modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Callback for when a new file is added
  const handleFileAdded = () => {
    setOpen(false);
    fetchData(); // Re-fetch data to update cards after adding a new file
    setSnackbarMessage('File added successfully!'); // Show success notification
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Filter Component */}
              <FilterComponent onFilterChange={handleFilterChange} />

              <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  padding: 1,
                  borderRadius: '4px',
                  paddingBottom: '25px',
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                    },
                    '&:hover fieldset': {
                      borderColor: 'blue',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'blue',
                    },
                  },
                }}
              />
            </Box>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add File
            </Button>
          </Box>

          {/* Cards */}
          <Grid container spacing={4}>
            {data.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(item.id)}>
                    <CardMedia component="img" height="200" image={item.image} alt={item.name} />
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

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Modal for AddFile */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add File</DialogTitle>
        <DialogContent>
          {/* Pass handleFileAdded to AddFile component */}
          <AddFile onSave={handleFileAdded} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Archive;
