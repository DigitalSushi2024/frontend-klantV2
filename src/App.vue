<template>
  <div class="app-container">
    <header-component></header-component>
    <cart-icon :cartItems="cartItems" @remove-from-cart="removeFromCart" />
    <CategoryComponents @category-selected="handleCategorySelection" />

    <!-- Display product lists based on the selected category -->
    <div v-if="selectedCategory === 'Sushi'">
      <SushiComponent @add-to-cart="addToCart" />
    </div>
    <div v-else-if="selectedCategory === 'Grill'">
      <GrilledComponent @add-to-cart="addToCart" />
    </div>
    <div v-else-if="selectedCategory === 'Side Dishes'">
      <DishComponent @add-to-cart="addToCart" />
    </div>
    <div v-else-if="selectedCategory === 'Drinks'">
      <DrinkComponent @add-to-cart="addToCart" />
    </div>

    <!-- Cart button and cart component -->
  </div>
</template>
<script>
import CategoryComponents from '@/components/CategoryComponents.vue';
import SushiComponent from '@/components/SushiComponent.vue';
import DrinkComponent from "@/components/DrinkComponent.vue";
import DishComponent from "@/components/DishComponent.vue";
import GrilledComponent from "@/components/GrilledComponent.vue";
import HeaderComponent from "@/components/headerComponents.vue";
import Cart from "@/components/Cart.vue";
import CartIcon from "@/components/CartIcon.vue";



export default {
  components: {
    CartIcon,
    Cart,
    HeaderComponent,
    CategoryComponents,
    SushiComponent,
    DrinkComponent,
    GrilledComponent,
    DishComponent,
  },
  data() {
    return {
      selectedCategory: null,
      cartItems: [], // Array to store cart items
      isCartVisible: false,
    };
  },
  methods: {
    handleCategorySelection(category) {
      this.selectedCategory = category;
    },
    addToCart(product) {
      // Check if the item already exists in the cart
      const existingItem = this.cartItems.find(item => item.productName === product.productName);

      if (existingItem) {
        // Increase quantity if item with the same name already exists
        existingItem.quantity++;
      } else {
        // Add new item to cart with quantity 1
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productName) {
      console.log("Removing item:", productName); // Debugging line
      const itemIndex = this.cartItems.findIndex(item => item.productName === productName);

      if (itemIndex !== -1) {
        const item = this.cartItems[itemIndex];

        if (item.quantity > 1) {
          item.quantity--;
        } else {
          this.cartItems.splice(itemIndex, 1);
        }
      }
    },
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
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
  min-height: 100vh; /* Zorgt ervoor dat de container minimaal de hoogte van het scherm vult */
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

</style>
