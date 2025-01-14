<template>
  <header class="app-header">
    <div class="header-content">
      <p class="table">{{ tableText }}</p>

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
import headerImage from "@/assets/images/Header-Image.png";

export default {
  name: "HeaderComponent",
  props: {
    cartItems: {
      type: Array,
      default: () => [],
    },
    currentLanguage: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      headerImage,
      translations: {
        en: {
          tableText: "Table 14",
        },
        nl: {
          tableText: "Tafel 14",
        },
      },
    };
  },
  computed: {
    cartItemCount() {
      return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    },
    tableText() {
      return this.translations[this.currentLanguage].tableText;
    },
  },
  methods: {
    goToOrderPage() {
      this.$router.push({ name: "Order" });
    },
  },
};
</script>

<style scoped>
/* Keep the styles for HeaderComponent */
.app-header {
  background-color: #E74C3C;
  position: sticky;
  top: 0;
  text-align: center;
  color: white;
  height: 6em;
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
  margin-top: 2em;
}



.header-image {
  width: 100%;
  height: auto;
  position: relative;
  margin-top: -4em; /* Vermindert ruimte veroorzaakt door de sticky header */
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
</style>
