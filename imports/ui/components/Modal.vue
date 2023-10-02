<template>
  <MDBModal
    id="exampleModal"
    tabindex="-1"
    labelledby="exampleModalLabel"
    :model-value="modalProps.modelValue"
    centered
  >
    <MDBModalHeader>
      <MDBModalTitle id="exampleModalLabel">
        {{ modalProps.title }}
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <slot name="body"></slot>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="closeModal">Close</MDBBtn>
      <MDBBtn color="primary" @click="save">{{
        modalProps.isTransferring ? 'Transfer' : 'Add'
      }}</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
  <slot name="buttons"></slot>
</template>

<script setup lang="ts">
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from 'mdb-vue-ui-kit';
import { ref, PropType, computed } from 'vue';
import Modal from '../../types/Modal';

const props = defineProps({
  modalProps: { required: true, type: Object as PropType<Modal> },
});
const emit = defineEmits(['save', 'closeModal']);

const save = () => {
  emit('save');
};
const closeModal = () => {
  emit('closeModal', !props.modalProps.modelValue);
};
</script>

<style scoped></style>
