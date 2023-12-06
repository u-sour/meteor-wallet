<template>
  <div class="m-5">
    <h3>Sign Up</h3>
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
        <MDBCol md="12">
          <MDBInput
            label="Email"
            type="email"
            v-model="form.email"
            invalidFeedback="Please provide your email"
            required
          />
        </MDBCol>
        <MDBCol md="12">
          <MDBInput
            label="Password"
            type="password"
            v-model="form.password"
            invalidFeedback="Please provide your password"
            required
          />
        </MDBCol>

        <MDBCol col="12">
          <MDBBtn color="light" :onclick="back">Back to Access</MDBBtn>
          <MDBBtn color="dark" type="submit">Sign Up</MDBBtn>
        </MDBCol>
      </MDBRow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
let form = reactive({ username: '', email: '', password: '' });
const submit = (event: Event) => {
  if (form.username == '' || form.email == '' || form.password == '') {
    event.target.classList.add('was-validated');
  } else {
    const { username, email, password } = form;
    Meteor.call('acc.createUser', form, (error: any) => {
      if (error) {
        console.log(error.message);
      } else {
        form = { username: '', email: '', password: '' };
        router.push({ name: 'sign-in' });
      }
    });
  }
};

const back = () => router.back();
</script>

<style scoped></style>
