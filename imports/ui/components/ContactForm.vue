<template>
  <MDBRow class="my-3">
    <MDBCol col="12" lg="6" class="m-auto">
      <BaseAlert :alert="alertProps" />
      <form @submit.prevent="submit">
        <!-- Name input -->
        <MDBInput
          type="text"
          label="Name"
          id="name"
          v-model="form.name"
          wrapperClass="mb-4"
        />

        <!-- Email input -->
        <MDBInput
          type="email"
          label="Email address"
          id="email"
          v-model="form.email"
          wrapperClass="mb-4"
        />
        <!-- ImageUrl input -->
        <MDBInput
          type="url"
          label="Image Url"
          id="imageUrl"
          v-model="form.imageUrl"
          wrapperClass="mb-4"
        />
        <!-- Name input -->
        <MDBInput
          type="text"
          label="Wallet ID"
          id="wallet-id"
          v-model="form.walletId"
          wrapperClass="mb-4"
        />
        <!-- Submit button -->
        <MDBBtn type="submit" color="dark" block class="mb-4"> Save </MDBBtn>
      </form>
    </MDBCol>
  </MDBRow>
</template>

<script setup lang="ts">
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-vue-ui-kit';
import BaseAlert from './alert/BaseAlert.vue';
import { Meteor } from 'meteor/meteor';
import { reactive, ref } from 'vue';
//types
import Contact from '../../types/Contact';
import Alert from '../../types/Alert';

const initForm = {
  name: '',
  email: '',
  imageUrl: '',
  walletId: '',
  createdAt: new Date(),
};
const alertProps = ref<Alert>();
const form = reactive<Contact>(initForm);
const submit = () => {
  Meteor.call('contact.insert', form, (errorResponse: any) => {
    if (errorResponse) {
      alertProps.value = { msg: errorResponse.error, type: 'error' };
    } else {
      alertProps.value = {
        msg: 'Contact is saved successfully.',
        type: 'success',
      };
      form.name = '';
      form.email = '';
      form.imageUrl = '';
      form.walletId = '';
      form.createdAt = new Date();
    }
    setTimeout(() => {
      alertProps.value = undefined;
    }, 3000);
  });
};
</script>

<style scoped></style>
