<template>
  <div>
    <!-- Sushi category title -->
    <h2>{{ subcategory.name }}</h2>

    <!-- Loading and Error Messages -->
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <!-- Product list -->
    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-item">
        <SushiItem :item="product" />
      </div>
    </div>
  </div>
</template>

<script>
import SushiItem from "@/components/SushiItemComponent.vue";

export default {
  components: {
    SushiItem,
  },
  props: {
    subcategory: {
      type: Object,
      required: true,
    },
    filteredProducts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.product-item {
  width: 20%;
  text-align: center;
}
</style>