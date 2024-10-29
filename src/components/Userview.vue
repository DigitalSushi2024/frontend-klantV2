<script setup>
import { ref, onMounted } from 'vue';

const klanten = ref([]); // Define a reactive variable to store customer data
const errorMessage = ref(null); // Handle any possible errors

// Fetch the customer data when the component is mounted
const fetchKlanten = async () => {
  try {
    const response = await fetch('https://localhost:7280/api/klant'); // Update URL as necessary
    if (!response.ok) throw new Error('Failed to fetch customers!');
    klanten.value = await response.json();
  } catch (error) {
    errorMessage.value = error.message;
  }
};

// Call fetchKlanten when the component is mounted
onMounted(fetchKlanten);
</script>

<template>
  <div>
    <h2>Klantenlijst</h2>

    <!-- Display an error message if the fetch fails -->
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <!-- Display a list of customers -->
    <ul v-if="klanten.length > 0">
      <li v-for="klant in klanten" :key="klant.id">
        Naam: {{ klant.naam }}, Email: {{ klant.email }}
      </li>
    </ul>

    <!-- Display a message if no customers are found -->
    <p v-else>Er zijn geen klanten beschikbaar!</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}
</style>
