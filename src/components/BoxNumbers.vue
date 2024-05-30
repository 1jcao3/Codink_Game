<template>

    <div class="input">
    <input v-for="(value,index) in numbers  " :key="index" type="number" v-model="numbers[index] "
     @input="handleInput(index,$event)" ref="input">
    </div>

    
</template>

<script setup>

import {ref} from 'vue'

const numbers=ref([null,null,null,null])
const input=ref([])

const handleInput=(index,event)=>{

        if(event.target.value.length>=1 && event.target.value.length<=10 && index <numbers.value.length-1  ){

            input.value[index + 1].focus();

        }
}
</script>

<style scoped>

.input{

    display: flex;
    flex-direction: row;
   
}
input{

    width: 25px;
}
</style>