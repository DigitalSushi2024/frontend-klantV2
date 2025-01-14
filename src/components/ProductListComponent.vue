<template>
  <div class="product-list">
    <div v-if="notification.visible" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
    <h2>{{ title }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-for="product in products" :key="product.productId" class="product-item">
        <img :src="`${product.productImage}`" :alt="product.productName" class="product-image" />
        <h3>{{ product.productName }}</h3>
        <p>€{{ product.price.toFixed(2) }}</p>
        <button class="add-to-cart-btn" @click="addToCart(product)" >
          {{ translations[currentLanguage].adder }}
        </button>
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
    },
    currentLanguage: {
      type: String,
      default: "en"
    }
  },
  data() {
    return {
      translations: {
        en: {
          adder: "Add to Cart",
          itemAdded: " Added to Cart"
        },
        nl: {
          adder: "Voeg toe aan winkelwagen",
          itemAdded: " Toegevoegd aan Winkelwagen"
        }
      },
      notification: {
        visible: false,
        message: "",
        type: "success" // success of error
      },
    };
  },
  emits: ['add-to-cart'],
  methods: {
    addToCart(product) {
      console.log("product list", product);
      this.$emit('add-to-cart', product);
      this.notification.message = `${product.productName}` + this.translations[this.currentLanguage].itemAdded;
      this.notification.type = "success"; // Of 'error' als nodig
      this.notification.visible = true;

      // Verberg de notificatie na 3 seconden
      setTimeout(() => {
        this.notification.visible = false;
      }, 3000);
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
  margin-top: 2em;
  background-color: #302D2F;
  display: inline-block;
  width: 9em;
  margin-left: 0.5em;
  margin-right: 0.5em;
  text-align: center;
  border-radius: 21px;
  font-family: "Roboto", sans-serif;
  padding-top: -1em;
}
.product-item:hover {
  background-color: #181818;
}

.product-image {
  width: 95%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  margin-top: -3em;
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

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 16px;
  z-index: 1000;
  color: #fff;
  animation: fade-in-out 3s ease-in-out;
}

.notification.success {
  background-color: #4caf50; /* Groen */
}

.notification.error {
  background-color: #f44336; /* Rood */
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>