<template>
  <div>
    <div id="chart">
      <apexchart :key="componentKey" type="line" :height="450" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup>
import _, { map } from "../../node_modules/underscore/underscore-esm-min";
const props = defineProps(["data", "dataValue"]);

const componentKey = ref(0);

const series = ref([
  {
    name: "Budgeted - ",
    data: [],
  },
  {
    name: "Actual - ",
    data: [],
  },
]);

const chartOptions = ref({
  chart: {
    height: 300,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    toolbar: {
      show: true,
    },
  },
  colors: ["#77B6EA", "#545454"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Comparason",
    align: "left",
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: [],
    title: {
      text: "Budget Name",
    },
  },
  yaxis: {
    title: {
      text: "Amount - GHS",
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
});

const forceRerender = () => {
  componentKey.value += 1;
};

const chartCategory = (data) => {
  let result = data.map((res) => res.attributes.name);
  return result;
};

watch(
  props,
  (newProps) => {
    if (newProps.data.length > 0) {
      series.value[0].name = "Budgeted - " + props.data[0].attributes.year;
      series.value[1].name = "Actual - " + props.data[0].attributes.year;
      series.value[0].data = props.dataValue.budget;
      series.value[1].data = props.dataValue.actual;

      chartOptions.value.xaxis.categories = chartCategory(newProps.data);

      forceRerender();
    }
  },
  { immediate: true }
);
</script>

<style></style>
