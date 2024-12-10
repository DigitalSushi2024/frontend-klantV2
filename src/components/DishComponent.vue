<template>
  <div>
    <div v-for="subcategory in subcategories" :key="subcategory.id">
      <SubCategoryComponent :subcategory="subcategory" :filtered-products="subcategory.filteredProducts" />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import SubCategoryComponent from "@/components/SubCategoryComponent.vue";
import productService from '@/Service/ProductService';

export default {
  components: {
    SubCategoryComponent,
  },
  setup() {
    const state = reactive({
      loading: true,
      error: null,
      subcategories: [
        { id: 8, name: "Cold Dishes", filteredProducts: [] },
        { id: 9, name: "Hot Dishes", filteredProducts: [] },
      ],
    });

    const fetchSideDishes = async () => {
      state.loading = true;
      try {
        for (const subcategory of state.subcategories) {
          const response = await productService.getProductsBySubCategory(subcategory.id);
          const allProducts = response.$values || response;
          console.log(`Fetched products for ${subcategory.name}:`, allProducts);

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
        console.error(`Error fetching products for subcategories:`, err);
      } finally {
        state.loading = false;
      }
    };

    fetchSideDishes();

    return {
      ...state,
      fetchSideDishes,
    };
  },
};
</script>

<style scoped>
</style>