<template>
  <div class="categories">
    <button class="category-btn" v-for="category in categories" :key="category.id" @click="selectCategory(category)">
      <img :src="category.image" :alt="category.name" class="category-image" />
      {{ category.name }}
    </button>
  </div>
</template>

<script>
import sushiImage from '@/assets/images/sushi.png';
import grillImage from '@/assets/images/skewer.png';
import dishImage from '@/assets/images/dish.png';
import drinkImage from '@/assets/images/poinsettia.png';

export default {
  data() {
    return {
      categories: [
        {id: 1, name: "Sushi", image: sushiImage},
        {id: 2, name: "Grill", image: grillImage},
        {id: 3, name: "Side Dishes", image: dishImage},
        {id: 4, name: "Drinks", image: drinkImage}
      ],
    };
  },
  methods: {
    selectCategory(category) {
      this.$emit('category-selected', category.name);
    },
  },
};
</script>

<style scoped>
@media only screen and (max-width: 769px) {
  .categories {
    display: flex;
    justify-content: space-evenly;
    margin: 3em 0em;
    overflow-y: hidden;
    overflow-x: auto;

  }

  .category-btn {
    background-color: #0000;
    color: white;
    border-color: #E74C3C;
    padding: 1em 1em;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 1em;
    transition: background-color 0.3s ease;
    width: 12em;
    height: 4em;
    margin-left: 1em;
    font-size: 13px;
  }

  .category-btn:hover {
    background-color: #E74C3C;
  }

  .category-btn:hover .category-image {
    filter: invert(100%) sepia(2%) saturate(0%) hue-rotate(33deg) brightness(110%) contrast(1100%);
  }

  .category-image {
    width: 2em;
    height: 2em;
    object-fit: cover;
  }
}


@media only screen and (max-width: 4000px) {
  .categories {
    display: flex;
    justify-content: space-evenly;
    margin: 2em 0em;
  }

  .category-btn {
    background-color: #0000;
    color: white;
    border-color: #E74C3C;
    padding: 1em 1em;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 1em;
    transition: background-color 0.3s ease;
    width: 12em;
    height: 4em;
    margin-left: 1em;
  }

  .category-image {
    width: 2em;
    height: 2em;
    object-fit: cover;
    filter: invert(100%) sepia(2%) saturate(0%) hue-rotate(33deg) brightness(110%) contrast(1100%);
  }
}

</style>