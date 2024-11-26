<template>
  <div>
    <!-- Sushi category title -->
    <h2>{{ subcategory.name }}</h2>

    <!-- Loading and Error Messages -->
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <!-- Product list -->
    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <SushiItem :item="product" />
      </div>
    </div>
  </div>
</template>

<script>
import SushiItem from "@/components/SushiItemComponent.vue";
import productService from "@/Service/ProductService";

export default {
  components: {
    SushiItem,
  },
  props: {
    subcategory: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      error: null,
      filteredProducts: [],
    };
  },
  mounted() {
    this.fetchSushiProducts();
  },
  methods: {
    async fetchSushiProducts() {
      this.loading = true;

      try {
        // Pass both categoryId and subcategoryId to the service method
        const allProducts = await productService.getProductsBySubCategory(this.subcategory.categoryId, this.subcategory.id);
        console.log("API Data for SubCategory:", this.subcategory.id, allProducts);

        if (allProducts && Array.isArray(allProducts)) {
          this.filteredProducts = allProducts || [];
        } else {
          console.error("No products found for subcategory:", this.subcategory.id);
          this.error = `No products found for subcategory ${this.subcategory.name}`;
        }
      } catch (err) {
        console.error(`Error fetching products for subcategory ${this.subcategory.id}:`, err);
        this.error = `Failed to fetch products for subcategory ${this.subcategory.name}`;
      } finally {
        this.loading = false;
      }
    },
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

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
</style>
