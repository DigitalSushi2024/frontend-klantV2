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
            { name: "Tuna nigiri", image: "path-to-image", price: 2 },
            { name: "Salmon nigiri", image: "path-to-image", price: 3 },
          ],
        },
        {
          name: "Maki",
          items: [
            { name: "Kappa maki", image: "path-to-image", price: 3 },
            { name: "Sake maki", image: "path-to-image", price: 4 },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.sushi-list {
  padding: 10px;
}
.sushi-category h2 {
  margin-top: 20px;
  color: white;
}
.sushi-items {
  display: flex;
  flex-wrap: wrap;
}
</style>
