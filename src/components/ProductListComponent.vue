<template>
  <div class="product-list">
    <h2>{{ title }}</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="product-container">
        <div v-for="product in products" :key="product.productId" class="product-item">
          <img
              :src="product.imageUrl || defaultImage"
              :alt="product.name"
              class="product-image"
          />
          <h3>{{ product.name }}</h3>
          <p>€{{ product.price.toFixed(2) }}</p>
          <button
              class="add-to-cart-btn"
              @click="addToCart(product)"
              aria-label="Add to Cart"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: false
    },
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
  },
  data() {
    return {
      defaultImage: 'default-image-path.jpg'
    };
  }
};
</script>

<style scoped>
.product-list {
  display: flex;             /* Maak de container een flexbox */
  flex-wrap: wrap;           /* Laat items op meerdere lijnen staan */
  justify-content: center;   /* Centreer de items horizontaal */
  align-items: center;       /* Centreer de items verticaal */
  gap: 20px;                 /* Ruimte tussen de items */
  padding: 20px;
  text-align: center;
  color: white;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;

}

.product-item {
  background-color: #302D2F;
  display: inline-block;
  width: 9em;
  text-align: center;
  border-radius: 21px;
  font-family: "Roboto", sans-serif;
  padding: 1em;
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}

.product-item:hover {
  background-color: #181818;
  transform: scale(1.05);
}

.product-image {
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

.error {
  color: red;
}

.loading {
  color: #fff;
  font-size: 1.2em;
  font-weight: bold;
}
</style>