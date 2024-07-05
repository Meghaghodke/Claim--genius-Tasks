<template>
    <div>
       
      <table v-if="records.length > 0"  >
       
        <thead class="table-header">
          <tr>
            <th>
              First Name
              <button @click="sortRecords('asc', 'fname')">▲</button>
              <button @click="sortRecords('desc', 'fname')">▼</button>
            </th>
            <th>
              Last Name
              <button @click="sortRecords('asc', 'lname')">▲</button>
              <button @click="sortRecords('desc', 'lname')">▼</button>
            </th>
            <th>
              Date of Birth
              <button @click="sortRecords('asc', 'dob')">▲</button>
              <button @click="sortRecords('desc', 'dob')">▼</button>
            </th>
            <th>
              Mobile Number
              <button @click="sortRecords('asc', 'pnumber')">▲</button>
              <button @click="sortRecords('desc', 'pnumber')">▼</button>
            </th>
            <th>
              Address
              <button @click="sortRecords('asc', 'Adress')">▲</button>
              <button @click="sortRecords('desc', 'Adress')">▼</button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="records.length === 0">
            <td >No records found</td>
          </tr>
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
                {{ record.Adress }}
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
      </table >
      <div v-else>
        <table>
          <thead class="table-header">
            <tr>
              <th>
                First Name
                <button @click="sortRecords('asc', 'fname')">▲</button>
                <button @click="sortRecords('desc', 'fname')">▼</button>
              </th>
              <th>
                Last Name
                <button @click="sortRecords('asc', 'lname')">▲</button>
                <button @click="sortRecords('desc', 'lname')">▼</button>
              </th>
              <th>
                Date of Birth
                <button @click="sortRecords('asc', 'dob')">▲</button>
                <button @click="sortRecords('desc', 'dob')">▼</button>
              </th>
              <th>
                Mobile Number
                <button @click="sortRecords('asc', 'pnumber')">▲</button>
                <button @click="sortRecords('desc', 'pnumber')">▼</button>
              </th>
              <th>
                Address
                <button @click="sortRecords('asc', 'Adress')">▲</button>
                <button @click="sortRecords('desc', 'Adress')">▼</button>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="records.length === 0">
              <td class="displaynorecords" colspan="6">No records found</td>
            </tr>
            <tr v-for="(record, index) in records" :key="index">
              <h2>NO</h2>
              </tr>
              </tbody>
        </table>
      </div>
  
     
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import axios from 'axios';
  import type { Record } from '@/Types/types';
  
  // interface Record {
  //   id:Number;
  //   fname: string;
  //   lname: string;
  //   dob: string;
  //   pnumber: string;
  //   Adress: string;
  //   editing?: boolean;
  // }
  
  const props = defineProps<{
    records: Record[];
    limit:number;
    currentPage:number;
  }>();
  
  const emit = defineEmits(['deleteRecord', 'editRecord', 'updateRecord', 'sortRecords']);
  
  const editRecord = (index: number) => {
    props.records.forEach((record, idx) => {
      record.editing = idx === index;
    });
    emit('editRecord', index);
  };
  
  const updateRecord = (index: number) => {
    props.records[index].editing = false;
    emit('updateRecord', props.records[index]);
  };
  
  const deleteRecord = (index: number) => {
    emit('deleteRecord', index);
  };
  const sortRecords = async (sortby: string, sortquery: string) => {
    try {
      sortby=sortby,
      sortquery=sortquery
      //console.log(`Sorting records by ${sortquery} in ${sortby} order...`);
      //const response = await axios.get(`/api/v1/formdata/sort`, {
        //console.log('Response from server:', response.data);
  
        emit('sortRecords', sortby,sortquery);
    }
      
    
      catch( error){
        console.error('Error sorting records:', error);
      }
      
    
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
    background-color: beige;
  }
  
  .table-header {
    background-color: burlywood;
  }
  
  button {
    background: none;
    border: 1px solid black;
    cursor: pointer;
    font-size: 1em;
    padding: 1;
    margin: auto;
    
  }
  
  button:hover {
    color: blue;
  }
  h2{
    text-align: center;
    font-weight: bold;
  }
  .displaynorecords{
    text-align: center;
  }
  </style>
  