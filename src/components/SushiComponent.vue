<template>
  <ProductListTemplate
      title="Sushi"
      :products="products"
      :loading="loading"
      :error="error"
  />
</template>

<script>
import ProductListTemplate from "@/components/ProductListComponent.vue";
import productService from '@/Service/ProductService';

export default {
  components: {
    ProductListTemplate
  },
  data() {
    return {
      products: [], // Only sushi products will be stored here
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchSushiProducts();
  },
  methods: {
    async fetchSushiProducts() {
      try {
        const allProducts = await productService.getAllProducts();
        this.products = allProducts.filter(product => product.category === 1); // Assuming 1 is the ID for Sushi
      } catch (err) {
        this.error = 'Fout bij het ophalen van de sushi producten.';
        console.error("Error fetching sushi products:", err);
      } finally {
        this.loading = false;
      }
    }
  }
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
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}
</style>