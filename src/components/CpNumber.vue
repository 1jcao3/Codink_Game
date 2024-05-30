<template>
    <div>
    <h1 v-for="item in cpNumber" :key="item">{{ item }} </h1>
</div>
</template>

<script setup>

import {inject} from 'vue'

const cpNumber= inject('cpNumber')



</script>

<style scoped>

div{

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
h1{

    display: flex;
    flex-direction: column;

}
</style>