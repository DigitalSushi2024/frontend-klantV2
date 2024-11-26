import axios from 'axios';

const API_BASE_URL = 'https://localhost:7110/api/Product';

export default {
    async getAllProducts() {
        const response = await axios.get(API_BASE_URL);
        return response.data.$values || response.data;
    },

    async getProductById(productId) {
        const response = await axios.get(`${API_BASE_URL}/${productId}`);
        return response.data;
    },

    async getProductsByLocation(locationId) {
        const response = await axios.get(`${API_BASE_URL}/location/${locationId}`);
        return response.data;
    },

    // Fetch products based on category and subcategory
    async getProductsByCategory(categoryId, subcategoryId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/category/${categoryId}/subcategory/${subcategoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching products for category ${categoryId} and subcategory ${subcategoryId}:`, error);
            throw error;
        }
    },

    // Fetch products based on subcategory ID
    async getProductsBySubCategory(categoryId, subCategoryId) {
        try {
            // Fix: Call the correct backend API route with both categoryId and subCategoryId
            const response = await axios.get(`${API_BASE_URL}/category/${categoryId}/subcategory/${subCategoryId}`);
            return response.data; // Ensure this is an array of products
        } catch (err) {
            console.error("Error fetching products by subcategory:", err);
            throw err; // Rethrow the error to handle it in the component
        }
    }

};
