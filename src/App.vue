<template>
  <div class="app-container">
    <APIDataComponent></APIDataComponent>
    <header-component></header-component>
    <!-- Categorie Selectie Component -->

    <CategoryComponents @category-selected="handleCategorySelection" />

    <!-- Weergave van Item Lijst op Basis van Geselecteerde Categorie -->
    <div v-if="selectedCategory === 'Sushi'">
      <SushiListComponent />
    </div>
    <div v-else-if="selectedCategory === 'Grill'">
      <GrillListComponent />
    </div>
    <div v-else-if="selectedCategory === 'Side Dishes'">
      <SideDishesListComponent />
    </div>
    <div v-else-if="selectedCategory === 'Drinks'">
      <DrinksListComponent />
    </div>
  </div>
</template>
<script>
import CategoryComponents from '@/components/CategoryComponents.vue';
import SushiListComponent from '@/components/SushiListComponent.vue';
import HeaderComponent from "@/components/headerComponents.vue";
import APIDataComponent from "@/APIDataComponent.vue";


export default {
  components: {
    HeaderComponent,
    CategoryComponents,
    SushiListComponent,
    APIDataComponent,
  },
  data() {
    return {
      selectedCategory: null,
    };
  },
  methods: {
    handleCategorySelection(category) {
      this.selectedCategory = category;
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
