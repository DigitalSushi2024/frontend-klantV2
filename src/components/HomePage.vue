<template>
  <div v-if="!isOrderPage" class="black-container">
    <CategoryComponents @category-selected="handleCategorySelection" :currentLanguage="currentLanguage" />
    <div v-if="selectedCategory === 'sushi'">
      <SushiComponent @add-to-cart="$emit('add-to-cart', $event)"  :currentLanguage="currentLanguage" />
    </div>
    <div v-else-if="selectedCategory === 'grill'">
      <GrilledComponent @add-to-cart="$emit('add-to-cart', $event)"  :currentLanguage="currentLanguage" />
    </div>
    <div v-else-if="selectedCategory === 'sideDishes'">
      <DishComponent @add-to-cart="$emit('add-to-cart', $event)"  :currentLanguage="currentLanguage" />
    </div>
    <div v-else-if="selectedCategory === 'drinks'">
      <DrinkComponent @add-to-cart="$emit('add-to-cart', $event)"  :currentLanguage="currentLanguage" />
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
  props: {
    currentLanguage: {
      type: String,
      default: "en"
    }
  },
  data() {
    return {
      selectedCategory: null,
    };
  },
  methods: {
    handleCategorySelection(category) {
      this.selectedCategory = category; // Set the selected category key
    },
    addToCart(product) {
      this.$emit("add-to-cart", product);
    },
  },
};
</script>

<style scoped>
.black-container {
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