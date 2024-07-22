<script setup lang="ts">
import DeleteModal from './DeleteModal.vue';
import { ref} from 'vue';

interface FormData {
  first_name: string;
  last_name: string;
  dob: string;
  mno: string;
  address: string;
}

interface HandleData extends Event {
  target: HTMLSelectElement;
}

const props = defineProps<{formDataList: FormData[];
                            limit: number;
                            page: number;
                            totalPage: number;
                            sortColumn: string;
                            sortCommand: string;
                          }>();


const emit = defineEmits(['delete', 'update', 'search', 'sort', 'go-to-previous-page', 'go-to-next-page', 'entries-per-page-change' ]);

const showModal = ref(false);
const indexToDelete = ref<number | null>(null);
const editingIndex = ref<number | null>(null);
const editingData = ref<Partial<FormData>>({});
const searchQuery =  ref<string>('');


const editRow = (index: number) => {
  editingIndex.value = index;
  editingData.value = { ...props.formDataList[index] };
};

const saveUpdate = (index: number) => {
  emit('update', index, editingData.value);
  editingIndex.value = null;
  editingData.value = {};
};

const cancelEdit = () => {
  editingIndex.value = null;
  editingData.value = {};
};

const confirmDelete = (index: number) => {
  indexToDelete.value = index;
  showModal.value = true;
};

const deleteRow = async () => {
  emit('delete', indexToDelete.value);
  showModal.value = false;
};

const searchUsers = () => {
  emit('search', searchQuery.value);
};

const handleSort = (column: string) => {
  emit('sort', column);
};

const goToPreviousPage = () => {
  emit('go-to-previous-page');
};

const goToNextPage = () => {
  emit('go-to-next-page');
};


const handleEntriesChange = (event: HandleData) => {
  emit('entries-per-page-change', event.target.value);
};

</script>


<template>
  <div class="table-wrapper"> 
    <h1>CRUD DATA-TABLE</h1>

<div class="table-controls">
        <input type="text" v-model="searchQuery" @input="searchUsers" class="search-box" placeholder="Search...">
        <div class="entries-per-page">
        <label for="entries">Entries per page:</label>
        <select id="entries" name="entries" class="dropdown-content" @change="handleEntriesChange">
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10" selected>10</option>
          <option value="12">12</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
    <table class="fl-table">
      <thead>
        <tr>
          <th>
  First Name
  <button @click="handleSort('first_name')" class="arrow-button arrow-up" v-if="sortColumn === 'first_name' && sortCommand === 'ASC'">&#9650;</button>
  <button @click="handleSort('first_name')" class="arrow-button arrow-down" v-else-if="sortColumn === 'first_name' && sortCommand === 'DESC'">&#9660;</button>
  <button @click="handleSort('first_name')" class="arrow-button arrow-up" v-else>&#9650;</button>
</th>
          <th @click="handleSort('last_name')">
            Last Name
            <button @click="handleSort('last_name')" class="arrow-button arrow-up" v-if="sortColumn !== 'last_name' || sortCommand === 'ASC'">&#9650;</button>
            <button @click="handleSort('last_name')" class="arrow-button arrow-down" v-else>&#9660;</button>
          </th>
          <th @click="handleSort('dob')">
            Date of Birth
            <button @click="handleSort('dob')" class="arrow-button arrow-up" v-if="sortColumn !== 'dob' || sortCommand === 'ASC'">&#9650;</button>
            <button @click="handleSort('dob')" class="arrow-button arrow-down" v-else>&#9660;</button>
          </th>
          <th @click="handleSort('mno')">
            Mobile Number
            <button @click="handleSort('mno')" class="arrow-button arrow-up" v-if="sortColumn !== 'mno' || sortCommand === 'ASC'">&#9650;</button>
            <button @click="handleSort('mno')" class="arrow-button arrow-down" v-else>&#9660;</button>
            </th>
          <th @click="handleSort('address')">
            Address
            <button @click="handleSort('address')" class="arrow-button arrow-up" v-if="sortColumn !== 'address' || sortCommand === 'ASC'">&#9650;</button>
            <button @click="handleSort('address')" class="arrow-button arrow-down" v-else>&#9660;</button>
          </th>

          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="formDataList.length === 0">
          <td colspan="6"><h2>No records found</h2></td>
        </tr>
        <tr v-else v-for="(formData, index) in formDataList" :key="index">
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
            <input type="date" v-model="editingData.dob" />
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
            <button v-if="editingIndex !== index" class="edit-btn" @click="editRow(index)">Edit</button>
            <button v-else class="edit-btn" @click="saveUpdate(index)">Update</button>
            <button v-if="editingIndex !== index" class="delete-btn" @click="confirmDelete(index)">Delete</button>
            <button v-else class="delete-btn" @click="cancelEdit">Cancel</button>
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
        <div>

    </div>  
    <div id="pagination">
      <button @click="goToPreviousPage" :disabled="page === 1">Prev</button>
      <span>Page {{ page }} of {{ totalPage }}</span>
      <button @click="goToNextPage" :disabled="page === totalPage">Next</button>
    </div>
  </div>
</template>



<style scoped>

.arrow-button {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.arrow-up {
  color: rgb(251, 255, 0);
}

.arrow-down {
  color: rgb(255, 0, 0); 
}
</style>

