<template>
  <form @submit.prevent="submit">
    <div>
      <label htmlFor="name">Name</label>
      <input id="name" v-model="form.name" type="text" />
    </div>
    <div>
      <label htmlFor="name">Email</label>
      <input id="email" v-model="form.email" type="email" />
    </div>
    <div>
      <label htmlFor="imgUrl">Image URL</label>
      <input id="imgUrl" v-model="form.imageUrl" type="text" />
    </div>
    <div>
      <button>Save Contact</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { reactive } from 'vue';
import Contact from '../../types/Contact';

const initForm = { name: '', email: '', imageUrl: '' };
const form = reactive<Contact>(initForm);
const submit = () => {
  Meteor.call('contact.insert', form, (errorResponse) => {
    if (errorResponse) {
      alert(errorResponse.error);
    }
  });
  form.name = '';
  form.email = '';
  form.imageUrl = '';
};
</script>

<style scoped></style>
