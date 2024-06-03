<template>
  <div v-if="hasError" class="Wentwrong">
    <h2>⚠️ Something went wrong ⚠️</h2>
    <p>
      Sorry, something went wrong. Please click the 'Reload' button to reload or
      click on 'Details' to see the error details. If the problem persists,
      check your internet connection or contact support for assistance.
    </p>
    <details style="white-space: pre-wrap">
      <div v-if="error">{{ error.toString() }}</div>
      <div v-if="errorInfo">{{ errorInfo }}</div>
    </details>
    <button class="Reload" @click="reloadPage">Reload</button>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';

const hasError = ref(false);
const error = ref(null);
const errorInfo = ref(null);

const reloadPage = () => {
  window.location.reload();
};

onErrorCaptured((err, instance, info) => {
  hasError.value = true;
  error.value = err;
  errorInfo.value = info;
  console.error('Uncaught error:', err, info);
  return false; // Prevent further propagation
});
</script>

<style scoped>
@import './Error.css';
</style>
