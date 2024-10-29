<template>
  <div class="sushi-item">
    <img :src="item.image" :alt="item.name" class="sushi-img" />
    <p>{{ item.name }}</p>
    <p>€ {{ item.price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style scoped>
.sushi-item {
  background-color: #333;
  color: white;
  width: 100px;
  text-align: center;
  margin: 10px;
  border-radius: 10px;
}
.sushi-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
