<template>
  <button @click="generateNumbers(); emitOnclickState()">Start</button>
</template>

<script setup>

import { inject, ref,getCurrentInstance  } from 'vue';


const startGame = ref(true);
const createNumbers = inject('createNumbers');
const iscorrectNumber = inject('iscorrectNumber');
const counter = inject('counter');
const {proxy}=getCurrentInstance();
const clickState = ref(false);


let isAbletoGenerate = ref(false);

const generateNumbers = () => {

  if (iscorrectNumber.value === true || counter.value === 0) {
    createNumbers();
    startGame.value = false;
    console.log("startgame",startGame.value);
    isAbletoGenerate.value = false;
  } 
 

  else {
    isAbletoGenerate.value = true;
    startGame.value = true;
    setTimeout(() => {
      isAbletoGenerate.value = false;
    }, 3000);
  }
  if(iscorrectNumber.value ){
   startGame.value = false; 
  }
};

const emitOnclickState =()=>{

  proxy.$emit('onClickState',!clickState.value);
  
  proxy.$emit('onStartGame',startGame.value);
  console.log("emitting events",!clickState.value,startGame.value);

}



</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
