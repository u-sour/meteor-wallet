<template>
  <h6 class="bg-light p-2 border-top border-bottom col-12 col-lg-6 m-auto">
    <MDBIcon icon="address-book"></MDBIcon> Contact List
  </h6>
  <MDBListGroup light v-if="isLoading">
    <MDBListGroupItem
      class="d-flex justify-content-between align-items-center col-12 col-lg-6 m-auto"
      v-for="c in contacts"
      :key="c._id"
    >
      <MDBCard class="w-100">
        <MDBCardBody>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img
                :src="c.imageUrl"
                alt=""
                style="width: 45px; height: 45px"
                class="rounded-circle"
              />
              <div class="ms-3">
                <p class="fw-bold mb-1">{{ c.name }}</p>
                <p class="text-muted mb-0">{{ c.email }}</p>
              </div>
            </div>
            <a
              class="btn btn-danger btn-rounded btn-sm"
              role="button"
              @click="remove(c._id)"
              >Remove</a
            >
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBListGroupItem>
  </MDBListGroup>
  <div class="d-flex justify-content-center" v-else>
    <MDBSpinner />
  </div>
</template>

<script setup lang="ts">
import {
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBSpinner,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-vue-ui-kit';
import { Meteor } from 'meteor/meteor';
import { subscribe, autorun } from 'vue-meteor-tracker';
import { ContactsCollection } from '../../api/ContactsCollection';
const isLoading = subscribe('allContacts');
const contacts = autorun(() => ContactsCollection.find().fetch()).result;
console.log('🚀 ~ file: ContactList.vue:20 ~ contacts:', contacts.value);
const remove = (id: string) => Meteor.call('contact.remove', id);
</script>

<style scoped></style>
