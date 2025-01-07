<template>
  <ProductListTemplate
    title="Sushi"
    :products="displayedProducts"
    :loading="loading"
    :error="error"
    :currentLanguage="currentLanguage"
    @add-to-cart="addToCart"
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
    this.fetchSushiProducts();
  },
  methods: {
    async fetchSushiProducts() {
      try {
        const allProducts = await productService.getAllProducts();
        this.products = allProducts.filter(product => product.category === 1);
      } catch (err) {
        this.error = 'Fout bij het ophalen van de sushi producten.';
        console.error("Error fetching sushi products:", err);
      } finally {
        this.loading = false;
      }
    },
    addToCart(product) {
      const originalProduct = this.products.find(p => p.productId === product.productId);
      this.$emit('add-to-cart', originalProduct);
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
  width: 20%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
</style>