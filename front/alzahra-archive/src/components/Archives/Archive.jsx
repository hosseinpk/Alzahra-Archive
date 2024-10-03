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
} from '@mui/material';
import axios from 'axios';
import FilterComponent from '../FilterComponent';
import AddFile from './AddFile';

const Archive = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({ category: '', project: '', assetType: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter data based on selected filters
  const filteredData = data.filter((item) => {
    const matchesCategory = filters.category ? item.categoryId === filters.category : true;
    const matchesProject = filters.project ? item.projectId === filters.project : true;
    const matchesAssetType = filters.assetType ? item.assetTypeId === filters.assetType : true;
    return matchesCategory && matchesProject && matchesAssetType;
  });

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
              backgroundColor: 'gray',
              borderRadius: '8px',
              padding: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FilterComponent onFilterChange={handleFilterChange} />
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Add File
              </Button>
            </Box>
          </Box>

          <Grid container spacing={4}>
            {filteredData.map((item) => (
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

      {/* Modal for AddFile */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Add File</DialogTitle>
        <DialogContent>
          <AddFile onSave={() => { /* Add save logic here */ }} />
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
