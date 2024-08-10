<template>
   <button @click="generateNumbers">Generar Números</button>
 </template>
 
 <script setup>
 import { inject } from 'vue';
 
 const createNumbers = inject('createNumbers');
 
 const generateNumbers = () => {
   createNumbers(); // Llamamos a la función para generar nuevos números
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
 