<template>
  <ProductListTemplate
      title="Drinks"
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
    },
    handleAddToCart(product) {
      this.$emit("add-to-cart", product);
    },
    addToCart(product) {
      const originalProduct = this.products.find(p => p.productId === product.productId);
      this.$emit('add-to-cart', originalProduct);
    }
  }
};
</script>

<style scoped>

</style>