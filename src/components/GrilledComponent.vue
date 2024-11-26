  <template>
    <ProductListTemplate
        title="Grill"
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
      this.fetchGrilledItems();
    },
    methods: {
      async fetchGrilledItems() {
        try {
          const allProducts = await productService.getAllProducts();
          this.products = allProducts.filter(product => product.category === 2);
        } catch (err) {
          this.error = 'Fout bij het ophalen van de grill items.';
          console.error("Error fetching grilled items:", err);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>

  <style scoped>

  </style>