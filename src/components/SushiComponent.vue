<template>
  <div>
    <div v-for="subcategory in state.subcategories" :key="subcategory.id">
      <SubCategoryComponent 
        :subcategory="subcategory" 
        :filtered-products="subcategory.filteredProducts"
        @add-to-cart="handleAddToCart"
      >
        <ProductListComponent 
          :products="subcategory.filteredProducts" 
          :loading="state.loading" 
          :error="state.error" 
          :title="subcategory.name"
        />
      </SubCategoryComponent>
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
      cart: [], // Add cart state
    });

    const fetchSushiProducts = async () => {
      state.loading = true;
      try {
        for (const subcategory of state.subcategories) {
          const response = await productService.getProductsBySubCategory(subcategory.id);
          const allProducts = response.$values || response;
          console.log("API Data for SubCategory:", subcategory.id, allProducts);

          if (allProducts && Array.isArray(allProducts)) {
            subcategory.filteredProducts = allProducts.map(product => ({
              id: product.productId,
              name: product.productName,
              price: product.price,
              imageUrl: product.productImage || 'default-image-path.jpg', // Ensure imageUrl is set
            }));
          } else {
            console.error("No products found for subcategory:", subcategory.id);
            state.error = `No products found for subcategory ${subcategory.name}`;
          }
        }
      } catch (err) {
        console.error(`Error fetching products for subcategory:`, err);
        state.error = `Failed to fetch products for subcategories`;
      } finally {
        state.loading = false;
      }
    };

    onMounted(() => {
      fetchSushiProducts();
    });

    const handleAddToCart = (product) => {
      console.log('Product added to cart:', product);
      state.cart.push(product); // Add product to cart
    };

    return {
      state,
      handleAddToCart,
    };
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  width: 20%;
  text-align: center;
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