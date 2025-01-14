<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <ProductListComponent
      :products="filteredProducts"
      :loading="loading"
      :error="error"
      @add-to-cart="$emit('add-to-cart', $event)"
    />
  </div>
</template>

<script>
import ProductListComponent from "@/components/ProductListComponent.vue";

export default {
  components: {
    ProductListComponent,
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
  methods: {
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