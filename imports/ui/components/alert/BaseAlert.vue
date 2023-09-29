<template>
  <div v-if="alert">
    <div
      class="alert alert-success d-flex align-items-center"
      :class="{ 'alert-danger': alert.type === 'error' }"
      role="alert"
    >
      <div>
        <MDBIcon
          icon="exclamation-circle"
          v-if="alert.type === 'error'"
        ></MDBIcon>
        <MDBIcon icon="check-circle" v-else></MDBIcon>
        {{ alert.msg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MDBIcon } from 'mdb-vue-ui-kit';
import { PropType } from 'vue';
import Alert from '../../../types/Alert';

const props = defineProps({
  alert: {
    type: Object as PropType<Alert>,
  },
});
</script>

<style scoped></style>
