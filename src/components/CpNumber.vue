<template>
    <div class="numbers">
      <div v-for="(value, index) in displayNumbers" :key="index">
        {{ value }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject, ref, computed, watch } from 'vue';
  
  const correctNumber = inject('correctNumber');
  const injectedCpNumber = inject('cpNumber');
  const cpNumbers = ref(['x', 'x', 'x', 'x']);
  
  // Computed property to determine which numbers to display
  const displayNumbers = computed(() => {
    if (correctNumber.value) {
      return injectedCpNumber.value.slice();
    } else {
      return injectedCpNumber.value.slice();
    }
    
  });
  
  // Watch for changes in the injected cpNumber and update cpNumber accordingly
  watch(injectedCpNumber, (newValue) => {
    cpNumbers.value = newValue.slice();
  });
  
  </script>
  
  <style scoped>
  .numbers {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  
  div {
    margin: 0 5px; /* Adjust spacing between numbers */
  }
  </style>
  