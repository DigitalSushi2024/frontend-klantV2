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
      products: [],
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
        this.products = allProducts.filter(product => product.category === 4);
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