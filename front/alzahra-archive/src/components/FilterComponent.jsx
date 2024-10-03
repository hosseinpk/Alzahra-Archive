import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const FilterComponent = ({ onFilterChange }) => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [assets, setAssets] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const [categoryRes, assetRes, projectRes, fileTypeRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/archive/api/v1/category/', config),
          axios.get('http://127.0.0.1:8000/archive/api/v1/asset/', config),
          axios.get('http://127.0.0.1:8000/archive/api/v1/project/', config),
          axios.get('http://127.0.0.1:8000/archive/api/v1/filetype/', config),
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
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <Box sx={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
      <TextField
        name="project"
        label="Project"
        select
        onChange={handleChange}
        fullWidth
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.prj_name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="asset_type"
        label="Asset Type"
        select
        onChange={handleChange}
        fullWidth
      >
        {assets.map((asset) => (
          <MenuItem key={asset.id} value={asset.id}>
            {asset.type}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="category"
        label="Category"
        select
        onChange={handleChange}
        fullWidth
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="file_type"
        label="File Type"
        select
        onChange={handleChange}
        fullWidth
      >
        {fileTypes.map((fileType) => (
          <MenuItem key={fileType.id} value={fileType.id}>
            {fileType.name}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" color="primary">
        Filter
      </Button>
    </Box>
  );
};

export default FilterComponent;
