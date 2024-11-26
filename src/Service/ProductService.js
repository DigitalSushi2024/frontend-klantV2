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

    async getProductsByCategory(categoryId, subcategoryId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/category/${categoryId}/subcategory/${subcategoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching products for category ${categoryId} and subcategory ${subcategoryId}:`, error);
            throw error;
        }
    },

    async getProductsBySubCategory(subCategoryId) {
        if (!subCategoryId) {
            throw new Error("SubCategory ID is missing or invalid");
        }

        const url = `/api/Product/category/${subCategoryId}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(`Error fetching products for URL: ${url}`, error);
            throw error;
        }
    }



};
