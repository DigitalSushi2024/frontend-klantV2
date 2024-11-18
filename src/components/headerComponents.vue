
<template>
  <header class="app-header">
    <div class="header-content">
      <p class="table">Table 14</p>

      <!-- Cart Icon with Dynamic Count -->
      <div class="cart" @click="goToOrderPage">
        <i class="cart-icon">🛒</i>
        <span class="cart-count">{{ cartItemCount }}</span>
      </div>
    </div>
  </header>

  <img :src="headerImage" alt="wok-all-day" class="header-image" />
  <p class="restaurantName">WOK-ALL-DAY</p>
</template>

<script>
import headerImage from '@/assets/images/Header-Image.png';

export default {
  name: 'HeaderComponent',
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    }
  },
  methods: {
    goToOrderPage() {
      this.$router.push({ name: 'Order' }); // Navigeren naar de OrderPage
    }
  },
  data() {
    return {
      headerImage
    };
  }
};
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
