<template>
  <p class="category-title">{{ translations[currentLanguage].categoriesTitle }}</p>
  <div class="categories">
    <button
        class="category-btn"
        v-for="category in categories"
        :key="category.id"
        @click="selectCategory(category)"
    >
      <img :src="category.image" :alt="category.name" class="category-image" />
      {{ getTranslatedCategoryName(category) }} <!-- Bind the computed translated name -->
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
      currentLanguage: "en", // Default language
      categories: [
        {id: 1, name: "Sushi", image: sushiImage},
        {id: 2, name: "Grill", image: grillImage},
        {id: 3, name: "Side Dishes", image: dishImage},
        {id: 4, name: "Drinks", image: drinkImage}
      ],
      translations: {
        en: {
          categoriesTitle: "Categories",
          categories: {
            sushi: "Sushi",
            grill: "Grill",
            sideDishes: "Side Dishes",
            drinks: "Drinks"
          }
        },
        nl: {
          categoriesTitle: "Categorieën",
          categories: {
            sushi: "Sushi",
            grill: "Grill",
            sideDishes: "Bijgerechten",
            drinks: "Dranken"
          }
        }
      }
    };
  },
  methods: {
    selectCategory(category) {
      this.$emit('category-selected', category.name);
    },
    // Switch language and store preference
    switchLanguage(language) {
      this.currentLanguage = language;
      localStorage.setItem("preferredLanguage", language);
    },
    // Method to return translated category name
    getTranslatedCategoryName(category) {
      const categoryKey = category.name.toLowerCase().replace(/\s/g, ''); // Normalize the category name to lowercase and remove spaces
      return this.translations[this.currentLanguage].categories[categoryKey] || category.name;
    }
  },
  created() {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
  }
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
    font-family: "Roboto", sans-serif;
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
    height: 4em;
    margin-left: 1em;
    font-size: 13px;
    white-space: nowrap;
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
    margin: 3.5em 1em;
    font-family: "Roboto", sans-serif;
  }

  .category-title {
    position: absolute;
    margin-left: 2em;
    margin-top: 0.8em;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 600;
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
    height: 3em;
    margin-left: 1em;
    white-space: nowrap;
  }

  .category-image {
    width: 2em;
    height: 2em;
    object-fit: cover;
    filter: invert(100%) sepia(2%) saturate(0%) hue-rotate(33deg) brightness(110%) contrast(1100%);
  }
}
</style>
