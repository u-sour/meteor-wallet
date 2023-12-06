<script setup>
import { Meteor } from 'meteor/meteor';
import { MDBContainer } from 'mdb-vue-ui-kit';
import Header from './components/Header.vue';
import { useAuthStore } from './stores/authStore';
import { autorun } from 'vue-meteor-tracker';
import { watch } from 'vue';
const authStore = useAuthStore();
const userId = autorun(() => Meteor.userId()).result;

watch(
  () => userId.value,
  (newUserId) => {
    // isLogged.value = !!newUserId
    authStore.setUser(newUserId);
  },
  { immediate: true },
);
</script>

<template>
  <Header />
  <MDBContainer xl>
    <router-view />
  </MDBContainer>
</template>
