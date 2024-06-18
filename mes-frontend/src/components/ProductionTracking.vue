<template>
  <v-container>
    <h1 class="text-2xl font-bold mb-4">Production Tracking</h1>

    <!-- Form to add new production -->
    <v-form @submit.prevent="addProduction">
      <v-row class="mb-4">
        <v-col cols="4">
          <v-text-field v-model="newProduction.name" label="New Production Name" outlined></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field v-model="newProduction.status" label="New Production Status" outlined></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn type="submit" color="primary">Add</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <!-- Table to display productions -->
    <v-data-table :headers="daoHeaders" :items="productions" item-key="id">
      <template v-slot:[`item.name`]='{ item }'>

        
        <template v-if="!item.isEditing">
          {{ item.name }}
          <v-icon @click="toggleEditMode(item)">mdi-pencil</v-icon>
        </template>
        <template v-else>
          <v-text-field v-model="item.name" outlined></v-text-field>
          <v-icon @click="saveChanges(item)">mdi-check</v-icon>
          <v-icon @click="cancelEdit(item)">mdi-close</v-icon>
        </template>
      </template>
      <template v-slot:[`item.status`]='{ item }'>
        <template v-if="!item.isEditing">
          {{ item.status }}
        </template>
        <template v-else>
          <v-text-field v-model="item.status" outlined></v-text-field>
          <v-icon @click="saveChanges(item)">mdi-check</v-icon>
          <v-icon @click="cancelEdit(item)">mdi-close</v-icon>
        </template>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="deleteProduction(item.id)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductionTracking',
  data() {
    return {
      newProduction: { name: '', status: '' },
      productions: [],
      daoHeaders: [
        { title: 'Name', align: 'start', sortable: true, key: 'name' },
        { title: 'Status', sortable: true, key: 'status' },
        { title: 'Actions', key: 'actions', sortable: false }
      ]
    };
  },
  mounted() {
    this.fetchProductions();
  },
  methods: {
    async fetchProductions() {
      try {
        const response = await axios.get('http://localhost:3000/production');
        this.productions = response.data.map(prod => ({ ...prod, isEditing: false }));
      } catch (error) {
        console.error('Error fetching productions:', error);
      }
    },
    async addProduction() {
      try {
        const response = await axios.post('http://localhost:3000/production', this.newProduction);
        this.productions.push(response.data);
        this.newProduction = { name: '', status: '' };
      } catch (error) {
        console.error('Error adding production:', error);
      }
    },
    async deleteProduction(id) {
      try {
        await axios.delete(`http://localhost:3000/production/${id}`);
        this.productions = this.productions.filter(prod => prod.id !== id);
      } catch (error) {
        console.error('Error deleting production:', error);
      }
    },
    toggleEditMode(item) {
      item.isEditing = true;
    },
    async saveChanges(item) {
      try {
        const response = await axios.put(`http://localhost:3000/production/${item.id}`, item);
        if (response.status === 200) {
          item.isEditing = false;
        }
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    },
    cancelEdit(item) {
      item.isEditing = false;
      this.fetchProductions(); // Refetch productions to reset changes
    }
  }
};
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>
