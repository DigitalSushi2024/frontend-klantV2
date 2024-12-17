<template>
  <div>
    <!-- Category title -->
    <h2>{{ subcategory.name }}</h2>

    <!-- Loading and Error Messages -->
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <!-- Product list -->
    <ProductListComponent
      :products="filteredProducts"
      :loading="loading"
      :error="error"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script>
import ProductListComponent from "@/components/ProductListComponent.vue";

export default {
  components: {
    ProductListComponent,
  },
  props: {
    subcategory: {
      type: Object,
      required: true,
    },
    filteredProducts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  methods: {
    handleAddToCart(product) {
      this.$emit('add-to-cart', product);
    }
  }
};
</script>

<style scoped>
.sushi-item {
  background-color: #302D2F;
  color: white;
  width: 9em;
  text-align: center;
  margin: 10px;
  border-radius: 21px;
  padding: 1em;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}

.sushi-item:hover {
  background-color: #181818;
  transform: scale(1.05);
}

.sushi-img {
  width: 90%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}

.add-to-cart-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #218838;
}
</style>