<template>
  <div class="product-list">
    <h2>Producten</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="products && products.length">
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - €{{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import productService from '@/Service/ProductService.js';

export default {
  data() {
    return {
      products: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchAllProducts();
  },
  methods: {
    async fetchAllProducts() {
      try {
        this.products = await productService.getAllProducts();
      } catch (err) {
        this.error = "Fout bij het ophalen van de producten.";
      } finally {
        this.loading = false;
      }
    },

    async fetchProductById(productId) {
      try {
        this.loading = true;
        const product = await productService.getProductById(productId);
        this.products = [product];
      } catch (err) {
        this.error = `Fout bij het ophalen van product met ID ${productId}.`;
      } finally {
        this.loading = false;
      }
    },

    async fetchProductsByLocation(locationId) {
      try {
        this.loading = true;
        this.products = await productService.getProductsByLocation(locationId);
      } catch (err) {
        this.error = `Fout bij het ophalen van producten voor locatie ID ${locationId}.`;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.product-list {
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.error {
  color: red;
}
</style>