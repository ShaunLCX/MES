<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">Quality Control</h1>
    <form @submit.prevent="addInspection" class="mb-4">
      <v-row>
        <v-col cols="3">
            <v-select  v-model="newInspection.productionId" :items="productions" item-title="name" label="Production" item-value="id">
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :subtitle="item.raw.id"></v-list-item>
              </template>
            </v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="newInspection.inspectionDate" label="Inspection Date" type="date" outlined></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="newInspection.result" label="Result" outlined></v-text-field>
        </v-col>
        <v-col cols="3">
         

          <v-select v-model="newInspection.defects" label="Defects" :items="defect" item-title="name" item-value="value"></v-select>
        </v-col>
      </v-row>
      <v-btn @click.prevent="addInspection" color="primary" class="ml-2">Add</v-btn>
    </form>
    <v-data-table
      :headers="headers"
      :items="inspections"
      v-model:search="search"
      :pagination="pagination"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="deleteInspection(item.id)" class="mr-2">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'QualityControl',
  data: () => ({
      defect: [
        {
          name: 'Good',
          value: 0,
        },
        {
          name: 'Bad',
          value: 1,
        }
      ],
    }),
  setup() {
    const newInspection = ref({
      productionId: '',
      inspectionDate: '',
      result: '',
      defects: 0
    });
    const inspections = ref([]);
    const productions = ref([]);
    const search = ref('');
    const pagination = ref({ page: 1 });

    const headers = [
      { title: 'Production ID', align: 'start', key: 'productionId' },
      { title: 'Production Name', align: 'start', key: 'Production.name' },
      { title: 'Inspection Date', key: 'inspectionDate' },
      { title: 'Result', key: 'result' },
      { title: 'Defects', key: 'defects' },
      { title: 'Actions', key: 'actions', sortable: false }
    ];

    const fetchInspections = async () => {
      try {
        const response = await axios.get('http://localhost:3000/quality-control');
        inspections.value = response.data;
        console.log(inspections.value);
      } catch (error) {
        console.error('Error fetching inspections:', error);
      }
    };

    const fetchProductions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/production');
        productions.value = response.data.map(prod => ({
          id: prod.id,
          name: prod.name
        }));
        console.log(productions.value);
      } catch (error) {
        console.error('Error fetching productions:', error);
      }
    };
    const addInspection = async () => {
      try {
        const response = await axios.post('http://localhost:3000/quality-control', newInspection.value);
        inspections.value.push(response.data);
        fetchInspections();
      } catch (error) {
        console.error('Error adding inspection:', error);
      }
    };

    const deleteInspection = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/quality-control/${id}`);
        inspections.value = inspections.value.filter(inspection => inspection.id !== id);
      } catch (error) {
        console.error('Error deleting inspection:', error);
      }
    };

    const handlePagination = (page) => {
      pagination.value.page = page;
    };

    onMounted(() => {
      fetchInspections();
      fetchProductions();
    });

    return {
      newInspection,
      inspections,
      productions,
      addInspection,
      deleteInspection,
      search,
      pagination,
      headers,
      handlePagination
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>
