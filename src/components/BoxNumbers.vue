<!-- 
This component is where the user inputs the numbers.
It receives a prop called "cpNumber" which is an array of 4 numbers.
The user inputs the numbers in the input fields and the component will compare the numbers with the cpNumber.
If the numbers match, it will display the numbers in a box.
If not, it will show a message saying that the numbers don't match.
-->
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
      <li>
        {{ numbers1[0] }} {{ numbers1[1] }} {{ numbers1[2] }} {{ numbers1[3] }} -----
        <span>{{ countTotalMatch(numbers1) }}</span>
      </li>
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
const defaultNumbers = inject('defaultNumbers');
const newNumbers = ref([]);
const text = ref("comienza");
let clean = ref(false);
let iscorrectNumber = inject('iscorrectNumber');

/**
 * This function takes an array of numbers and compares it with the cpNumber (the
 * correct numbers to guess). It counts how many numbers match and returns that
 * count. It also updates the cpNumberCount object with the numbers that have been
 * guessed correctly.
 * 
**/
const countTotalMatch = (numbersArray) => {
  let totalMatch = 0;
  
  let cpNumberArray = defaultNumbers.value.map(Number);
  let cpNumberCount = {};

  cpNumberArray.forEach(num => {
    cpNumberCount[num] = (cpNumberCount[num] || 0) + 1;
  });

  numbersArray.forEach(num => {
    num = parseInt(num);
    if (cpNumberCount[num] && cpNumberCount[num] > 0) {
      totalMatch++;
      cpNumberCount[num]--;
    }
  });

  return totalMatch;
};

/**
 * This function compares the numbers that the user has entered with the
 * correct numbers to guess. It counts how many numbers match and in which
 * position they are. It also updates the cpNumberCount object with the
 * numbers that have been guessed correctly. The cpNumberCount object is
 * used to keep track of how many times each number appears in the correct
 * numbers to guess.
 * 
 * The function returns the count of numbers that match in the correct
 * position and the count of numbers that match but not in the correct
 * position.
 * 
 * 
 **/

const compare = (numbers) => {
  let matchCount = 0;
  let totalMatch = 0;
  
  let cpNumberArray = defaultNumbers.value.map(Number);
  let cpNumberCount = {};

  cpNumberArray.forEach(num => {
    cpNumberCount[num] = (cpNumberCount[num] || 0) + 1;
  });

  numbers.forEach(num => {
    num = parseInt(num);
    if (cpNumberCount[num] && cpNumberCount[num] > 0) {
      totalMatch++;
      cpNumberCount[num]--;
    }
  });

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
    iscorrectNumber.value = false;
    text.value = "no coinciden números";
  }

  if (matchCount === 4) {
    iscorrectNumber.value = true;
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

  // Limit input to one character
  if (inputElement.value.length > 1) {
    inputElement.value = inputElement.value.slice(0, 1);
  }

  // Update the value in numbers
  numbers.value[index] = inputElement.value;

  // Move focus to next input if the value has one character
  if (inputElement.value.length === 1 && index < numbers.value.length - 1) {
    input.value[index + 1].focus();
  }

  // If the last input is filled, compare and reset
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
  // Check if the event is defined
  if (!event) {
    console.error('Event is undefined');
    return;
  }

  const focusedInput = document.activeElement;

  if (event.key === "Backspace" || event.keyCode === 8) {
    if (focusedInput.value.length === 0 && index > 0) {
      // Move focus to the previous input if the current one is empty
      input.value[index - 1].focus();
      event.preventDefault();
    } else {
      // Delete the character if there is something in the field
      focusedInput.value = focusedInput.value.slice(0, -1);
      event.preventDefault(); // Prevent default behavior
    }
  }

  if (event.key === "ArrowLeft" || event.keyCode === 37) {
    if (index > 0) {
      // Move focus to the previous input
      input.value[index - 1].focus();
      event.preventDefault();
    }
  }

  if (event.key === "ArrowRight" || event.keyCode === 39) {
    if (index < input.value.length - 1) {
      // Move focus to the next input
      input.value[index + 1].focus();
      event.preventDefault();
    }
  }

  if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.keyCode === 38 || event.keyCode === 40) {
    event.preventDefault(); // Prevent cursor movement
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

/* Remove arrows in webkit browsers (Chrome, Safari, Edge) */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

ul {

  text-decoration: none;
  

}
</style>
