<template>
  <div class="cart-icon" @click="toggleCart">
    <span class="cart-count">{{ itemCount }}</span>
    🛒
    <!-- Cart Modal -->
    <div v-if="isCartVisible" class="cart-modal">
      <h3>Your Cart</h3>
      <div v-if="cartItems.length === 0">Your cart is empty.</div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.productId" class="cart-item">
          <span>{{ item.productName }} - Quantity: {{ item.quantity }}</span>
          <span>Price: €{{ (item.price * item.quantity).toFixed(2) }}</span>
          <button @click="removeFromCart(item.productName)">Remove</button>
        </div>
        <p>Total: €{{ totalPrice.toFixed(2) }}</p>
        <button @click="navigateToOrderPage">Go to Order Page</button>
      </div>
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
  data() {
    return {
      isCartVisible: false
    };
  },
  computed: {
    itemCount() {
      return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },
    removeFromCart(productName) {
      this.$emit("remove-from-cart", productName);
    },
    navigateToOrderPage() {
      this.$router.push("/order"); // Assuming you have a route named 'order'
    }
  }
};
</script>

<style scoped>
.cart-icon {
  position: relative;
  cursor: pointer;
  color: white;
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: -10px;
  right: -10px;
}

.cart-modal {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #b22222;
  color: white;
  padding: 10px;
  border-radius: 8px;
  width: 250px;
  z-index: 100;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
</style>
