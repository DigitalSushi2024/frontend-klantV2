<template>
  <div>
    <div v-for="subcategory in subcategories" :key="subcategory.id">
      <br>
      <h2 class="title"> {{ subcategory.name }}</h2>
      <SubCategoryComponent
          :subcategory="subcategory"
          :filtered-products="subcategory.filteredProducts"
          @add-to-cart="handleAddToCart"/>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import SubCategoryComponent from "@/components/SubCategoryComponent.vue";
import productService from '@/Service/ProductService';
import ProductListComponent from "@/components/ProductListComponent.vue";

export default {
  components: {
    ProductListComponent,
    SubCategoryComponent,
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
        { id: 5, name: "Meat", filteredProducts: [] },
        { id: 6, name: "Fish", filteredProducts: [] },
        { id: 7, name: "Vegetables", filteredProducts: [] },
      ],
    });

    const fetchGrilledItems = async () => {
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
              imageUrl: product.productImage || 'default-image-path.jpg',
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

    fetchGrilledItems();

    return {
      ...state,
      fetchGrilledItems,
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
</style>