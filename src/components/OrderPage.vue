<template>
  <div v-if="notification.visible" :class="['notification', notification.type]">
    {{ notification.type === 'success'
      ? translations[currentLanguage].successMessage
      : translations[currentLanguage].errorMessage }}
  </div>
  <div class="order-page">
    <!-- Header met de terugknop -->
    <div class="header">
      <button class="back-button" @click="goBack">{{ translations[currentLanguage].backButton }}</button>
      <h1>{{ translations[currentLanguage].orderSummary }}</h1>
    </div>

    <!-- Lege winkelwagen melding -->
    <div v-if="cartItems.length <= 0" class="empty-message">
      <h2>{{ translations[currentLanguage].emptyNotification }}</h2>
    </div>

    <!-- Winkelwagen items -->
    <div v-else class="order-items">
      <div v-for="item in cartItems" :key="item.productId" class="order-item">
        <img :src="item.productImage" :alt="item.productName" class="item-image" />
        <div class="item-details">
          <h3>{{ item.productName }}</h3>
          <p>{{ translations[currentLanguage].quantity }}: {{ item.quantity }}</p>
          <p>{{ translations[currentLanguage].productName }}: €{{ (item.price * item.quantity).toFixed(2) }}</p>
          <div class="quantity-controls">
            <button class="quantity-button" @click="decreaseQuantity(item.productId)">−</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button class="quantity-button" @click="increaseQuantity(item.productId)">+</button>
            <button class="remove-button" @click="removeFromCart(item.productId)">{{ translations[currentLanguage].removeButton }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Totaalprijs en Checkout -->
    <div v-if="cartItems.length > 0" class="order-summary">
      <h2>{{ translations[currentLanguage].total }}: €{{ totalPrice.toFixed(2) }}</h2>
      <button class="checkout-button" @click="checkout">{{ translations[currentLanguage].checkoutButton }}</button>
    </div>
  </div>
</template>

<!--//TODO: send orders with original english product names-->
<!--//TODO: error fix to send order to kitchen etc.-->
<!--//TODO: error fix when item is deleted from order-->

<script>
import orderService from "@/Service/OrderService.js";

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
          emptyNotification: "Your cart is empty. Please choose a product to continue!",
          successMessage: "Order placed successfully!",
          errorMessage: "Order failed.",

        },
        nl: {
          backButton: "← Terug",
          orderSummary: "Bestelling Overzicht",
          quantity: "Aantal",
          price: "Prijs",
          removeButton: "Verwijderen",
          total: "Totaal",
          checkoutButton: "Ga naar Afrekenen",
          emptyNotification: "Uw winkelwagen is leeg. Kies een product om verder te gaan!",
          successMessage: "Order succesvol geplaats",
          errorMessage: "Order niet kunnen plaatsen",
        },
      },
      notification: {
        type: "", // success or error
        visible: false,
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
    increaseQuantity(productId) {
      console.log("Increase Quantity for:", productId);
      const item = this.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity++;
        console.log("Updated item quantity:", item);
      } else {
        console.warn("Product not found for increaseQuantity:", productId);
      }
    },
    decreaseQuantity(productId) {
      const index = this.cartItems.findIndex(
          (item) => item.productId === productId
      );
      if (index !== -1) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
        } else {
          this.cartItems.splice(index, 1); // Verwijder het item als de hoeveelheid 1 is
        }
      }
    },
    removeFromCart(productId){
      const index = this.cartItems.findIndex(
          (item) => item.productId === productId
      );
      if (index !== -1) {
        if (this.cartItems[index].quantity >= 1) {
          this.cartItems.splice(index, 1);
        }
      }

    },
    showNotification(message, type) {
      this.notification.type = type;
      this.notification.visible = true;
      if (type === "success") {
        this.translations[this.currentLanguage].successMessage = message;
      } else {
        this.translations[this.currentLanguage].errorMessage = message;
      }

      // Verberg notificatie na 3 seconden
      setTimeout(() => {
        this.notification.visible = false;
        this.translations[this.currentLanguage].successMessage = "";
        this.translations[this.currentLanguage].errorMessage = "";
      }, 3000);
    },

    async checkout() {
      try {
        const orderItemsDto = this.cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          status: "Pending",
        }));
        await orderService.checkout(1,orderItemsDto);
        this.showNotification(this.translations[this.currentLanguage].successMessage, "success");
        setTimeout(() => {
          this.cartItems.splice(0, this.cartItems.length);
          this.goBack();
        }, 2000);
      } catch (error) {
        const errorMessage =
            (error.response && error.response.data.title) || this.translations[this.currentLanguage].errorMessage;
        this.showNotification(`${errorMessage}`, "error");
        console.log("Backend errors:", error.response.data.errors);
      }
    },
    goBack() {
      this.$router.go(-1); // Navigate back to the previous page
    },
  },
};
</script>

<style scoped>
/* Algemene container */
body {
  font-family: Arial, sans-serif;
  background-color: #1c1c1c;
  color: #fff;
  margin: 0;
  padding: 0;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #292929;
  border-bottom: 1px solid #444;
}

.back-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 65px;
}

.back-button:hover {
  background-color: #c0392b;
}

h1 {
  font-size: 24px;
  margin: 0;
}

.empty-message {
  text-align: center;
  margin: 30px 0;
}

.empty-message h2 {
  font-size: 18px;
  color: #aaa;
}

/* Winkelwagen items */
.order-items {
  margin: 20px auto;
  max-width: 800px;
}

.order-item {
  display: flex;
  align-items: center;
  background-color: #292929;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #444;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 20px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 18px;
  margin: 0 0 10px;
}

.item-details p {
  font-size: 14px;
  margin: 5px 0;
}

/* Controleknoppen */
.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
  gap: 15px;
}

.quantity-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
}

.quantity-button:hover {
  background-color: #2980b9;
}

.remove-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #c0392b;
}

/* Totaalprijs en Checkout */
.order-summary {
  text-align: center;
  margin-top: 20px;
}

.order-summary h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.checkout-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #388e3c;
}
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  z-index: 1000;
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
