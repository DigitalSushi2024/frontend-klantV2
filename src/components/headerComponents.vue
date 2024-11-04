
<template>
  <header class="app-header">
    <div class="header-content">
      <p class="table">Tabel 14</p>

      <div class="cart">
        <i class="cart-icon">🛒</i>
        <span class="cart-count">10</span>
      </div>
    </div>
  </header>
  <img :src="headerImage" alt="wok-all-day" class="header-image" />
  <p class="restaurantName">wok-all-day</p>
</template>

<script>
import headerImage from '@/assets/images/Header-Image.png';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      headerImage
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');

.app-header {
  background-color: #E74C3C;
  position: relative; /* Gebruik relative in plaats van absolute */
  text-align: center;
  color: white;
  height: 5.5em;
  width: 100%;
  border-radius: 0px 0px 35px 35px;
  box-shadow: 0px 1px 1px rgba(3, 7, 18, 0.02),
  0px 5px 4px rgba(3, 7, 18, 0.03),
  0px 12px 9px rgba(3, 7, 18, 0.05),
  0px 20px 15px rgba(3, 7, 18, 0.06),
  0px 32px 24px rgba(3, 7, 18, 0.08);
  z-index: 2;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1em;
}

.table {
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: black;
  text-align: center;
  margin-top: 1.5em;
}

.cart {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: black;
  border-radius: 50%;
  padding: 5px;
  color: white;
}

.header-image {
  width: 100%;
  height: auto;
  margin: 0; /* Verwijder eventuele ongewenste marges */
  position: relative;
}

.restaurantName {
  color: #CBA43F;
  font-family: "Cinzel Decorative", serif;
  font-size: 43px;
  font-weight: 700;
  z-index: 3;
  position: relative;
  text-align: center;
  margin-top: 1em; /* Pas deze waarde aan indien nodig */
  box-shadow: 0px 1px 1px rgba(3, 7, 18, 0.02),
  0px 5px 4px rgba(3, 7, 18, 0.03),
  0px 12px 9px rgba(3, 7, 18, 0.05),
  0px 20px 15px rgba(3, 7, 18, 0.06),
  0px 32px 24px rgba(3, 7, 18, 0.08);
}
</style>
