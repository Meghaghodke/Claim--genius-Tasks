<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <router-link to="/login">Login here</router-link></p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  
  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/v1/formdata/register', { username: username.value, password: password.value });
      if (response.data.success) {
        router.push('/login');
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .register-container h1 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 24px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    
    color: #555;
  }
  
  .form-group input {
    width: calc(100% - 10px);
    padding: 8px 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 10px 15px;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    margin-top: 10px;
    color: #D8000C;
    background-color: #FFD2D2;
    border: 1px solid #D8000C;
    padding: 10px;
    border-radius: 4px;
  }
  
  p {
    text-align: center;
  }
  
  p a {
    color: #007BFF;
    text-decoration: none;
  }
  
  p a:hover {
    text-decoration: underline;
  }
  </style>