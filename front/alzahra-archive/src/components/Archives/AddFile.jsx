import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const AddFile = () => {
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

  const [categories, setCategories] = useState([]);
  const [assets, setAssets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
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
        const accessToken = localStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
      const formData = new FormData();
      formData.append('file', file);
      formData.append('image', image);

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      await axios.post('http://127.0.0.1:8000/archive/api/v1/archive/', formData,config);
      console.log('file added')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 10, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField 
        name="name" 
        label="Name" 
        value={data.name} 
        onChange={handleChange} 
        required 
        fullWidth 
      />
      <TextField
        name="description"
        label="Description"
        value={data.description}
        onChange={handleChange}
        required
        multiline
        rows={4}
        fullWidth
      />
     
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        style={{ marginBottom: '16px' }}
        required
      />
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: '16px' }}
        required
      />

      <TextField
        name="project"
        label="Project"
        value={data.project}
        onChange={handleChange}
        select
        required
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
        value={data.asset_type}
        onChange={handleChange}
        select
        required
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
        value={data.category}
        onChange={handleChange}
        select
        required
        fullWidth
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>

      <FormControlLabel
        control={<Checkbox name="rigged" checked={data.rigged} onChange={handleChange} />}
        label="Rigged"
      />
      <FormControlLabel
        control={<Checkbox name="textured" checked={data.textured} onChange={handleChange} />}
        label="Textured"
      />

      <TextField
        name="file_type"
        label="File Type"
        value={data.file_type}
        onChange={handleChange}
        select
        required
        fullWidth
      >
        {fileTypes.map((fileType) => (
          <MenuItem key={fileType.id} value={fileType.id}>
            {fileType.name}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" color="primary">
        save
      </Button>
    </form>
    </Box>
  );
};

export default AddFile;
