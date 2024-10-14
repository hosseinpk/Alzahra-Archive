// api.js
import axios from 'axios';

export  const API_BASE_URL = '192.168.160.60:8000'; 

const getConfig = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  };
};

// Fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/archive/api/v1/category/`, getConfig());
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Fetch projects
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`, getConfig());
    return response.data; 
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; 
  }
};

// Fetch asset types
export const fetchAssetTypes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/asset-types`, getConfig());
    return response.data; 
  } catch (error) {
    console.error('Error fetching asset types:', error);
    throw error; 
  }
};

// Fetch filtered data based on selected filters
export const fetchFilteredData = async (filters) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/filter`, filters, getConfig());
    return response.data; 
  } catch (error) {
    console.error('Error fetching filtered data:', error);
    throw error; 
  }
};

export default {
  fetchCategories,
  fetchProjects,
  fetchAssetTypes,
  fetchFilteredData,
};
