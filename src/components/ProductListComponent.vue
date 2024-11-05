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
        <button class="add-to-cart-btn" @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @typedef {Object} Product
 * @property {number} productId
 * @property {string} productName
 * @property {string} productImage
 * @property {number} category
 * @property {number} price
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
      default: () => []
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

.error {
  color: red;
}
</style>