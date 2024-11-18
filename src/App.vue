<template>
  <div class="app-container">
    <!-- Toon een andere header op basis van de huidige route -->
    <header-component
        v-if="!isOrderPage"
        :cart-items="cartItems"
        @remove-from-cart="removeFromCart"
        @navigate-to-order="goToOrderPage"
    />
    <order-header v-else />

    <!-- Dynamische inhoud via router-view -->
    <router-view
        :cart-items="cartItems"
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
      cartItems: [], // Globale cart-items
    };
  },
  computed: {
    isOrderPage() {
      return this.$route.name === "Order"; // Controleer of de huidige route 'Order' is
    },
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cartItems.find(
          (item) => item.productName === product.productName
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
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
      this.$router.push({ name: "Order" }); // Navigeren naar Order pagina
    },
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
  min-height: 100vh; /* Zorgt ervoor dat de container minimaal de hoogte van het scherm vult */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}



</style>
