<template>
  <ProductListTemplate
      title="Side Dishes"
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
    this.fetchSideDishes();
  },
  methods: {
    async fetchSideDishes() {
      try {
        const allProducts = await productService.getAllProducts();
        this.products = allProducts.filter(product => product.category === 4);
      } catch (err) {
        this.error = 'Fout bij het ophalen van de side dishes.';
        console.error("Error fetching side dishes:", err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>

</style>