

<template>
  <div v-if="!isOrderPage" class="black-container">
    <CategoryComponents @category-selected="handleCategorySelection" />
    <div v-if="selectedCategory === 'Sushi'">
      <SushiComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        Product added to cart!
      </div>
    </div>
    <div v-else-if="selectedCategory === 'Grill'">
      <GrilledComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        Product added to cart!
      </div>
    </div>
    <div v-else-if="selectedCategory === 'Side Dishes'">
      <DishComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        Product added to cart!
      </div>
    </div>
    <div v-else-if="selectedCategory === 'Drinks'">
      <DrinkComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        Product added to cart!
      </div>
    </div>
  </div>
</template>

<script>
import DishComponent from "@/components/DishComponent.vue";
import GrilledComponent from "@/components/GrilledComponent.vue";
import CategoryComponents from "@/components/CategoryComponents.vue";
import DrinkComponent from "@/components/DrinkComponent.vue";
import SushiComponent from "@/components/SushiComponent.vue";
export default {
  components: {
    CategoryComponents,
    SushiComponent,
    DrinkComponent,
    GrilledComponent,
    DishComponent
  },
  data() {
    return {
      selectedCategory: null,
      showNotification: false,
    };
  },
  methods: {
    handleCategorySelection(category) {
      this.selectedCategory = category;
    },
    addToCart(product) {
      this.$emit("add-to-cart", product);
      this.showNotification = true; // Toon de notificatie
      setTimeout(() => {
        this.showNotification = false; // Verberg de notificatie na 2 seconden
      }, 1000);
    },
  },
};
</script>

<style scoped>
.black-container{
  background-color: #010101;
  width: 100%;
  height: 100%;
  margin-top: 0.8em;
  z-index: 2;
  border-radius: 35px 35px 0px 0px;
}
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50; /* Groene achtergrondkleur */
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fade-in-out 2s ease-in-out; /* Vloeiend fade-in-out effect */
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>