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
              {{ record.fname }}
            </template>
            <template v-else>
              <input type="text" v-model="record.fname" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.lname }}
            </template>
            <template v-else>
              <input type="text" v-model="record.lname" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.dob }}
            </template>
            <template v-else>
              <input type="date" v-model="record.dob" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.pnumber }}
            </template>
            <template v-else>
              <input type="number" v-model="record.pnumber" />
            </template>
          </td>
          <td>
            <template v-if="!record.editing">
              {{ record.Adress}}
            </template>
            <template v-else>
              <textarea v-model="record.Adress"></textarea>
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
  fname: string;
  lname: string;
  dob: string;
  pnumber: string;
  Adress: string;
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
  emit('editRecord', index);
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
  background-color: white;
}

tr:nth-child(even) {
  background-color: lightgray;
}

.table-header {
  background-color: burlywood;
}
</style>
