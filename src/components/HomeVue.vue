<!-- 
This component is the root of the application.
It contains the <CpNumber>, <BoxNumbers> and <StartButton> components.
The <CpNumber> component displays the numbers that the user has to guess.
The <BoxNumbers> component is where the user inputs the numbers.
The <StartButton> component is used to generate the numbers and start the game.
-->

<template>
  <div class="todo">
    <div class="title" >
      <h1>Guess The Code</h1>
      <i class="bi bi-circle-fill" :style="{color: iconStateDefault}"	></i>
    
    </div>
   
    <CpNumber ></CpNumber>
    <BoxNumbers @iconState="updateIconState" @onStartGame="updateStartGame" @updateButtonState="updateClickState" :clickState="clickState" :startGame="startGame " :iconState="iconStateDefault"></BoxNumbers>
    <StartButton @onClickState="updateClickState" @onStartGame="updateStartGame"></StartButton>
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
const clickState=ref(null);
const startGame = ref(null);
const iconStateDefault = ref("#007BFF");
const ableToChangeNumber=ref(null);
const updateIconState=(newIconState)=>{
  iconStateDefault.value=newIconState;
}

const updateClickState=(newValue)=>{

  console.log("recieving event",!newValue);

 
  clickState.value=newValue;

}
const updateStartGame=(newStartGame)=>{
  console.log("reciving game",newStartGame);
  startGame.value=newStartGame;
}


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
    ableToChangeNumber.value=false;
    

  }


};

provide('ableToChangeNumber',ableToChangeNumber);
provide('defaultNumbers', defaultNumbers);
provide('createNumbers', createNumbers);
provide('iscorrectNumber' ,iscorrectNumber)
provide('counter',counter)
</script>

<style scoped>
.todo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  width: 500px;
  height: 500px;
}
.icon{

  width: 100px;
  height: 100px;  
}
.title{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
h1{
  font-size: 30px;
}

@media screen and (max-width: 600px) {

  .todo {
    width: 300px;
    height: 500px;
  }
  
}
</style>
