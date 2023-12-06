<template>
  <div class="m-5">
    <h3>Remove Transaction</h3>
    <MDBRow
      tag="form"
      class="g-3 needs-validation text-center"
      novalidate
      @submit.prevent="submit"
    >
      <MDBCol md="12">
        <MDBInput
          label="Transaction ID"
          type="text"
          v-model="form.transactionId"
          invalidFeedback="Please provide your transaction ID"
          required
        />
      </MDBCol>
      <MDBCol col="12">
        <MDBBtn color="light" :onclick="back">Back to Home</MDBBtn>
        <MDBBtn color="dark" type="submit">Remove</MDBBtn>
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
let form = reactive({ transactionId: '' });
const submit = (event: Event) => {
  if (form.transactionId == '') {
    event.target.classList.add('was-validated');
  } else {
    const { transactionId } = form;
    Meteor.call('transactions.remove', transactionId, (error) => {
      if (error) {
        return alert(error);
      }
      form.transactionId = '';
      console.log('transaction is removed.');
    });
  }
};

const back = () => router.back();
</script>

<style scoped></style>
