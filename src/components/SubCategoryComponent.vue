<template>
  <div>
    <!-- Category title -->
    <h2>{{ subcategory.name }}</h2>

    <!-- Loading and Error Messages -->
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <!-- Product list -->
    <ProductListComponent
      :products="filteredProducts"
      :loading="loading"
      :error="error"
    />
  </div>
</template>

<script>
import ProductListComponent from "@/components/ProductListComponent.vue";

export default {
  components: {
    ProductListComponent,
  },
  props: {
    subcategory: {
      type: Object,
      required: true,
    },
    filteredProducts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  width: 20%;
  text-align: center;
}
</style>