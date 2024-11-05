<template>
  <div class="product-list">
    <h2>{{ title }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="product in products" :key="product.productId" class="product-item">
        <img :src="`${product.productImage}`" :alt="product.productName" class="product-image" />
        <h3>{{ product.productName }}</h3>
        <p>€{{ product.price.toFixed(2) }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @typedef {Object} Product
 * @property {number} productId - The unique ID of the product
 * @property {string} productName - The name of the product
 * @property {string} productImage - The image path of the product
 * @property {number} category
 * @property {number} price - The price of the product
 */
  export default {
  props: {
    title: {
      type: String,
      required: true
    },
    /**
     * @type {Product[]}
     */
    products: {
      type: Array,
      required: true,
      default: () => [] // Optional default value to satisfy type checking
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  methods: {

    addToCart(product) {
      // Emit an event to the parent with the product to add
      this.$emit('add-to-cart', product);
    }
  }
};
</script>

<style scoped>
.product-list {
  text-align: center;
  color: white;
}

.product-item {
  background-color: #222222;
  display: inline-block;
  width: 150px;
  margin: 10px;
  text-align: center;
}
.product-item:hover {
  background-color: #181818;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.error {
  color: red;
}
</style>