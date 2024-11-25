import axios from 'axios';

const API_ORDER_URL = 'https://localhost:7110/api/Order';

export default {
    async placeOrder(orderData) {
        try {
            const response = await axios.post(API_ORDER_URL, orderData);
            return response.data;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    },

    async getOrderById(orderId) {
        const response = await axios.get(`${API_ORDER_URL}/${orderId}`);
        return response.data;
    },

    async getOrdersBySession(sessionId) {
        const response = await axios.get(`${API_ORDER_URL}/session/${sessionId}`);
        return response.data;
    },

    async getPendingOrdersByLocation(locationId) {
        const response = await axios.get(`${API_ORDER_URL}/pending/${locationId}`);
        return response.data;
    },
    async checkout(sessionId,orderData) {
        const response = await axios.post(`${API_ORDER_URL}/place-order/${sessionId}`, orderData);
        return response.data;
    }
};