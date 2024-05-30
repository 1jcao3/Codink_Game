<template>
    <div class="todo">
    <h1>hola mundo</h1>
   
    <CpNumber></CpNumber>
    <BoxNUmber></BoxNUmber>
    <StartButton ></StartButton>
</div>
</template>

<script setup>
import CpNumber from "./CpNumber"
import StartButton from "./StartButton"
import BoxNUmber from "./BoxNumbers"
import { provide,ref}from 'vue'
   

const cpNumber=ref(["x","x","x","x"])


const createNumbers=()=>{

    
    const cpNewsNumbers=[Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10),Math.round(Math.random()*10)]
   
    
    cpNumber.value=cpNewsNumbers
   

}
provide('cpNumber',cpNumber)
provide('createNumbers',createNumbers)
</script>

<style scoped>

.todo{

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
}

</style>