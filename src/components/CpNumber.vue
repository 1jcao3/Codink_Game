<!-- 
This component displays the numbers that the user has to guess.
It receives a prop called "numbers" which is an array of 4 numbers.
It displays each number in a separate div.
-->
<template>
    <div class="numbers">
      <div v-for="(value, index) in displayNumbers" :key="index">
        {{ value }}
      </div>
    
    </div>
</template>
  
  <script setup>
  import { inject, ref, computed, watch } from 'vue';
  
  const iscorrectNumber = inject('iscorrectNumber');
  const defaultNumbers = inject('defaultNumbers');
  const defaultSymbols = ref(['x', 'x', 'x', 'x']);
  const ableToChangeNumber = inject('ableToChangeNumber');
  // Computed property to determine which numbers to display
  const displayNumbers = computed(() => {
    if (ableToChangeNumber.value) {
      return defaultSymbols.value.slice();
    } else if (iscorrectNumber.value) {
      return defaultNumbers.value.slice();
    } else {
      return defaultSymbols.value.slice();
    }
    
  });
  
  // Watch for changes in the injected cpNumber and update cpNumber accordingly
  watch(defaultNumbers, (newValue) => {
    defaultSymbols.value = newValue.slice();
  });
  
  </script>
  
  <style scoped>
  .numbers {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 30px;
    color: #007BFF;
  }
  
  div {
    margin: 0 5px; 
  }
  </style>
  