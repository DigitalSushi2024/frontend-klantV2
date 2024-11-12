<template>
  <div class="app-container">
    <header-component
        :cart-items="cartItems"
        @remove-from-cart="removeFromCart"
        @navigate-to-order="goToOrderPage"
    />

    <div class="black-container">

    <CategoryComponents @category-selected="handleCategorySelection" />
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
  </div>
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
      cartItems: [],
      isCartVisible: false,
    };
  },
  methods: {
    handleCategorySelection(category) {
      this.selectedCategory = category;
    },
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.productName === product.productName);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(productName) {
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
    goToOrderPage() {
      this.$router.push('/order');
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

.black-container{
  background-color: #010101;
  width: 100%;
  height: 100%;
  margin-top: 0.8em;
  z-index: 2;
  border-radius: 35px 35px 0px 0px;
}

</style>
