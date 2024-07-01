<script setup>
import { ref, onMounted } from 'vue';
import FormComponent from './components/Form.vue';
import TableComponent from './components/TableComponent.vue';
import axios from 'axios';

const formDataList = ref([]);

// Fetch form data from the backend
const fetchFormData = async () => {
  try {
    const response = await axios.get('/api/users');
    formDataList.value = response.data;
  } catch (error) {
    console.error('Error fetching form data:', error);
  }
};

// Call fetchFormData when the component is mounted
onMounted(fetchFormData);

const addFormData = async (formData) => {
  try {
    const response = await axios.post('/api/users', formData);
    formDataList.value.push(response.data); // Append the new entry to the list
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

const updateFormData = async (index, updatedData) => {
  const userIdToUpdate = formDataList.value[index].id; // Assuming each user has an 'id' property
  try {
    await axios.put(`/api/users/${userIdToUpdate}`, updatedData);
    formDataList.value[index] = { ...formDataList.value[index], ...updatedData }; // Update the user in the table
  } catch (error) {
    console.error('Error updating user in database:', error);
  }
};

const deleteUser = async (index) => {
  const userIdToDelete = formDataList.value[index].id; // Assuming each user has an 'id' property
  try {
    await axios.delete(`/api/users/${userIdToDelete}`);
    formDataList.value.splice(index, 1); // Remove the deleted user from the table
  } catch (error) {
    console.error('Error deleting user from database:', error);
  }
};
</script>

<template>
  <header>
    <div class="container">
      <hr> <h1>CRUD FORM</h1> <hr>
    </div>
  </header>

  <main>
    <FormComponent @form-submitted="addFormData" />
    <TableComponent 
      :formDataList="formDataList" 
      @delete="deleteUser" 
      @update="updateFormData" 
    />
  </main>
</template>

<style scoped>
/* Your styles here */
</style>
