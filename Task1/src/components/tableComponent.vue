<template>
  <div>
   
   
    <table v-if="records.length > 0">
      
      <thead class="table-header">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Mobile Number</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
    
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td>
            <template v-if="!record.editing">
              {{ record.FirstName }}
            </template>
            <template v-else>
              <input type="text" v-model="record.FirstName" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.LastName }}
            </template>
            <template v-else>
              <input type="text" v-model="record.LastName" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.DoB }}
            </template>
            <template v-else>
              <input type="date" v-model="record.DoB" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.PNumber }}
            </template>
            <template v-else>
              <input type="number" v-model="record.PNumber" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.Address }}
            </template>
            <template v-else>
              <textarea v-model="record.Address"></textarea>
            </template>
          </td>
          <td>
            <button @click="editRecord(index)" v-if="!record.editing">Edit</button>
            <button @click="updateRecord(index)" v-if="record.editing">Update</button>
            <button @click="deleteRecord(index)" v-if="!record.editing">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Record {
  FirstName: string;
  LastName: string;
  DoB: string;
  PNumber: string;
  Address: string;
  editing: boolean;
}

const props = defineProps<{
  records: Record[];
}>();

const emit = defineEmits(['deleteRecord', 'editRecord', 'updateRecord']);

const editRecord = (index: number) => {
  props.records.forEach((record, idx) => {
    record.editing = idx === index;
  });
};

const updateRecord = (index: number) => {
  props.records[index].editing = false;
  emit('updateRecord', index);
};

const deleteRecord = (index: number) => {
  emit('deleteRecord', index);
};

</script>

<style scoped>
table, th, td {
  border: 1px solid black;
  
}

th, td {
  padding: 10px;
  text-align: left;
}
tr {
  background-color:white
}
tr:nth-child(even) {
  background-color:lightgray;
}
.table-header{
  background-color: burlywood;
}


</style>
