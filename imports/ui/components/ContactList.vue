<template>
  <div v-if="isLoading">
    <ul>
      <li v-for="c in contacts" :key="c._id">
        <p>{{ c.name }} <button @click="remove(c._id)">X</button></p>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Loading ...</p>
  </div>
</template>

<script setup lang="ts">
import { Meteor } from 'meteor/meteor';
import { subscribe, autorun } from 'vue-meteor-tracker';
import { ContactsCollection } from '../../api/ContactsCollection';
const isLoading = subscribe('allContacts');
const contacts = autorun(() => ContactsCollection.find().fetch()).result;
const remove = (id: string) => Meteor.call('contact.remove', id);
</script>

<style scoped></style>
