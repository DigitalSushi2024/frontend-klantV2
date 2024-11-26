<template>
  <div>
    <div v-for="subcategory in subcategory" :key="subcategory.id">
      <!-- Use the SubcategoryComponent to display products for each subcategory -->
      <SubcategoryComponent :subcategory="subcategory" />
    </div>

    <!-- Loading and Error Messages -->
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import SubcategoryComponent from "@/components/SubcategoryComponent.vue";

export default {
  components: {
    SubcategoryComponent,
  },
  data() {
    return {
      loading: true,
      error: null,
      subcategory: [
        { id: 1, name: "Maki" },
        { id: 2, name: "Nigiri" },
        { id: 3, name: "Sashimi" },
        { id: 4, name: "Temaki" },
      ],
    };
  },
  mounted() {
    // Loading is handled per subcategory in SubcategoryComponent
    this.loading = false;
  },
};
</script>


<style scoped>
.category-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.category-buttons button {
  padding: 10px 20px;
  cursor: pointer;
}

.category-buttons button.active {
  background-color: #ff5733;
  color: white;
}

.product-item {
  margin-bottom: 20px;
  text-align: center;
}

.product-image {
  width: 20%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
</style>
