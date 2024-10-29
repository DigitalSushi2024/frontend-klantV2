<script setup>
// No changes in the script setup for now
</script>

<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/klanten">Klanten</a></li>
    </ul>
  </nav>
</template>

<style scoped>
/* Styling for the navbar */
.navbar {
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  left: 0;
  width: 100%; /* Make the navbar stretch across the full width */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem 2rem;
  color: white;
  z-index: 1000; /* Ensure it stays above other elements */
}

.logo img {
  width: 50px;
  height: 50px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-links li {
  display: inline;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

/* To prevent content from hiding behind the navbar */
body {
  padding-top: 80px; /* Adjust based on the height of your navbar */
}
</style>
