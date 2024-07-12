<script setup lang="ts">
import { ref, onMounted} from 'vue';
import FormComponent from './Form.vue';
import TableComponent from './TableComponent.vue';
import axios from 'axios';


interface FormData {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  mno: string;
  address: string;
}


const formDataList = ref<FormData[]>([]);
const page = ref<number>(1);
const limit = ref<number>(10); 
const totalPage = ref<number>(0);
const totalCount = ref<number>(0);
const searchQuery = ref<string>('');
const sortColumn = ref<string>('');
const sortCommand = ref<string>('');


const fetchPaginatedData = async () => {
  try {
    const response = await axios.get(`/api/users/searchsortpage`, {
      params: {
        find: searchQuery.value,
        page: page.value,
        limit: limit.value,
        sortColumn: sortColumn.value,
        sortCommand: sortCommand.value
      }
    });
    formDataList.value = response.data.data;
    totalPage.value = response.data.pagination.totalPages;
    totalCount.value = response.data.pagination.totalCount;
  } catch (error) {
    console.error('Error fetching paginated data:', error);
  }
};

onMounted(() => {
  fetchPaginatedData();
});

const addFormData = async (formData: {data: FormData}) => {
  try {
    formDataList.value.unshift(formData.data);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

const updateFormData = async (index: number, updatedData: Partial<FormData>) => {
  const userIdToUpdate = formDataList.value[index].id;
  try {
    await axios.put(`/api/users/${userIdToUpdate}`, updatedData);
    formDataList.value[index] = { ...formDataList.value[index], ...updatedData };
  } catch (error) {
    console.error('Error updating user in database:', error);
  }
};

const deleteUser = async (index: number) => {
  const userIdToDelete = formDataList.value[index].id;
  try {
    await axios.delete(`/api/users/${userIdToDelete}`);
    formDataList.value.splice(index, 1);
  } catch (error) {
    console.error('Error deleting user from database:', error);
  }
};


const handleSearch = (query: string) => {
  searchQuery.value = query; 
  page.value = 1;
  fetchPaginatedData(); 
};

const handleSort = (column: string) => {
  sortColumn.value = column;
  sortCommand.value = sortCommand.value === 'ASC' ? 'DESC' : 'ASC';
  fetchPaginatedData();
};

const goToPreviousPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchPaginatedData();
  }
};

const goToNextPage = () => {
  if (page.value < totalPage.value) {
    page.value++;
    fetchPaginatedData();
  }
};

const onEntriesPerPageChange = async (newLimit: number) => {
  limit.value = newLimit;
  page.value = 1; 
  fetchPaginatedData();
};
</script>

<template>
  <header>
  </header>

  <main>
    <FormComponent @form-submitted="addFormData" />
        <TableComponent 
      :formDataList="formDataList" 
      :limit="limit"
      :page="page"
      :totalPage="totalPage"
      :sortColumn="sortColumn"
      :sortCommand="sortCommand"
      @search="handleSearch"
      @sort="handleSort"
      @delete="deleteUser" 
      @update="updateFormData" 
      @entries-per-page-change="onEntriesPerPageChange"
      @go-to-previous-page="goToPreviousPage"
      @go-to-next-page="goToNextPage"
    />
  </main>
</template>

<style scoped>
</style>
