
<template>
  <header class="app-header">
    <div class="header-content">
      <p class="table">Tabel 14</p>

      <!-- Cart Icon with Dynamic Count -->
      <div class="eclipse">
      <div class="cart" @click="toggleCart">
        <img :src="shoppingCart" alt="cart-icon" class="cart-icon">🛒</img>
        <span class="cart-count">{{ cartItemCount }}</span>
      </div>
      </div>
    </div>
  </header>

  <img :src="headerImage" alt="wok-all-day" class="header-image" />
  <p class="restaurantName">WOK-ALL-DAY</p>

  <!-- Cart Modal -->
  <div v-if="isCartVisible" class="cart-modal">
    <h3>Your Cart</h3>
    <div v-if="cartItems.length === 0" class="empty-cart">Your cart is empty.</div>
    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.productId" class="cart-item">
        <span>{{ item.productName }} - Quantity: {{ item.quantity }}</span>
        <span>Price: €{{ (item.price * item.quantity).toFixed(2) }}</span>
        <button class="remove-btn" @click="$emit('remove-from-cart', item.productName)">Remove</button>
      </div>
      <p class="cart-total">Total: €{{ totalPrice.toFixed(2) }}</p>
      <button class="order-btn" @click="goToOrderPage">Go to Order Page</button>
    </div>
    <button class="close-btn" @click="toggleCart">Close Cart</button>
  </div>
</template>

<script>
import headerImage from '@/assets/images/Header-Image.png';
import shoppingCart from '@/assets/images/shopping-cart.png';

export default {
  name: 'HeaderComponent',
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ['remove-from-cart', 'navigate-to-order'],
  data() {
    return {
      headerImage,
      isCartVisible: false
    }
  },
  computed: {
    cartItemCount() {
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
    goToOrderPage() {
      this.$emit('navigate-to-order');
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');

.app-header {
  background-color: #E74C3C;
  position: relative;
  text-align: center;
  color: white;
  height: 5.5em;
  width: 100%;
  border-radius: 0px 0px 35px 35px;
  box-shadow: 0px 1px 1px rgba(3, 7, 18, 0.02),
  0px 5px 4px rgba(3, 7, 18, 0.03),
  0px 12px 9px rgba(3, 7, 18, 0.05),
  0px 20px 15px rgba(3, 7, 18, 0.06),
  0px 32px 24px rgba(3, 7, 18, 0.08);
  z-index: 2;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1em;
}

.cart {
  position: relative;
  cursor: pointer;
}

.cart-icon {
  font-size: 24px;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: black;
  border-radius: 50%;
  padding: 5px;
  color: white;
  font-size: 12px;
}

.table {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: black;
  text-align: center;
  margin-top: 1.5em;
}

.header-image {
  width: 100%;
  height: auto;
  position: relative;
}

.restaurantName {
  color: #CBA43F;
  font-family: "Cinzel Decorative", serif;
  font-size: 43px;
  font-weight: 700;
  z-index: 3;
  position: relative;
  text-align: center;
  margin-top: -2.5em;
}

.eclipse{
  background: #E74C3C;
  width: 4.5em;
  height: 4.5em;
  border-radius: 50px;
  margin-top: 5em;
  position: absolute;
  margin-left: 22em;
}

.cart-modal {
  position: fixed;
  top: 70px;
  background-color: #b22222;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  z-index: 100;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.remove-btn {
  background-color: transparent;
  border: none;
  color: #ffc107;
  cursor: pointer;
  font-size: 0.9em;
}

.cart-total {
  font-weight: bold;
  margin-top: 10px;
}

.order-btn {
  background-color: #ffc107;
  color: black;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.close-btn {
  background-color: transparent;
  color: #ffffff;
  border: none;
  margin-top: 10px;
  cursor: pointer;
}
</style>
