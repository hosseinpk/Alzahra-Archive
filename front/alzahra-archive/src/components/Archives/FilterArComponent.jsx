import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { UserContext } from "../layout/context";

const FilterComponent = ({ onFilterChange }) => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const context = React.useContext(UserContext);

  // Fetch data for projects and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const config = {
          headers: {
            Authorization: `Bearer ${context.accessToken}`,
          },
        };
        const [projectRes, categoryRes] = await Promise.all([
          axios.get(`http://${API_BASE_URL}/archive/api/v1/project/`, config),
          axios.get(`http://${API_BASE_URL}/archive/api/v1/category/`, config),
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
