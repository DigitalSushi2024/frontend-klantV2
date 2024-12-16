<template>
  <div v-if="!isOrderPage" class="black-container">
    <CategoryComponents
        @category-selected="handleCategorySelection"
        @switch-language="switchLanguage"

    />
    <div v-if="selectedCategory === 'Sushi'">
      <SushiComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        {{ t.addToCartMessage }}
      </div>
    </div>
    <div v-else-if="selectedCategory === 'Grill'">
      <GrilledComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        {{ t.addToCartMessage }}
      </div>
    </div>
    <div v-else-if="selectedCategory === 'Side Dishes'">
      <DishComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        {{ t.addToCartMessage }}
      </div>
    </div>
    <div v-else-if="selectedCategory === 'Drinks'">
      <DrinkComponent @add-to-cart="addToCart" />
      <div v-if="showNotification" class="notification">
        {{ t.addToCartMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import DishComponent from "@/components/DishComponent.vue";
import GrilledComponent from "@/components/GrilledComponent.vue";
import CategoryComponents from "@/components/CategoryComponents.vue";
import DrinkComponent from "@/components/DrinkComponent.vue";
import SushiComponent from "@/components/SushiComponent.vue";

export default {
  components: {
    CategoryComponents,
    SushiComponent,
    DrinkComponent,
    GrilledComponent,
    DishComponent,
  },
  data() {
    return {
      currentLanguage: "en",
      selectedCategory: null,
      showNotification: false,
      translations: {
        en: {
          addToCartMessage: "Product added to cart!",
          categories: {
            sushi: "Sushi",
            grill: "Grill",
            sideDishes: "Side Dishes",
            drinks: "Drinks",
          },
        },
        nl: {
          addToCartMessage: "Product toegevoegd aan winkelwagen!",
          categories: {
            sushi: "Sushi",
            grill: "Grill",
            sideDishes: "Bijgerechten",
            drinks: "Drankjes",
          },
        },
      },
      /*isOrderPage: false,
      cart: [],*/ // Add cart state
    }
  },
  computed: {
    t() {
      return this.translations[this.currentLanguage];
    }
  },

  methods: {
    handleCategorySelection(category) {
      this.selectedCategory = category;
    },
    addToCart(product) {
      this.$emit("add-to-cart", product);
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 1000);
    },
    switchLanguage(language) {
      this.currentLanguage = language;
      localStorage.setItem("preferredLanguage", language);
    },
  },
  created() {
    // Controleer of er een opgeslagen taalvoorkeur is
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
    }
  },
};
</script>

<style scoped>
.black-container {
  background-color: #010101;
  width: 100%;
  height: 100%;
  margin-top: 0.8em;
  z-index: 2;
  border-radius: 35px 35px 0px 0px;
}
</style>