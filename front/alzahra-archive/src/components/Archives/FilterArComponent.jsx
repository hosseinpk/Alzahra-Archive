import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const FilterComponent = ({ onFilterChange }) => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch data for projects and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const [projectRes, categoryRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/archive/api/v1/project/', config),
          axios.get('http://127.0.0.1:8000/archive/api/v1/category/', config),
        ]);

        setProjects(projectRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
    onFilterChange({ project: e.target.value, category: selectedCategory });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value, project: selectedProject });
  };

  return (
    <Box sx={{ display: 'flex', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' , paddingTop:'4px' }}>
      <TextField 
        name="project"
        label="Project"
        select
        value={selectedProject}
        onChange={handleProjectChange}
        sx={{ minWidth: '300px' }} // Increase size of the dropdown
      >
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {project.prj_name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="category"
        label="Category"
        select
        value={selectedCategory}
        onChange={handleCategoryChange}
        sx={{ minWidth: '300px' }} // Increase size of the dropdown
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default FilterComponent;
