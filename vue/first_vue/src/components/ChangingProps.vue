<script setup>
const myFavoriteNumberProps = defineProps(['myFavoriteNumber'])


</script>


<template>
    <h1>{{ myFavoriteNumberProps.myFavoriteNumber }} </h1>
</template>