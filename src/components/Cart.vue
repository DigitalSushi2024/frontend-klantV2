<template>
  <div class="cart">
    <h2>Shopping Cart</h2>
    <div v-if="cartItems.length === 0">Your cart is empty.</div>
    <div v-else>
      <div v-for="item in cartItems" :key="item.productId" class="cart-item">
        <span>{{ item.productName }}</span>
        <span>Quantity: {{ item.quantity }}</span>
        <span>Price: €{{ (item.price * item.quantity).toFixed(2) }}</span>
        <button @click="$emit('remove-from-cart', item.productName)">Remove</button>
      </div>
      <p>Total: €{{ total.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    total() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
  }
};
</script>

<style scoped>
.cart {
  background: rgba(135, 35, 32, 0.99);
  padding: 20px;
  border-radius: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
