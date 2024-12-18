<template>
  <div>
    <div v-if="state.loading">Loading...</div>
    <div v-if="state.error">{{ state.error }}</div>

    <div v-for="subcategory in state.subcategories" :key="subcategory.id">
      <br>
      <h2 class="title">{{ subcategory.name }}</h2>
      <ProductListComponent
          :products="subcategory.filteredProducts"
          :loading="state.loading"
          :error="state.error"
          @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>


<script>
import { reactive, onMounted } from 'vue';
import SubCategoryComponent from "@/components/SubCategoryComponent.vue";
import ProductListComponent from "@/components/ProductListComponent.vue"; // Ensure this import
import productService from "@/Service/ProductService";

export default {
  components: {
    SubCategoryComponent,
    ProductListComponent, // Ensure this registration
  },
  methods: {
    handleAddToCart(product) {
      this.$emit("add-to-cart", product);
    },
  },
  setup() {
    const state = reactive({
      loading: true,
      error: null,
      subcategories: [
        { id: 1, name: "Maki", filteredProducts: [] },
        { id: 2, name: "Nigiri", filteredProducts: [] },
        { id: 3, name: "Sashimi", filteredProducts: [] },
        { id: 4, name: "Temaki", filteredProducts: [] },
      ],
    });

    const fetchSushiProducts = async () => {
      state.loading = true;
      try {
        for (const subcategory of state.subcategories) {
          const response = await productService.getProductsBySubCategory(subcategory.id);
          const allProducts = response.$values || response;

          if (allProducts && Array.isArray(allProducts)) {
            subcategory.filteredProducts = allProducts.map(product => ({
              id: product.productId,
              name: product.productName,
              price: product.price,
              imageUrl: product.productImage || 'default-image-path.jpg', // Ensure imageUrl is set
            }));
          } else {
            state.error = `No products found for subcategory ${subcategory.name}`;
          }
        }
      } catch (err) {
        state.error = `Failed to fetch products for subcategories`;
      } finally {
        state.loading = false;
      }
    };
    fetchSushiProducts();


    return {
      state,
      fetchSushiProducts
    };
  },
};
</script>

<style scoped>
.title{
  display: flex;             /* Maak de container een flexbox */
  flex-wrap: wrap;           /* Laat items op meerdere lijnen staan */
  justify-content: center;   /* Centreer de items horizontaal */
  align-items: center;       /* Centreer de items verticaal */
  padding: 10px;             /* Voeg ruimte toe aan de container */
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