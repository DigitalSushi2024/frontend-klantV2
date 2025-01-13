<template>
  <div class="order-page">
    <!-- Header with the back button -->
    <div class="header">
      <button class="back-button" @click="goBack">{{ translations[currentLanguage].backButton }}</button>
      <h1>{{ translations[currentLanguage].orderSummary }}</h1>
    </div>

    <!-- Order items list -->
    <div class="order-items">
      <div v-for="item in cartItems" :key="item.productId" class="order-item">
        <img :src="`/${item.productImage}`" :alt="item.productName" class="item-image" />
        <div class="item-details">
          <h3>{{ item.productName }}</h3>
          <p>{{ translations[currentLanguage].quantity }}: {{ item.quantity }}</p>
          <p>{{ translations[currentLanguage].price }}: €{{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
        <button class="remove-button" @click="removeFromOrder(item.productId)">{{ translations[currentLanguage].removeButton }}</button>
      </div>
    </div>

    <!-- Order total -->
    <div class="order-summary">
      <h2>{{ translations[currentLanguage].total }}: €{{ totalPrice.toFixed(2) }}</h2>
      <button class="checkout-button" @click="checkout">{{ translations[currentLanguage].checkoutButton }}</button>
    </div>
  </div>
</template>

<!--//TODO: send orders with original english product names-->
<!--//TODO: error fix to send order to kitchen etc.-->
<!--//TODO: error fix when item is deleted from order-->

<script>
export default {
  name: "OrderPage",
  props: {
    cartItems: {
      type: Array,
      default: () => [],
    },
    currentLanguage: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      translations: {
        en: {
          backButton: "← Back",
          orderSummary: "Order Summary",
          quantity: "Quantity",
          price: "Price",
          removeButton: "Remove",
          total: "Total",
          checkoutButton: "Proceed to Checkout",
        },
        nl: {
          backButton: "← Terug",
          orderSummary: "Bestelling Overzicht",
          quantity: "Aantal",
          price: "Prijs",
          removeButton: "Verwijderen",
          total: "Totaal",
          checkoutButton: "Ga naar Afrekenen",
        },
      },
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
      );
    },
  },
  methods: {
    removeFromOrder(productId) {
      this.$emit("remove-from-cart", productId); // Emit event to remove item from cart
    },
    goBack() {
      this.$router.go(-1); // Navigate back to the previous page
    },
    checkout() {
      this.$router.push({ name: "Checkout" }); // Navigate to the checkout page
    },
  },
};
</script>

<style scoped>
/* Algemene container */
.order-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #121212;
  color: white;
  border-radius: 10px;
}

/* Header met titel en back-knop */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.back-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #c0392b;
}

h1 {
  font-size: 1.8em;
  text-align: center;
  margin: 0;
}

/* Lijst met bestellingen */
.order-items {
  margin: 20px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.order-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #444;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.item-details {
  flex-grow: 1;
  padding-left: 20px;
}

.item-details h3 {
  margin: 0;
  font-size: 1.2em;
  color: #fff;
}

.item-details p {
  margin: 5px 0;
  color: #bbb;
}

.remove-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c0392b;
}

/* Samenvatting van de bestelling */
.order-summary {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #444;
  text-align: center;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.checkout-button {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #219150;
}
</style>
