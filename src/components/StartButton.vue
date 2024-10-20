<!-- 
This component displays a button that will generate new numbers when clicked.
The button is disabled if the user has already guessed the numbers.
The function createNumbers is injected from the parent component and is used to generate the new numbers.
-->
<template>
   <button @click="generateNumbers">Generar Números</button>
 </template>
 
 <script setup>
 import { inject } from 'vue';
 
 const createNumbers = inject('createNumbers');
 
 const generateNumbers = () => {
   createNumbers(); // Call the function to generate new numbers
 };
 
 </script>
 
 <style scoped>
 button {
   padding: 10px 20px;
   background-color: #007BFF;
   color: white;
   border: none;
   cursor: pointer;
 }
 
 button:hover {
   background-color: #0056b3;
 }
 </style>
 