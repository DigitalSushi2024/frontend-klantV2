import axios from 'axios';

const API_BASE_URL = 'https://localhost:7110/api/Product';

export default {
    async getAllProducts() {
        const response = await axios.get(API_BASE_URL);

        // If response.data contains products within a `$values` property
        return response.data.$values || response.data; // Use response.data directly if it’s an array
    },

    async getProductById(productId) {
        const response = await axios.get(`${API_BASE_URL}/${productId}`);
        return response.data;
    },

    async getProductsByLocation(locationId) {
        const response = await axios.get(`${API_BASE_URL}/location/${locationId}`);
        return response.data;
    }
};