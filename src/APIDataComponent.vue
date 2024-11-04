<template>
  <div class="api-data">
    <h2>Data from API</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <!-- Toon de data hier -->
      <ul>
        <li v-for="item in apiData" :key="item.id">
          {{ item.name }} - {{ item.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiData: [], // Voor de API-data
      loading: true, // Voor laadtoestand
      error: null, // Voor fouten
    };
  },
  mounted() {
    // Haal data op wanneer de component geladen is
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://localhost:7110/api"); // Vervang 'your-endpoint' door het juiste endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.apiData = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>

</style>