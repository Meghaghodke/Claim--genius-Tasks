<template>
  <div class="outer-container">
    <div class="container">
      <form @submit.prevent="handleSubmit" class="form-container">
        <h1>CRUD FORM</h1>
        <div class="form-group">
          <label for="FirstName">First Name:</label>
          <input type="text" id="FirstName" v-model="form.FirstName" required placeholder="xyz">

          <label for="LastName">Last Name:</label>
          <input type="text" id="LastName" v-model="form.LastName" required placeholder="Name">

          <label for="DoB">Date of Birth:</label>
          <input type="date" id="Dob" v-model="form.DoB" required placeholder="dd/mm/yy">

          <label for="PNumber">Mobile number:</label>
          <input type="number" id="PNumber" v-model="form.PNumber" required placeholder="123456789">
          
          <label for="Address">Address:</label>
          <textarea id="Address" v-model="form.Address" required placeholder="landmark" rows="3"></textarea>
          
          <button type="submit">{{ isEditing.value ? 'Update' : 'Submit' }}</button>
        </div>
      </form>
      <tableComponent :records="records" @deleteRecord="deleteRecord"  @editRecord ="editRecord" @updateRecords="updateRecord"/>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import TableComponent from './components/tableComponent.vue';

const form = ref({
  FirstName: '',
  LastName: '',
  DoB: '',
  PNumber: '',
  Address: ''
});

const records = ref([]);
const isEditing = ref(false);
const editingIndex = ref(null);

const editRecord = (index) => {
  isEditing.value = true;
  editingIndex.value = index;
  records.value[index].editing = true; 
  form.value = { ...records.value[index] };
};

const updateRecord = (index) => {
  records.value[index] = { ...form.value, editing: false };
  resetForm();
}
const deleteRecord = (index) => {

records.value.splice(index, 1);
alert("are you sure");

};

const handleSubmit = () => {
  if (isEditing.value && editingIndex.value !== null) {
    records.value.splice(editingIndex.value, 1, { ...form.value });
    isEditing.value = false;
    editingIndex.value = null;
  } else {
    records.value.push({ ...form.value });
  }
  resetForm();
};




function resetForm() {
  form.value = {
    FirstName: '',
    LastName: '',
    DoB: '',
    PNumber: '',
    Address: ''
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
