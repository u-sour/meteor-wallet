<template>
  <div class="m-5">
    <h3>Reset Password</h3>
    <MDBRow
      tag="form"
      class="g-3 needs-validation text-center"
      novalidate
      @submit.prevent="submit"
    >
      <MDBCol md="12">
        <MDBInput
          label="Email"
          type="email"
          v-model="form.email"
          invalidFeedback="Please provide your email"
          required
        />
      </MDBCol>
      <MDBCol col="12">
        <MDBBtn color="light" :onclick="back">Back to Access</MDBBtn>
        <MDBBtn color="dark" type="submit">Send Reset Link</MDBBtn>
      </MDBCol>
    </MDBRow>
  </div>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
let form = reactive({ email: '' });
const submit = (event: Event) => {
  if (form.email == '') {
    event.target.classList.add('was-validated');
  } else {
    const { email } = form;
    Accounts.forgotPassword({ email }, (error) => {
      if (error) {
        console.log(error.message);
        return;
      }
      form.email = '';
    });
  }
};

const back = () => router.back();
</script>

<style scoped></style>
