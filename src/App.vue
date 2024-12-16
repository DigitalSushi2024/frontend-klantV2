<template>
  <div class="app-container">
    <!-- Show header based on current route -->
    <header-component
        v-if="!isOrderPage"
        :cart-items="cartItems"
        :current-language="currentLanguage"
        @remove-from-cart="removeFromCart"
        @navigate-to-order="goToOrderPage"
        @switch-language="switchLanguage"
    />
    <order-header v-else :current-language="currentLanguage" />

    <!-- Dynamically rendered content based on route -->
    <router-view
        :cart-items="cartItems"
        :current-language="currentLanguage"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
    />
  </div>
</template>

<script>
import HeaderComponent from "@/components/headerComponents.vue";
import OrderHeader from "@/components/OrderHeader.vue";

export default {
  components: {
    HeaderComponent,
    OrderHeader,
  },
  data() {
    return {
      cartItems: [], // Global cart items
      currentLanguage: "en", // Default language is English
    };
  },
  computed: {
    isOrderPage() {
      return this.$route.name === "Order"; // Check if current route is 'Order'
    },
  },
  methods: {
    addToCart(product) {
      console.log("Product received in App.vue:", product);

      const existingItem = this.cartItems.find(
          (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }

      // Forceer Vue-reactiviteit
      this.cartItems = [...this.cartItems];
      console.log("Updated cartItems in App.vue:", this.cartItems);
    },
    removeFromCart(productName) {
      const index = this.cartItems.findIndex(
          (item) => item.productName === productName
      );

      if (index !== -1) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
        } else {
          this.cartItems.splice(index, 1);
        }
      }
    },
    goToOrderPage() {
      this.$router.push({ name: "Order" }); // Navigate to Order page
    },
    switchLanguage(language) {
      this.currentLanguage = language;
      localStorage.setItem("preferredLanguage", language);
    },
  },
  created() {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
  },
};
</script>

<style scoped>
/* Your existing styles */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
}

.app-container {
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: white;
  min-height: 100vh; /* Ensures container fills at least the screen height */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>
