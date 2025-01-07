<template>
  <div v-if="!isOrderPage" class="black-container">
    <CategoryComponents @category-selected="handleCategorySelection" :currentLanguage="currentLanguage" />
    <div v-if="selectedCategory === 'sushi'">
      <SushiComponent @add-to-cart="addToCart" :currentLanguage="currentLanguage" />
    </div>
    <div v-else-if="selectedCategory === 'grill'">
      <GrilledComponent @add-to-cart="addToCart" :currentLanguage="currentLanguage" />
    </div>
    <div v-else-if="selectedCategory === 'sideDishes'">
      <DishComponent @add-to-cart="addToCart" :currentLanguage="currentLanguage" />
    </div>
    <div v-else-if="selectedCategory === 'drinks'">
      <DrinkComponent @add-to-cart="addToCart" :currentLanguage="currentLanguage" />
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
</style>