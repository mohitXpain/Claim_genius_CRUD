<template>
    <div class="body">
        <div class="container">
            <div class="login-box">
                <div class="logo">
                    <img src="../images/coding12.png" alt="Logo">
                </div>
                <form @submit.prevent="submitLoginForm">
                    <div class="input-box">
                        <label>Name</label>
                        <div class="input-icon">
                            <i class="fa fa-user-circle"></i>
                            <input type="text" v-model="loginData.name" placeholder="Username" required>
                        </div>
                    </div>
                    <div class="input-box">
                        <label>Password</label>
                        <div class="input-icon">
                            <i class="fa fa-lock"></i>
                            <input type="password"  v-model="loginData.password" placeholder="********" required>
                        </div>
                    </div>
                    <button type="submit">Login</button><br><br>
                    <div class="extra-links">
                        <a href="/">Register</a>
                        <a href="#">Forgot Password?</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </template>




<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      loginData: {
        name: '',
        password: ''
      }
    };
  },
  methods: {
    async submitLoginForm() {
      try {
        const response = await axios.post('/api/users/login', this.loginData);
        if (response && response.data) {
          alert('Login successful');
          this.$emit('form-submitted', response);
          this.$router.push('/home');  
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in');
      }
    }
  }
}
</script>


<style scoped>
.body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 98vh;
    background-color: #e0e7ff;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.login-box {
    background-color: #f0f4ff;
    padding: 50px;
    border-radius: 35px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    width: 300px;
    height: 510px
}

.logo img {
    display: block;
    margin: 0 auto 20px;
    width: 160px;
    height: 160px;
}

form {
    display: flex;
    flex-direction: column;
}

.input-box {
    margin-bottom: 15px;
}

.input-box label {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: block;
    margin-bottom: 5px;
    margin-left: 9px;
    color: #333;
}

.input-icon {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 15px;
    background-color: #fff;
    height: 27px;
}

.input-icon i {
    margin-right: 10px;
    color: #888;
}

.input-icon input {
    border: none;
    outline: none;
    flex: 1;
    background-color: transparent;
}

button {
    background-color: #3f51b5;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 16px;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #303f9f;
}

.extra-links {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.extra-links a {
    color: #3f51b5;
    text-decoration: none;
}

.extra-links a:hover {
    text-decoration: underline;
}
</style>