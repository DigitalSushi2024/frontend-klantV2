<template>
  <div class="app-container">
    <!-- Language selector placed in App.vue -->
    <div class="language-selecter">
      <img
          :src="netherlandsIcon"
          alt="Dutch"
          class="netherlandsIcon"
          @click="switchLanguage('nl')"
      />
      <img
          :src="englishIcon"
          alt="English"
          class="englishIcon"
          @click="switchLanguage('en')"
      />
    </div>

    <!-- Show header based on current route -->
    <header-component
        v-if="!isOrderPage"
        :cart-items="cartItems"
        :current-language="currentLanguage"
        @navigate-to-order="goToOrderPage"
    />

    <!-- Dynamically rendered content based on route -->
    <router-view
        :cart-items="cartItems"
        :current-language="currentLanguage"
        @add-to-cart="addToCart"
        @language-changed="switchLanguage"
    />
  </div>
</template>

<script>
import HeaderComponent from "@/components/headerComponents.vue";
import netherlandsIcon from "@/assets/images/netherlands.png";
import englishIcon from "@/assets/images/english.png";

export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      cartItems: [], // Global cart items
      currentLanguage: "en", // Default language is English
      netherlandsIcon,
      englishIcon,
    };
  },
  computed: {
    isOrderPage() {
      return this.$route.name === "Order"; // Check if current route is 'Order'
    },
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cartItems.find(
          (item) => item.productId === product.productId
      );
      console.trace("addToCart called in App.vue, product:", product);
      console.log("Product received in App.vue:", product);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      this.cartItems = [...this.cartItems];
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

.language-selecter {
  position: absolute;
  margin-top: 0.3em;
  margin-left: 1.2em;
  z-index: 20;
}

.netherlandsIcon{
  width: 1.8em;
  height: auto;
  border: 1px solid #373534;
  border-radius: 100%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  margin-right: 0.2em;
}
.englishIcon {
  width: 1.8em;
  height: auto;
  border: 1px solid #373534;
  border-radius: 100%;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.app-container {
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>