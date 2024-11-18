<!-- 
This component is where the user inputs the numbers.
It receives a prop called "cpNumber" which is an array of 4 numbers.
The user inputs the numbers in the input fields and the component will compare the numbers with the cpNumber.
If the numbers match, it will display the numbers in a box.
If not, it will show a message saying that the numbers don't match.
-->
<template>
  <div class="input">

    
    <input v-show="show" v-for="(value, index) in numbers" :key="index" type="number" step="1" v-model="numbers[index]"
      v-limit-input="{ index, length: numbers.length, refs: input, compare, numbers, emitIconState }"
      v-handle-key="{ index, refs: input }" ref="input">

  </div>

  <div class="box" v-show="newNumbers.length" ref="scrollContainer">
    <ul v-for="(numbers1, idx) in newNumbers" :key="idx">
      <li>
        {{ numbers1[0] }} {{ numbers1[1] }} {{ numbers1[2] }} {{ numbers1[3] }} -----
        <span>{{ countTotalMatch(numbers1) }}</span>


      </li>
    </ul>
  </div>

  <div class="answer" ref="textDiv">
    {{ text }}
  </div>
</template>

<script setup>


import { inject, ref, getCurrentInstance, watch, nextTick, defineProps, toRef } from 'vue';

const numbers = ref([null, null, null, null]);
const input = ref([]);
const defaultNumbers = inject('defaultNumbers');
const newNumbers = ref([]);
const text = ref("play the button to start");
const textDiv = ref(null);
let clean = ref(false);
let iscorrectNumber = inject('iscorrectNumber');
let iconState = ref("#007BFF");
let show=ref(false);

// The getCurrentInstance() function returns the current active instance, which is
// the component instance that is currently being rendered. The proxy property of
// the instance is a proxy object that allows us to access the properties and
// methods of the component without having to use this.$root or this.$parent.
const { proxy } = getCurrentInstance();
const scrollContainer = ref(null);

const props = defineProps({
  clickState: {
    type: Boolean,
    default: false

  },
  startGame: {
    type: Boolean,
    default: false
  },
  iconState: {
    type: String,
    default: "#007BFF"
  }
});
const clickState = toRef(props, "clickState");
const startGame = toRef(props, "startGame");


watch([clickState, startGame], ([click, startGame]) => {
  console.log("watching click state", click);
  console.log("watching startGame", startGame);

        if(click &&!startGame){
          iconState.value = "#007BFF";
          proxy.$emit('iconState', iconState.value);
        }

        if(click && !startGame){
          text.value = "start the game";
          show.value=true;
    if (textDiv.value) textDiv.value.style.color = "black";
        }
  if (click && startGame) {
    
    text.value = "Can't start a game until you guess the numbers";
    if (textDiv.value) textDiv.value.style.color = "red";
    setTimeout(() => {
      emitUpdateButtonState(false);
      emitStartGame(true);
    }, 2000);
  } else if (startGame) {
    text.value = "Continue";
    if (textDiv.value) textDiv.value.style.color = "black";
    setTimeout(() => {
      emitUpdateButtonState(false);
      emitStartGame(true);
    }, 2000);
  }
}, { immediate: true });









const emitUpdateButtonState = (state) => {
  proxy.$emit("updateButtonState", state);
};

const emitStartGame = (state) => {
  proxy.$emit("onStartGame", state);
};




/**
 * This function takes an array of numbers and compares it with the cpNumber (the
 * correct numbers to guess). It counts how many numbers match and returns that
 * count. It also updates the cpNumberCount object with the numbers that have been
 * guessed correctly.
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
    text.value = `match ${totalMatch} numbers${totalMatch > 1 ? 's' : ''}`;

  } else {
    newNumbers.value.push(numbers.slice());
    iscorrectNumber.value = false;
    text.value = "no match";

  }

  if (matchCount === 4) {
    iscorrectNumber.value = true;
    clean.value = true;
    if (clean.value) {
      newNumbers.value = [];
      text.value = "you did it!";
      setTimeout(() => {
        text.value = "play the button to start";
       
       
      }, 3000)

    }
  }
};


const emitIconState = (numbers1) => {
  if (countTotalMatch(numbers1) > 0 && countTotalMatch(numbers1) < 4) {
    iconState.value = "yellow";
  } else if (countTotalMatch(numbers1) === 4) {
    iconState.value = "green";

  }
  else if (countTotalMatch(numbers1) === 0) {
    iconState.value = "red";
  }
 
  proxy.$emit('iconState', iconState.value);



};
watch(newNumbers, () => {
  nextTick(() => {


    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;


    }
  });
}, { deep: true });
</script>




<style scoped>
.input {

  display: flex;
  flex-direction: row;

}

input {

  width: 28px;
  height: 28px;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 16px;
  margin-right: 5px;
  outline: none;
  padding: 0;
  box-sizing: border-box;
  background-color: transparent;

}

/* Remove arrows in webkit browsers (Chrome, Safari, Edge) */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.box {

  text-decoration: none;
  max-height: 120px;
  overflow-y: auto;

}
</style>
