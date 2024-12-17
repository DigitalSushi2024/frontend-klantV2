<template>
  <div v-if="notification.message" :class="['notification', notification.type]">
    {{ notification.message }}
  </div>
  <div class="order-page">
    <!-- Header met de terugknop -->
    <div class="header">
      <button class="back-button" @click="goBack">← Back</button>
      <h1>Order Summary</h1>
    </div>

    <!-- Order items list -->
    <div class="order-items">
      <div v-for="item in cartItems" :key="item.id" class="order-item">
        <img :src="`${item.imageUrl}`" :alt="item.name" class="item-image" />
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>Price: €{{ item.price.toFixed(2) }}</p>
          <div class="quantity-controls">
            <button class="quantity-button" @click="decreaseQuantity(item.id)">−</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button class="quantity-button" @click="increaseQuantity(item.id)">+</button>
            <button class="remove"  @click="removeFromCart(item.id)">Remove</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Order total -->
    <div class="order-summary">
      <h2>Total: €{{ totalPrice.toFixed(2) }}</h2>
      <button class="checkout-button" @click="checkout">Proceed to Checkout</button>
    </div>
  </div>
</template>


<script>
import orderService from "@/Service/OrderService.js";

export default {
  path: '/order',
  name: "OrderPage",
  props:
      {
    cartItems: {
      type: Array,
      default: () => [],
    },
    sessionId: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  data() {
    return {
      notification: {
        message: "",
        type: "",
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
      const item = this.cartItems.find((item) => item.id === productId);
      if (item) {
        item.quantity++;
        console.log("Updated item quantity:", item);
      } else {
        console.warn("Product not found for increaseQuantity:", productId);
      }
    },
    decreaseQuantity(productId) {
      const index = this.cartItems.findIndex(
          (item) => item.id === productId
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
          (item) => item.id === productId
      );
      if (index !== -1) {
        if (this.cartItems[index].quantity >= 1) {
          this.cartItems.splice(index, 1);
        }
      }

    },
    showNotification(message, type) {
      this.notification.message = message;
      this.notification.type = type;

      // Verberg de melding na 3 seconden
      setTimeout(() => {
        this.notification.message = "";
        this.notification.type = "";
      }, 3000);
    },

    async checkout() {
      try {
        // Maak een lijst van OrderItemsDTO
        const orderItemsDto = this.cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
          status: "Pending",
        }));
        await orderService.checkout(1,orderItemsDto);
        this.showNotification("Order placed successfully!", "success");
        setTimeout(() => {
          this.cartItems.splice(0, this.cartItems.length);
        }, 2000);
      } catch (error) {
        const errorMessage =
            (error.response && error.response.data.title) || "Failed to place order";
        this.showNotification(`Error: ${errorMessage}`, "error");
        console.log("Backend errors:", error.response.data.errors);
      }
    },

    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2em;
  color: #fff;
  text-align: center;
  z-index: 1000;
}

.notification.success {
  background-color: #28a745; /* Groen voor succes */
}

.notification.error {
  background-color: #dc3545; /* Rood voor foutmeldingen */
}
/* Algemene container */
.order-page {
  width: 100%;
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

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity {
  font-size: 1.2em;
  color: white;
}

.quantity-button {
  background-color: #333;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 1.2em;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-button:hover {
  background-color: #555;
}

/* Samenvatting van de bestelling */
.order-summary {
  margin-top: 20px;
  padding-top: 10px;
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
.remove {
  background-color: #e74c3c; /* Fel rood */
  color: white; /* Witte tekst */
  border: none; /* Geen rand */
  padding: 8px 12px; /* Ruimte binnen de knop */
  font-size: 0.9em; /* Tekstgrootte */
  font-weight: bold; /* Maak de tekst vet */
  border-radius: 5px; /* Rond de hoeken */
  cursor: pointer; /* Toon een pointer-cursor bij hover */
  transition: background-color 0.3s ease, transform 0.2s ease; /* Voor animaties */
}

.remove:hover {
  background-color: #c0392b; /* Donkerder rood bij hover */
  transform: scale(1.05); /* Vergroot de knop iets bij hover */
}
</style>
