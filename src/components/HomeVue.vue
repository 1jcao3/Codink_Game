<template>
  <div class="todo">
    <h1>Adivina el code</h1>
    <CpNumber></CpNumber>
    <BoxNumbers></BoxNumbers>
    <StartButton></StartButton>
  </div>
</template>

<script setup>
import CpNumber from "./CpNumber.vue";
import StartButton from "./StartButton.vue";
import BoxNumbers from "./BoxNumbers.vue";
import { provide, ref } from 'vue';

const cpNumber = ref(["x", "x", "x", "x"]);
const contador=ref(0)
const correctNumber=ref(false);
const createNumbers = () => {
 
  if(correctNumber.value||contador.value==0){
    
    const cpNewsNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    
    cpNumber.value.splice(0, cpNumber.value.length, ...cpNewsNumbers);

    contador.value=1;
    console.log("nextnumber");
    correctNumber.value=false
  }
 
};

provide('cpNumber', cpNumber);
provide('createNumbers', createNumbers);
provide('correctNumber' ,correctNumber)
</script>

<style scoped>
.todo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
</style>
