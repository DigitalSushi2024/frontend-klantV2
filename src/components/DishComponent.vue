<template>
  <ProductListTemplate
      title="Side Dishes"
      :products="displayedProducts"
      :loading="loading"
      :error="error"
      :currentLanguage="currentLanguage"
      @add-to-cart="handleAddToCart"

  />
</template>

<script>
import ProductListTemplate from "@/components/ProductListComponent.vue";
import productService from '@/Service/ProductService';

export default {
  components: {
    ProductListTemplate
  },
  props: {
    currentLanguage: {
      type: String,
      default: "en"
    }
  },
  data() {
    return {
      products: [],
      loading: true,
      error: null
    };
  },
  computed: {
    displayedProducts() {
      return this.products.map(product => ({
        ...product,
        productName: this.currentLanguage === 'nl' ? product.productNameNL : product.productName
      }));
    }
  },
  mounted() {
    this.fetchSideDishes();
  },
  emits: ['add-to-cart'],
  methods: {
    async fetchSideDishes() {
      try {
        const allProducts = await productService.getAllProducts();
        this.products = allProducts.filter(product => product.category === 3);
      } catch (err) {
        this.error = 'Fout bij het ophalen van de side dishes.';
        console.error("Error fetching side dishes:", err);
      } finally {
        this.loading = false;
      }
    },
    handleAddToCart(product) {
      this.$emit("add-to-cart", product);
    },
  }
};
</script>

<style scoped>

</style>