<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div>
        <label class="label-text">First Name:</label><br>
        <input class="input-css" type="text" v-model="formData.first_name" placeholder="Enter your First Name" required>
      </div><br>
      <div>
        <label class="label-text">Last Name:</label><br>
        <input class="input-css" type="text" v-model="formData.last_name" placeholder="Enter your Last Name" required>
      </div><br>
      <div>
        <label class="label-text">Date of Birth:</label><br>
        <input class="input-css" type="date" v-model="formData.dob" placeholder="Enter your Date of Birth" required>
      </div><br>
      <div>
        <label class="label-text">Phone No. :</label><br>
        <input class="input-css" type="text" v-model="formData.mno" maxlength="10" placeholder="Enter your phone number" required>
      </div><br>
      <div>
        <label class="label-text">Address:</label><br>
        <textarea v-model="formData.address" placeholder="Address" required></textarea>
      </div><br>
      <button class="button-19" type="submit">Submit</button>
    </form>
  </div>
  <hr>
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
    async submitForm(event) {
      try {
        const createResponse = await axios.post('/api/users', this.formData);
        if (createResponse) {
          alert('User added successfully');
          event.target.reset();
          // Optionally, emit an event here if needed
        }
      } catch (error) {
        console.error('Error adding user:', error);
        // Handle error if needed
      }
    }
  }
};
</script>

<style scoped>
/* Add your scoped styles here if needed */
</style>
