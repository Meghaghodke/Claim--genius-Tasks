<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/v1/formdata/login', {
        username: username.value,
        password: password.value,
      });
  
      if (response.data.success) {
      const token = response.data.token; 
      localStorage.setItem('token', token);
      console.log(response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        router.push('/');
      } else {
        errorMessage.value = 'Login failed: ' + (response.data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        errorMessage.value = 'Login failed: ' + (error.response.data.message || 'Unknown error');
      } else {
        errorMessage.value = 'Login failed: Network error or server not reachable';
      }
    }
  };
  </script>
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .login-container h2 {
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
    font-weight: bold;
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