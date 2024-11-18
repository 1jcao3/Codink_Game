import { createApp } from 'vue';
import App from './App.vue';
import { LockIcon } from 'vue-feather-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.component('LockIcon', LockIcon);

// Register the v-limit-input directive
app.directive('limit-input', {
  mounted(el, binding) {
    el.addEventListener('keydown', (event) => {
      // Allow control keys such as backspace, tab, etc.
      const permittedKeys = ['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'];
      if (permittedKeys.includes(event.key) || (event.ctrlKey && event.key === 'v')) {
        return; // Allow these keys
      }

      // Prevent any key that's not a number
      if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
      }
    });

    el.addEventListener('input', (event) => {
      const inputElement = event.target;
      const { index, length, refs, compare, numbers,emitIconState } = binding.value;

      // Limit the input to a single character
      if (inputElement.value.length > 1) {
        inputElement.value = inputElement.value.slice(0, 1);
      }

      // Focus the next input if the value has a character
      if (inputElement.value.length === 1 && index < length - 1) {
        refs[index + 1].focus();
      }

      // If the last input is full, call the comparison function
      if (index === 3 && inputElement.value.length === 1) {
        compare(numbers);
        emitIconState(numbers);
        numbers.fill(null);
        refs.forEach((inputElement, idx) => {
          inputElement.value = '';
          if (idx === 0) {
            inputElement.focus();
          }
        });
      }
    });
  }
});

// Register the v-handle-key directive
app.directive('handle-key', {
  mounted(el, binding) {
    el.addEventListener('keydown', (event) => {
      const { index, refs } = binding.value;
      if (event.key === "Backspace" && el.value.length === 0 && index > 0) {
        refs[index - 1].focus();
        event.preventDefault();
      }
      if (event.key === "ArrowLeft" && index > 0) {
        refs[index - 1].focus();
        event.preventDefault();
      }
      if (event.key === "ArrowRight" && index < refs.length - 1) {
        refs[index + 1].focus();
        event.preventDefault();
      }
      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
      }
    });
  }
});

app.mount('#app');
