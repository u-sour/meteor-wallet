<template>
  <MDBNavbar light bg="light" container>
    <MDBNavbarBrand href="#" @click="home"
      ><img
        src="https://www.vectorlogo.zone/logos/meteor/meteor-icon.svg"
        height="30"
        alt=""
        loading="lazy"
      />
      Meteor Wallet</MDBNavbarBrand
    >
    <div class="d-flex input-group w-auto">
      <MDBBtn outline="dark" @click="signOut" v-if="currentUser?._id"
        >Sign Out</MDBBtn
      >
      <MDBBtn outline="dark" @click="signIn" v-else>Sign In</MDBBtn>
    </div>
  </MDBNavbar>
</template>

<script setup lang="ts">
import { MDBNavbar, MDBNavbarBrand, MDBBtn } from 'mdb-vue-ui-kit';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { computed } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const currentUser = computed(() => authStore.user);

const home = () => router.push({ name: 'home' });
const signIn = () => router.push({ name: 'sign-in' });
const signOut = () => {
  Meteor.logout((error) => {
    if (error) console.log(error);
    router.push({ name: 'sign-in' });
  });
};
</script>

<style scoped></style>
