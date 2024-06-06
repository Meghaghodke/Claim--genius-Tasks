<template>
  <div class="outer-container">
    <div class="container">
      <form @submit.prevent="handleSubmit" class="form-container">
        <h1>CRUD FORM</h1>
        <div class="form-group">
          <label for="FirstName">First Name:</label>
          <input type="text" id="FirstName" v-model="form.fname" required placeholder="xyz">

          <label for="LastName">Last Name:</label>
          <input type="text" id="LastName" v-model="form.lname" required placeholder="Name">

          <label for="DoB">Date of Birth:</label>
          <input type="date" id="Dob" v-model="form.dob" required placeholder="dd/mm/yy">

          <label for="PNumber">Mobile number:</label>
          <input type="number" id="PNumber" v-model="form.pnumber" required placeholder="123456789">
          
          <label for="Address">Address:</label>
          <textarea id="Address" v-model="form.Adress" required placeholder="landmark"></textarea>
          
          <button type="submit">{{ isEditing.value ? 'Update' : 'Submit' }}</button>
        </div>
      </form>
      <tableComponent :records="records" @deleteRecord="deleteRecord" @editRecord="editRecord" @updateRecord="updateRecord"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TableComponent from './components/tableComponent.vue';

const form = ref({
  fname: '',
  lname: '',
  dob: '',
  pnumber: '',
  Adress: ''
});

const records = ref([]);
const isEditing = ref(false);
const editingIndex = ref(null);
const del = ref(true);

const fetchRecords = async () => {
  try {
    const response = await axios.get('/api/v1/formdata/getall');
    records.value = response.data.data;
  } catch (error) {
    console.error('Error fetching records:', error);
  }
};

onMounted(fetchRecords);

const editRecord = (index) => {
  isEditing.value = true;
  editingIndex.value = index;
  records.value[index].editing = true;
  form.value = { ...records.value[index] };
};

const updateRecord = async (index) => {
  try {
    console.log(enter.value)
    const studentId = records.value[index].id;
    await axios.put(`/api/v1/formdata/update/${studentId}`, form.value);
    
    await fetchRecords();
    isEditing.value = false;
    editingIndex.value = null;
    
    resetForm();
    del.value = true;
  } catch (error) {
    console.error('Error updating record:', error);
  }
};


const deleteRecord = async (index) => {
  try {
    const studentId = records.value[index].id;
    await axios.delete(`/api/v1/formdata/delete/${studentId}`);
    records.value.splice(index, 1);
    await fetchRecords();
    alert("Record deleted successfully");
  } catch (error) {
    console.error('Error deleting record:', error);
  }
};

const handleSubmit = async () => {
  try {
    if (isEditing.value && editingIndex.value !== null) {
      const studentId = records.value[editingIndex.value].id;
      await axios.put(`/api/v1/formdata/update/${studentId}`, form.value);
    } else {
      console.log(form.value);
      await axios.post('/api/v1/formdata/create', form.value);
      //await fetchRecords();

    }
    await fetchRecords();
    resetForm();
  } catch (error) {
    console.error('Error:', error);
  }
};



function resetForm() {
  form.value = {
    fname: '',
    lname: '',
    dob: '',
    pnumber: '',
    Adress: ''
  };
  isEditing.value = false;
  editingIndex.value = null;
}
</script>

<style scoped>
.outer-container {
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr;
  padding: 0 2rem;
}

.container {
  flex-direction: column;
  align-items: center;
}

.form-container {
  background: #fff;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid black;
  width: 500px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-group textarea {
  resize: none;
}

.form-group button {
  padding: 10px 15px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
}

.form-group button:hover {
  background-color: #0056b3;
}
</style>
