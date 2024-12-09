<template>
  <div class="sushi-item">
    <img :src="item.imageUrl" :alt="item.name" class="sushi-img" />
    <p>{{ item.name }}</p>
    <p>€ {{ item.price.toFixed(2) }}</p>
    <button
      class="add-to-cart-btn"
      @click="addToCart(item)"
      aria-label="Add to Cart"
    >
      Add to Cart
    </button>
  </div>
</template>

<script>
import OrderService from '@/Service/OrderService';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async addToCart(item) {
      try {
        const orderData = {
          productId: item.id,
          quantity: 1, // Assuming a quantity of 1 for simplicity
        };
        console.log('Order data being sent:', orderData);
        const response = await OrderService.placeOrder(orderData);
        console.log('Order placed successfully:', response);
        this.$emit('order-placed', response);
      } catch (error) {
        console.error('Error placing order:', error);
      }
    },
  },
};
</script>

<style scoped>
.sushi-item {
  background-color: #302D2F;
  color: white;
  width: 9em;
  text-align: center;
  margin: 10px;
  border-radius: 21px;
  padding: 1em;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}

.sushi-item:hover {
  background-color: #181818;
  transform: scale(1.05);
}

.sushi-img {
  width: 90%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

.add-to-cart-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #218838;
}
</style>