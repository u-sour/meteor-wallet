<template>
  <MDBCard
    class="my-3 bg-dark col-12 col-lg-6 m-auto"
    v-if="isLoadingWallet && wallet"
  >
    <MDBRow class="g-0">
      <!-- <MDBCol class="col-3 col-lg-2 my-auto text-center">
        <MDBCardImg
          src="https://randomuser.me/api/portraits/men/51.jpg"
          class="w-75 border border-3 rounded-circle"
          alt="..."
        />
      </MDBCol> -->
      <MDBCol class="col-9 col-lg-10">
        <MDBCardBody>
          <div class="d-flex justify-content-between">
            <div class="row">
              <MDBCardTitle>Main Account</MDBCardTitle>
              <!-- <MDBCardText>
                Username :
                {{ username }}
              </MDBCardText> -->
              <MDBCardText>
                Wallet ID :
                {{ wallet._id }}
              </MDBCardText>
              <MDBCardText>
                <MDBCol class="col-12">
                  <Modal
                    :modal-props="{
                      title: isTransferring
                        ? 'Transferring Money'
                        : 'Add Money',
                      modelValue: isOpen,
                      isTransferring: isTransferring,
                    }"
                    @save="save"
                    @close-modal="toggleModal"
                  >
                    <template v-slot:body>
                      <BaseAlert :alert="alertProps" />
                      <form>
                        <!-- Destination Contact input -->
                        <MDBInput
                          type="text"
                          label="Destination Contact"
                          id="destination-contact"
                          v-model="form.destinationContactId"
                          wrapperClass="mb-4"
                          v-if="isTransferring"
                        />
                        <!-- Amount input -->
                        <MDBInput
                          type="number"
                          label="Amount"
                          id="amount"
                          v-model.number="form.amount"
                          wrapperClass="mb-4"
                        />
                      </form>
                    </template>
                    <template v-slot:buttons>
                      <button class="btn btn-light" @click="addMoney">
                        <MDBIcon icon="plus-circle"></MDBIcon> Add Money
                      </button>
                      <button class="btn btn-light" @click="transferMoney">
                        <MDBIcon icon="minus-circle"></MDBIcon> Transfer Money
                      </button>
                    </template>
                  </Modal>
                </MDBCol>
              </MDBCardText>
            </div>
            <div class="m-auto">
              <MDBCardText>
                <h3 class="text-light">
                  {{ wallet.balance }} {{ wallet.currency }}
                </h3>
              </MDBCardText>
            </div>
          </div>
        </MDBCardBody>
      </MDBCol>
    </MDBRow>
  </MDBCard>
  <div class="my-3 d-flex justify-content-center" v-else>
    <MDBSpinner />
  </div>
</template>

<script setup lang="ts">
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImg,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBInput,
  MDBSpinner,
} from 'mdb-vue-ui-kit';
import BaseAlert from './alert/BaseAlert.vue';
import Modal from '../components/Modal.vue';
import { ref, reactive, onMounted, computed } from 'vue';
import { Meteor } from 'meteor/meteor';
import { subscribe, autorun } from 'vue-meteor-tracker';
import { WalletsCollection } from '../../api/collections/WalletsCollection';
import { useAuthStore } from '../stores/authStore';

//type
import Wallet from '../../types/Wallet';
import Alert from '../../types/Alert';
const isLoadingContacts = subscribe('myContacts');
const isLoadingWallet = subscribe('myWallet');
const wallet = autorun(() => WalletsCollection.findOne({})).result;
const alertProps = ref<Alert>();
const isOpen = ref(false);
const isTransferring = ref(false);
const authStore = useAuthStore();

const username = computed(() => authStore.user?.username);

// add or transfer form
const form = reactive<Wallet>({
  sourceWalletId: '',
  destinationContactId: '',
  amount: 0,
  createdAt: new Date(),
});

const addMoney = () => {
  isTransferring.value = false;
  //toggle modal
  toggleModal(!isOpen.value);
};
const transferMoney = () => {
  isTransferring.value = true;
  //toggle modal
  toggleModal(!isOpen.value);
};

const toggleModal = (value: boolean) => {
  isOpen.value = value;
  if (isOpen.value === false) {
    clearForm();
  }
};

const clearForm = () => {
  form.sourceWalletId = '';
  if (form.destinationContactId) form.destinationContactId = '';
  form.amount = 0;
  form.createdAt = new Date();
};

const save = () => {
  form.sourceWalletId = wallet.value?._id;
  console.log('🚀 ~ file: Wallet.vue:160 ~ save ~ form:', form);
  Meteor.call(
    'transactions.insert',
    isTransferring.value,
    form,
    (errorResponse: any) => {
      if (errorResponse) {
        alertProps.value = { msg: errorResponse.error, type: 'error' };
        // hide alert after 3s
        setTimeout(() => {
          alertProps.value = undefined;
        }, 3000);
      } else {
        alertProps.value = {
          msg: isTransferring.value
            ? 'Money is transfer successfully.'
            : 'Money is added successfully.',
          type: 'success',
        };
        clearForm();
        // hide alert after 3s
        setTimeout(() => {
          alertProps.value = undefined;
          //toggle modal
          // toggleModal(!isOpen.value);
        }, 3000);
      }
    },
  );
};
</script>

<style scoped></style>
