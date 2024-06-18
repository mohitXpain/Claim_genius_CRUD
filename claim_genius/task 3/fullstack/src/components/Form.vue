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
  </div>
</template>

<script>
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
      }
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
</style>
