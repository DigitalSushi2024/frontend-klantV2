<template>
  <div class="app-container">
    <!-- Use the HeaderComponent here -->
    <HeaderComponent />

    <!-- Call the Category component -->
    <Category @category-selected="handleCategorySelected" />

    <div class="dishes">
      <!-- Show dishes based on selected category -->
      <div v-if="selectedCategory === 'Sushi'" class="dish-category">
        <!-- Sushi items here -->
      </div>
      <div v-if="selectedCategory === 'Grill'" class="dish-category">
        <!-- Grill items here -->
      </div>
      <div v-if="selectedCategory === 'Side Dishes'" class="dish-category">
        <!-- Side dishes items here -->
      </div>
      <div v-if="selectedCategory === 'Drinks'" class="dish-category">
        <!-- Drinks items here -->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './components/headerComponents.vue';
import Category from './components/CategoryComponents.vue';

export default {
  components: {
    HeaderComponent, // Register HeaderComponent
    Category,
  },
  data() {
    return {
      selectedCategory: null,
    };
  },
  methods: {
    handleCategorySelected(category) {
      this.selectedCategory = category;
      console.log("Selected category:", category);
    },
  },
};
</script>
 
<style scoped>
/* Your existing styles */
.app-container {
  padding: 0;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.dishes {
  padding: 20px;
}

.dish-category {
  margin-bottom: 20px;
  background-color: #222;
  color: #ddd;
  padding: 15px;
  border-radius: 8px;
}
.dish-category:hover {
  background-color: #333;
}
</style>
