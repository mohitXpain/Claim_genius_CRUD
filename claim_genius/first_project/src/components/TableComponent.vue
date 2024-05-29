<script setup>
import { ref } from 'vue';
import DeleteModal from './DeleteModal.vue';

const props = defineProps(['formDataList']);
const emit = defineEmits(['delete', 'update']);

const editingIndex = ref();
const editingData = ref({});

const editRow = (index) => {
  editingIndex.value = index;
  editingData.value = { ...props.formDataList[index] };
};

const saveUpdate = (index) => {
  emit('update', index, editingData.value);
  editingIndex.value = {};
  editingData.value = {};
};

const deleteRow = (index) => {
  emit('delete', index);
};

const showModal = ref(false)

</script>

<template>
  <div v-if="formDataList.length">
    <h1>Form data in Table</h1>
    <table >
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Mobile Number</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(formData, index) in formDataList" :key="index">
          <td v-if="editingIndex !== index">{{ formData.firstName }}</td>
          <td v-else>
            <input v-model="editingData.firstName" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.lastName }}</td>
          <td v-else>
            <input v-model="editingData.lastName" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.dob }}</td>
          <td v-else>
            <input v-model="editingData.dob" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.mobile }}</td>
          <td v-else>
            <input v-model="editingData.mobile" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.address }}</td>
          <td v-else>
            <textarea v-model="editingData.address"></textarea>
          </td>
          <td>
            <button v-if="editingIndex !== index" class="button1" @click="editRow(index)">Edit</button>
            <button v-else class="button1" @click="saveUpdate(index)">Update</button>
            <button class="button2" @click="deleteRow(index)">Delete</button>
            <button class="button2" id="show-modal" @click="showModal = true">Delete Popup</button>

<Teleport to="body">
  <!-- use the modal component, pass in the prop -->
  <DeleteModal :show="showModal" @close="showModal = false">
    <template #header>
      
      <h3><i class="fab fa-vuejs"></i> NOTIFICATION !!!!</h3>
    </template>
  </DeleteModal>
</Teleport>


          </td>
        </tr>
      </tbody>
    </table>


  </div>


</template>

<style scoped>

</style>
