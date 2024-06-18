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
      
      <h2 >RECORDS</h2>
      <div class="search-container"  >
    
        <label for="search">Search:</label>
        <input type="text" v-model="searchquery" placeholder="Search" @keyup.enter="searchRecords">
      </div>
      <div>
        <lable class="total">Total entries</lable>
        <select v-model="limit" v-on:change="pagination">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <tableComponent :records="records" :limit="limit" :currentPage="currentPage" @deleteRecord="deleteRecord" @editRecord="editRecord" @updateRecord="updateRecord"  @sortRecords="updateRecords" />
    </div>
  </div>
  
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
const searchquery = ref('');
const currentPage = ref(1);
const limit = ref(5);
const sortby=ref('asc');
const sortquery=ref('id');
const totalPages = ref();

//const fetchRecords = async () => {
 //try {
   // const response = await axios.get(`api/v1/formdata/getall`);
   //records.value = response.data.data;
  //} catch (error) {
   // console.error('Error fetching records:', error);
 //}
//};

const pagination = async () => {
  const response = await axios.get('/api/v1/formdata/searching', {
    params: {
      datafetch: searchquery.value,
      limit: limit.value,
      offset: currentPage.value,
      sortby: sortby.value,
      sortquery: sortquery.value
    }
  });

  if (response.data.success) {
    records.value = response.data.data;
    totalPages.value = Math.ceil(response.data.totalrecords / limit.value);
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  } else {
    console.error('Invalid response:', response.data);
  }
};


//onMounted(fetchRecords);
onMounted(pagination);
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
    
    //await fetchRecords();
   await pagination();
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
    //await fetchRecords();
    await pagination();
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
     // await fetchRecords();
      await pagination();

    }
    //await fetchRecords();
    resetForm();
  } catch (error) {
    console.error('Error:', error);
  }
};
const searchRecords = async () => {
    //  try {
        //console.log({ datafetch: searchquery.value });
       // const response=await.get(`api/v1/formdata/select`,{
  //params: {
   // datafetch: searchquery.value,
  //}
//});
//}
         //datafetch: searchsortpage.value 
       // records.value = response.data.data;
      await pagination();
     // catch (error) {
       // console.error('Error searching records:', error);
      //}
    };

    const updateRecords =async (sortb,sortquer) => {
      sortby.value=sortb,
      sortquery.value=sortquer

     console.log(sortby.value,sortquery.value)
     await pagination();
  //records.value = sortedRecords;

};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    
    pagination();
    
  }
};

const nextPage = () => {
 
  currentPage.value++;
 //updateRecords(fname,lname,dob,pnumber,Adress);
 //updateRecords(s,r);
  pagination();
// updateRecords(s,r);
 //updateRecords(fname,lname,dob,pnumber,Adress);
  
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
  margin-bottom: 20px;
}

.form-container {
  background:beige;
  padding: 10px;
  border-radius: 20px;
  border: 2px solid black;
  width: 500px;
  margin: 0 auto;
  height: 50%;
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

.search-container {
  position: absolute;
  top: 79%;
  right: 15%; /* Position the container 10px from the right edge */
  margin: 10px; 
}

.search-container label {
  margin-right: 10px; 
}

.search-container input[type="text"] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 50%;
}
h2{
  display: flex;
  justify-content: center;
}
.total{
  top: 78%;
}
.pagination{
  display: flex;
  justify-content: center;
}

</style>
