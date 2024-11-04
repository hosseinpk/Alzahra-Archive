import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Box, Snackbar, Alert, Typography } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { UserContext } from "../layout/context";

const AddFile = ({ onSave }) => {
  const [data, setData] = useState({
    name: '',
    description: '',
    status: true,
    project: '',
    asset_type: '',
    category: '',
    rigged: false,
    textured: false,
    file_type: '',
  });
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [categories, setCategories] = useState([]);
  const [assets, setAssets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const context = React.useContext(UserContext);

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const config = {
          headers: {
            Authorization: `Bearer ${context.accessToken}`,
          },
        };
        const [categoryRes, assetRes, projectRes, fileTypeRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/archive/api/v1/category/`, config),
          axios.get(`${API_BASE_URL}/archive/api/v1/asset/`, config),
          axios.get(`${API_BASE_URL}/archive/api/v1/project/`, config),
          axios.get(`${API_BASE_URL}/archive/api/v1/filetype/`, config),
        ]);

        setCategories(categoryRes.data);
        setAssets(assetRes.data);
        setProjects(projectRes.data);
        setFileTypes(fileTypeRes.data);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const config = {
        headers: {
          Authorization: `Bearer ${context.accessToken}`,
        },
      };
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image', image);

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      await axios.post(`${API_BASE_URL}/archive/api/v1/archive/`, formData, config);
      setSnackbarMessage('File added successfully!'); // Success message
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onSave(); // Notify Archive component
      resetForm(); // Clear the form after submission
    } catch (error) {
      console.error('Error adding the file:', error);
      setSnackbarMessage('Failed to add the file.'); // Error message
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const resetForm = () => {
    setData({
      name: '',
      description: '',
      status: true,
      project: '',
      asset_type: '',
      category: '',
      rigged: false,
      textured: false,
      file_type: '',
    });
    setImage(null);
    setFile(null);
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="File Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={data.description}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        select
        label="Project"
        name="project"
        value={data.project}
        onChange={handleChange}
        margin="normal"
        required
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.prj_name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Asset Type"
        name="asset_type"
        value={data.asset_type}
        onChange={handleChange}
        margin="normal"
        required
      >
        {assets.map((asset) => (
          <MenuItem key={asset.id} value={asset.id}>
            {asset.type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="Category"
        name="category"
        value={data.category}
        onChange={handleChange}
        margin="normal"
        required
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        select
        label="File Type"
        name="file_type"
        value={data.file_type}
        onChange={handleChange}
        margin="normal"
        required
      >
        {fileTypes.map((fileType) => (
          <MenuItem key={fileType.id} value={fileType.id}>
            {fileType.name}
          </MenuItem>
        ))}
      </TextField>
      <FormControlLabel
        control={
          <Checkbox
            name="rigged"
            checked={data.rigged}
            onChange={handleChange}
          />
        }
        label="Rigged"
      />
      <FormControlLabel
        control={
          <Checkbox
            name="textured"
            checked={data.textured}
            onChange={handleChange}
          />
        }
        label="Textured"
      />
      <br />

      {/* Labels for file inputs */}
      <Typography variant="h8" sx={{ mt: 2 }}>
        Add Image: 
      </Typography>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      
      <Typography variant="h8" sx={{ mt: 2 }}>
        Add File:   
      </Typography>
      <input type="file" onChange={handleFileChange} required />

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add File
      </Button>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%', minHeight: '80px', fontWeight: 'bold', fontSize: '1.8rem' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddFile;
