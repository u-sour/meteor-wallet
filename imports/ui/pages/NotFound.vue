<template>
  <div class="text-center">
    <h1>404 Page Not Found.</h1>
    <MDBBtn color="dark" @click="goHome">Go Home</MDBBtn>
  </div>
</template>

<script setup lang="ts">
import { MDBBtn } from 'mdb-vue-ui-kit';
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => router.push({ name: 'home' });
</script>

<style scoped></style>
