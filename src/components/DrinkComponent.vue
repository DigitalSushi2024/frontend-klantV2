<template>
  <div>
    <div v-for="subcategory in subcategories" :key="subcategory.id">
      <SubCategoryComponent :subcategory="subcategory" :filtered-products="subcategory.filteredProducts"  @add-to-cart="handleAddToCart"/>
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
      console.log("Product toegevoegd vanuit drink:", product);
      this.$emit("add-to-cart", product);
    },
  },
  setup() {
    const state = reactive({
      loading: true,
      error: null,
      subcategories: [
        { id: 10, name: "Hot Drinks", filteredProducts: [] },
        { id: 11, name: "Cold Drinks", filteredProducts: [] },
        { id: 12, name: "Alcoholic Drinks", filteredProducts: [] },
      ],
    });

    const fetchDrinks = async () => {
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

    fetchDrinks();

    return {
      ...state,
      fetchDrinks,
    };
  },
};
</script>

<style scoped>
</style>