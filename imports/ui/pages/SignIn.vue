<template>
  <div class="m-5">
    <h3>Sign In</h3>
    <div class="text-center">
      <MDBRow
        tag="form"
        class="g-3 needs-validation"
        novalidate
        @submit.prevent="submit"
      >
        <MDBCol md="12">
          <MDBInput
            label="username"
            type="text"
            v-model="form.username"
            invalidFeedback="Please provide your username"
            required
          />
        </MDBCol>
        <!-- <MDBCol md="12">
          <MDBInput
            label="Email"
            type="email"
            v-model="form.email"
            invalidFeedback="Please provide your email"
            required
          />
        </MDBCol> -->
        <MDBCol md="12">
          <MDBInput
            label="Password"
            type="password"
            v-model="form.password"
            invalidFeedback="Please provide your password"
            aria-autocomplete="off"
            required
          />
        </MDBCol>

        <MDBCol col="12 d-flex justify-content-between">
          <MDBBtn color="dark" type="submit">Sign In</MDBBtn>
          <router-link :to="{ name: 'reset-password' }">
            Forgot password ?</router-link
          >
        </MDBCol>
        <MDBCol>
          <span
            >Don't have an account ?
            <span
              ><router-link :to="{ name: 'sign-up' }">
                create account
              </router-link></span
            ></span
          >
        </MDBCol>
      </MDBRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import { reactive } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { router } from '../router';
const authStore = useAuthStore();
let form = reactive({ username: '', password: '' });
const submit = async (event: Event) => {
  if (form.username == '' || form.password == '') {
    event.target.classList.add('was-validated');
  } else {
    try {
      await authStore.singIn(form);
      form.username = '';
      form.password = '';
      router.push({ name: 'home' });
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped></style>
