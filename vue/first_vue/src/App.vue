<script setup>
import { ref } from 'vue';
const firstName = ref('Mohit')
const lastName = ref('Katare')
const myFavoriteNumber = ref(7)
import MyComponent from './components/MyComponent.vue';
import ChangingProps from './components/ChangingProps.vue';
import DynamicPropsComponent from './components/DynamicPropsComponent.vue';
</script>

<template>
  <MyComponent name="Jordan" />
  <DynamicPropsComponent :firstName="firstName" :lastName="lastName" />
  <hr /><hr /> <br>
  <ChangingProps :myFavoriteNumber="myFavoriteNumber " />
</template>

<style scoped></style>