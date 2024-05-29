<script setup>
import { ref } from 'vue';
import FormComponent from './components/Form.vue';
import TableComponent from './components/TableComponent.vue';

const formDataList = ref([]);

const addFormData = (formData) => {
  formDataList.value.push(formData);
};

const updateFormData = (index, updatedData) => {
  formDataList.value[index] = updatedData;
};

const deleteUser = (index) => {
  formDataList.value.splice(index, 1);
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

</style>
