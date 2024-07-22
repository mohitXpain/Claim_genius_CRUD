<template>
  <div class="body">
    <div class="form">
      <div class="title">CRUD FORM</div>
      <form @submit.prevent="submitForm">
        <div class="input-container ic1">
          <input class="input" type="text" v-model="formData.first_name" placeholder="" required>
          <div class="cut"></div>
          <label class="placeholder">First Name</label>
        </div>
        <div class="input-container ic1">
          <input class="input" type="text" v-model="formData.last_name" placeholder="" required>
          <div class="cut"></div>
          <label class="placeholder">Last Name</label>
        </div>
        <div class="input-container ic1">
          <input class="input" type="text" v-model="formData.dob" placeholder="" required>
          <div class="cut cut-short"></div>
          <label class="placeholder">Date of Birth</label>
        </div>
        <div class="input-container ic1">
          <input class="input" type="text" v-model="formData.mno" maxlength="10" placeholder="" required>
          <div class="cut"></div>
          <label class="placeholder">Phone No.</label>
        </div>
        <div class="input-container ic1">
          <input class="input" v-model="formData.address" placeholder="" required>
          <div class="cut"></div>
          <label class="placeholder">Address</label>
        </div><br>
        <button class="button-19" type="submit">Submit</button>
      </form>
    </div>
  </div><br><br><br>

  <div>
  <div class="container1">
      <input type="file" id="file-input" multiple @change="handleFileChange" />
      <label class="label" for="file-input">
        <i class="fa-solid fa-arrow-up-from-bracket"></i>
          Choose Files To Upload
      </label>
    </div><br>
    <button class="button4" @click="uploadFiles">Upload Files</button>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        dob: '',
        mno: '',
        address: ''
      }, 
      selectedFiles: []
    };
  },
  methods: {
    async submitForm() {
      try {
        const createResponse = await axios.post('/api/users', this.formData);
         if (createResponse && createResponse.data) {
          this.$emit('form-submitted', createResponse);
          this.resetForm();
          alert('User added successfully');
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    handleFileChange(event:any) {
      this.selectedFiles = Array.from(event.target.files);
    },
    async uploadFiles() {
      if (this.selectedFiles.length === 0) {
        alert('Please select files to upload');
        return;
      }

      const formData = new FormData();
      this.selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      try {
        const response = await axios.post('/api/users/documentUpload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response && response.data) {
          alert('Files uploaded successfully');
          this.selectedFiles = []; // Clear the selected files list
        }
      } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files');
      }
    },
    resetForm() {
      this.formData = {
        first_name: '',
        last_name: '',
        dob: '',
        mno: '',
        address: ''
      };
    }
  }
};
</script>


<style scoped>

input[type="file"] {
  display: none;
}
.label {
  display: block;
  position: relative;
  background-color: #1CB0F6;
  color: #ffffff;
  font-size: 1.12em;
  font-weight: 500;
  text-align: center;
  width: 12em;
  padding: 1em;
  margin: auto;
  border-radius: 1em;
  cursor: pointer;
}
#num-of-files {
  font-weight: 400;
  text-align: center;
  margin: 1.25em 0 1.87em 0;
}
ul {
  list-style-type: none;
}


.button4 {
  display: block;
  position: relative;
    background-color: #1CB0F6;
    color: #ffffff;
    font-size: 18px;
    border: 2px solid #1CB0F6;
    margin: auto;
    border-radius: 12px;
    padding: 10px 20px;
  }
  

</style>
