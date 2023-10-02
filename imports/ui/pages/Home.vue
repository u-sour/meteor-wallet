<template>
  <Header />
  <MDBContainer xl>
    <Wallet />
    <ContactForm />
    <ContactList />
  </MDBContainer>
</template>

<script setup lang="ts">
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import ContactForm from '../components/ContactForm.vue';
import ContactList from '../components/ContactList.vue';
import Header from '../components/Header.vue';
import Wallet from '../components/Wallet.vue';
</script>

<style scoped></style>
