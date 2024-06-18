<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">Manufacturing Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="p-4 bg-white rounded shadow flex flex-col items-center">
        <h2 class="text-xl mb-2">Production Count</h2>
        <p class="text-4xl font-bold">{{ metrics.productionCount }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow flex flex-col items-center">
        <h2 class="text-xl mb-2">Quality Control Count</h2>
        <p class="text-4xl font-bold">{{ metrics.qualityControlCount }}</p>
      </div>
      <div class="p-4 bg-white rounded shadow flex flex-col items-center">
        <h2 class="text-xl mb-2">Defect Count</h2>
        <p class="text-4xl font-bold">{{ metrics.defects }}</p>
      </div>
    </div>
    <div class="bg-white p-4 rounded shadow">
      <BarChart :chartData="chartData" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, h } from 'vue';
import axios from 'axios';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  name: 'DashboardView',
  components: {
    BarChart: {
      extends: Bar,
      props: ['chartData'],
      setup(props) {
        return () => h(Bar, {
          chartData: props.chartData,
          options: { responsive: true, maintainAspectRatio: false }
        });
      }
    },
  },
  setup() {
    const metrics = ref({
      productionCount: 0,
      qualityControlCount: 0,
      defects: 0,
    });

    const chartData = ref({
      labels: ['Production', 'Quality Control', 'Defects'],
      datasets: [
        {
          label: 'Counts',
          data: [0, 0, 0],
          backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
        },
      ],
    });

    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard');
        metrics.value = response.data;
        chartData.value.datasets[0].data = [
          response.data.productionCount,
          response.data.qualityControlCount,
          response.data.defects,
        ];
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    onMounted(() => {
      fetchMetrics();
    });

    return {
      metrics,
      chartData,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
