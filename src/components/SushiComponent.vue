<template>
  <div>
    <!-- Sushi category titles -->
    <div v-for="subcategory in subcategory" :key="subcategory.id">
      <h2>{{ subcategory.name }}</h2>
      <div class="product-list">
        <!-- Loop through filtered products for each subcategory -->
        <div v-for="product in filteredProducts[subcategory.id]" :key="product.id" class="product-item">
          <!-- Use the SushiItem component to display individual sushi items -->
          <SushiItem :item="product" />
        </div>
      </div>
    </div>

    <!-- Loading and Error Messages -->
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import SushiItem from "@/components/SushiItemComponent.vue";
import productService from '@/Service/ProductService';

export default {
  components: {
    SushiItem,
  },
  data() {
    return {
      loading: true,
      error: null,
      subcategory: [
        {id: 1, name: 'Maki'},
        {id: 2, name: 'Nigiri'},
        {id: 3, name: 'Sashimi'},
        {id: 4, name: 'Temaki'}
      ],
      filteredProducts: {}
    };
  },
  mounted() {
    this.subcategory.forEach(subcategory => {
      this.fetchSushiProducts(subcategory.id);
    });
  },
  methods: {
    async fetchSushiProducts(subCategoryId) {
      this.loading = true;

      try {
        const allProducts = await productService.getProductsBySubCategory(subCategoryId);

        if (allProducts && Array.isArray(allProducts)) {
          const sushiProducts = allProducts.filter(product => product.category === 1);

          this.$set(this.filteredProducts, subCategoryId, sushiProducts);
        } else {
          this.error = 'Geen producten gevonden voor deze subcategorie.';
        }
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
  width: 20%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
</style>
