<!-- 
This component is the root of the application.
It contains the <CpNumber>, <BoxNumbers> and <StartButton> components.
The <CpNumber> component displays the numbers that the user has to guess.
The <BoxNumbers> component is where the user inputs the numbers.
The <StartButton> component is used to generate the numbers and start the game.
-->

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

const defaultNumbers = ref(["x", "x", "x", "x"]);
const counter=ref(0)
const iscorrectNumber=ref(false);

 /*
Function: createNumbers()
Explanation: This function generates a new set of 4 random numbers and updates the defaultNumbers variable with the new numbers.
It checks if the user has already guessed the numbers and if the counter is 0, it generates a new set of numbers.
Otherwise, it doesn't do anything and the user has to guess the numbers again.
*/
const createNumbers = () => {
 
  if(iscorrectNumber.value||counter.value==0){
    
    // We create an array of 4 elements and fill it with random numbers from 0 to 9
    const cpNewsNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
    // The splice() method changes the contents of an array by removing or adding new elements
    // Here it is used to replace the current elements of defaultSymbols with the newly generated numbers
    defaultNumbers.value.splice(0, defaultNumbers.value.length, ...cpNewsNumbers);
    counter.value=1;
    iscorrectNumber.value=false
  }
 
};

provide('defaultNumbers', defaultNumbers);
provide('createNumbers', createNumbers);
provide('iscorrectNumber' ,iscorrectNumber)
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
