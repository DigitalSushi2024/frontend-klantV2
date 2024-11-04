<template>
  <div class="sushi-list">
    <div v-for="category in sushiCategories" :key="category.name" class="sushi-category">
      <h2>{{ category.name }}</h2>
      <div class="sushi-items">
        <SushiItemComponent v-for="item in category.items" :key="item.name" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import SushiItemComponent from './SushiItemComponent.vue';
import TunaNig from '../assets/images/TunaNigiri.png'
import SalmonNig from '../assets/images/salmonNigiri.png'
import KappaMaki from '../assets/images/KappaMaki.png'

export default {
  components: {
    SushiItemComponent
  },
  data() {
    return {
      sushiCategories: [
        {
          name: "Nigiri",
          items: [
            { name: "Tuna nigiri", image: "TunaNig", price: 2 },
            { name: "Salmon nigiri", image: "SalmonNig", price: 3 },
          ],
        },
        {
          name: "Maki",
          items: [
            { name: "Kappa maki", image: "KappaMaki", price: 3 },
            { name: "Sake maki", image: "", price: 4 },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.sushi-list {
  display: grid;
  grid-template-columns: 1fr; /* Eén kolom per categorie */
  gap: 20px; /* Ruimte tussen categorieën */
  padding: 20px;
}

.sushi-category h2 {
  margin-top: 10px;
  color: white;
}

.sushi-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}
</style>
