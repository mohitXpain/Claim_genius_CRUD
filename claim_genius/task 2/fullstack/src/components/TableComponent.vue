<script setup>
import DeleteModal from './DeleteModal.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const formDataList = ref([]);
const showModal = ref(false);
const indexToDelete = ref(null);

const fetchFormData = async () => {
  try {
    const response = await axios.get('/api/users'); // Update the URL with your backend endpoint
    formDataList.value = response.data;
  } catch (error) {
    console.error('Error fetching form data:', error);
  }
};

onMounted(fetchFormData);

const props = defineProps(['formDataList']);
const emit = defineEmits(['delete', 'update']);

const editingIndex = ref(null);
const editingData = ref({});

const editRow = (index) => {
  editingIndex.value = index;
  editingData.value = { ...props.formDataList[index] };
};

const saveUpdate = (index) => {
  emit('update', index, editingData.value);
  editingIndex.value = null;
  editingData.value = {};
};

const cancelEdit = () => {
  editingIndex.value = null;
  editingData.value = {};
};

const confirmDelete = (index) => {
  indexToDelete.value = index;
  showModal.value = true;
};

const deleteRow = () => {
  emit('delete', indexToDelete.value);
  showModal.value = false;
};
</script>

<template>
  <div v-if="formDataList.length">
    <h1>Form data in Table</h1>
    <table>
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
          <td v-if="editingIndex !== index">{{ formData.first_name }}</td>
          <td v-else>
            <input v-model="editingData.first_name" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.last_name }}</td>
          <td v-else>
            <input v-model="editingData.last_name" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.dob }}</td>
          <td v-else>
            <input v-model="editingData.dob" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.mno }}</td>
          <td v-else>
            <input v-model="editingData.mno" />
          </td>
          <td v-if="editingIndex !== index">{{ formData.address }}</td>
          <td v-else>
            <textarea v-model="editingData.address"></textarea>
          </td>
          <td>
            <button v-if="editingIndex !== index" class="button1" @click="editRow(index)">Edit</button>
            <button v-else class="button1" @click="saveUpdate(index)">Update</button>
            <button v-if="editingIndex !== index" class="button2" @click="confirmDelete(index)">Delete</button>
            <button v-else class="button2" @click="cancelEdit">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Teleport to="body">
      <DeleteModal :show="showModal" @close="showModal = false" @delete="deleteRow">
        <template #header>
          <h3><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> NOTIFICATION !!!!</h3>
        </template>
      </DeleteModal>
    </Teleport>
  </div>
</template>

<style scoped>
/* Your styles here */
</style>
