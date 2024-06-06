<template>
  <div class="container">
  <form @submit.prevent="submitForm">
      <div>
        <label class="label-text">First Name:</label><br>
           <input class="input-css" type="text" name="first_name" v-model="formData.firstName" placeholder="Enter your First Name" required>
      </div><br>
      <div>
        <label class="label-text">Last Name:</label><br>
          <input class="input-css" type="text" name="last_name" v-model="formData.lastName" placeholder="Enter your Last Name" required>
      </div><br>
      <div>
        <label class="label-text">Date of Birth:</label><br>
          <input class="input-css" type="date" name="dob" v-model="formData.dob" placeholder="Enter your Date of Birth" required>
      </div><br>
      <div>
        <label class="label-text">Phone No. :</label><br>
            <input class="input-css" type="text" name="mno" v-model="formData.mobile" maxlength="10"  placeholder="Enter your phone number" required>
      </div><br>
      <div>
        <label class="label-text">Address:</label><br>
           <textarea v-model="formData.address" name="address"  placeholder=" Address" required></textarea>
      </div><br>
      <button class="button-19" type="submit">Submit</button>
  </form></div><hr>
</template>

<script>

export default {
  data() {
      return {
          formData: {
              firstName: '',
              lastName: '',
              dob: '',
              mobile: '',
              address: ''
          }
      };
  },
  methods: {
      submitForm(event) {
          console.log(this.formData);
          this.$emit('form-submitted', {...this.formData});
          event.target.reset();
      }
  }
};
</script>

<style scoped>

</style>