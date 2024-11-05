<template>
  <ProductListTemplate
      title="Drinks"
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
      products: [], // Only drinks will be stored here
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchDrinks();
  },
  methods: {
    async fetchDrinks() {
      try {
        const allProducts = await productService.getAllProducts();
        this.products = allProducts.filter(product => product.category === 2); // Assuming 2 is the ID for Drinks
      } catch (err) {
        this.error = 'Fout bij het ophalen van de drankjes.';
        console.error("Error fetching drinks:", err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>

</style>