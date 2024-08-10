<template>
  <div class="input">
    <input 
      v-for="(value, index) in numbers" 
      :key="index" 
      type="number" 
      step="1" 
      v-model="numbers[index]"
      @input="handleInput(index, $event)" 
      @keydown="handleKeydown(index, $event)" 
      ref="input">
  </div>

  <div class="box" v-if="newNumbers.length">
    <ul v-for="(numbers1, idx) in newNumbers" :key="idx">
      <li>{{ numbers1[0] }} {{ numbers1[1] }} {{ numbers1[2] }} {{ numbers1[3] }}</li>
    </ul>
  </div>

  <div class="answer">
    {{ text }}
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';

const numbers = ref([null, null, null, null]);
const input = ref([]);
const cpNumber = inject('cpNumber');
const newNumbers = ref([]);
const text = ref("comienza");
let clean = ref(false);
let correctNumber = inject('correctNumber');

const compare = (numbers) => {
  let matchCount = 0;
  let totalMatch = 0;
  let cpNumberArray = cpNumber.value.map(Number);
  let cpNumberCount = {};

  // Contar la cantidad de cada número en cpNumberArray
  cpNumberArray.forEach(num => {
    cpNumberCount[num] = (cpNumberCount[num] || 0) + 1;
  });

  // Contar las coincidencias en numbers
  numbers.forEach(num => {
    num = parseInt(num);
    if (cpNumberCount[num] && cpNumberCount[num] > 0) {
      totalMatch++;
      cpNumberCount[num]--;
    }
  });

  // Contar las coincidencias exactas en la posición
  numbers.forEach((num, index) => {
    num = parseInt(num);
    if (cpNumberArray[index] === num) {
      matchCount++;
    }
  });

  if (totalMatch > 0) {
    newNumbers.value.push(numbers.slice());
    text.value = `coinciden ${totalMatch} número${totalMatch > 1 ? 's' : ''}`;
  } else {
    newNumbers.value.push(numbers.slice());
    correctNumber.value = false;
    text.value = "no coinciden números";
  }

  if (matchCount === 4) {
    correctNumber.value = true;
    clean.value = true;
    if (clean.value) {
      newNumbers.value = [];
      text.value = "lo lograste";
    }
  }
};

const handleInput = (index, event) => {
  const inputElement = event.target;

  if (event.inputType === "insertText" && event.data) {
    if (event.data.length > 1 || event.data === "e") {
      inputElement.value = "";
      event.preventDefault();
      return;
    }
  }

  // Limitar la entrada a un carácter
  if (inputElement.value.length > 1) {
    inputElement.value = inputElement.value.slice(0, 1);
  }

  // Actualizar el valor en numbers
  numbers.value[index] = inputElement.value;

  // Mover el foco al siguiente input si el valor tiene un carácter
  if (inputElement.value.length === 1 && index < numbers.value.length - 1) {
    input.value[index + 1].focus();
  }

  // Si se llena el último input, comparar y reiniciar
  if (index === 3 && inputElement.value.length === 1) {
    compare(numbers.value);
    numbers.value = [null, null, null, null];
    input.value.forEach((inputElement, idx) => {
      inputElement.value = '';
      if (idx === 0) {
        inputElement.focus();
      }
    });
  }
};

const handleKeydown = (index, event) => {
  // Verifica si el evento está definido
  if (!event) {
    console.error('Event is undefined');
    return;
  }

  const focusedInput = document.activeElement;

  if (event.key === "Backspace" || event.keyCode === 8) {
    if (focusedInput.value.length === 0 && index > 0) {
      // Mueve el foco al input anterior si el actual está vacío
      input.value[index - 1].focus();
      event.preventDefault();
    } else {
      // Borra el carácter si hay algo en el campo
      focusedInput.value = focusedInput.value.slice(0, -1);
      event.preventDefault(); // Evita el comportamiento predeterminado
    }
  }

  if (event.key === "ArrowLeft" || event.keyCode === 37) {
    if (index > 0) {
      // Mueve el foco al input anterior
      input.value[index - 1].focus();
      event.preventDefault();
    }
  }

  if (event.key === "ArrowRight" || event.keyCode === 39) {
    if (index < input.value.length - 1) {
      // Mueve el foco al siguiente input
      input.value[index + 1].focus();
      event.preventDefault();
    }
  }

  if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.keyCode === 38 || event.keyCode === 40) {
    event.preventDefault(); // Evita que el cursor se mueva
  }
};
</script>




<style scoped>
.input {

  display: flex;
  flex-direction: row;

}

input {

  width: 25px;
}

/* Eliminar flechas en navegadores webkit (Chrome, Safari, Edge) */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

ul {

  text-decoration: none;
}
</style>