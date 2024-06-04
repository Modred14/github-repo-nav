<template>
  <div class="notfound">
    <div>
      <img class="image2" :src="image" alt="Not found" />
    </div>
    <div class="grid">
      <div class="not-found-container">
        <p class="not-found-title">404</p>
        <p class="not-found-title2">Not Found</p>
        <p class="not-found-message">
          Sorry, the page you are looking for does not exist. Go back to
          <router-link class="not-found-link" to="/">homepage</router-link>.
        </p>
      </div>
      <div>
        <img class="image" :src="image" alt="Not found" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import image from "/src/assets/notfound.png";
</script>

<style scoped>
@import "./NotFound.css";
</style>
