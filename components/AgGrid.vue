<template>
  <div>
    <div class="tw-text-xs tw-w-full tw-mb-2 tw-ml-20">
      Page Size:
      <select @change="onPageSizeChanged" id="page-size" class="tw-h-7 tw-w-15 tw-text-xs tw-outline-none tw-rounded-md tw-border-blue-500 tw-px-3 tw-py-0">
        <option value="5" selected="">5</option>
        <option value="10" selected="">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <ag-grid-vue
      style="width: 90%; height: 75vh; margin-left: 5rem"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      animateRows="true"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      @cell-clicked="cellWasClicked"
      @cellValueChanged="valueChanged"
      :pagination="true"
      :paginationPageSize="paginationPageSize"
      :columnTypes="columnTypes"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
const gridApi = ref({});
const columnApi = ref({});
const paginationPageSize = ref(10);
const filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    let dateAsString = new Date(cellValue).toLocaleDateString();
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(Number(dateParts[2]), Number(dateParts[0]) - 1, Number(dateParts[1]));
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 1991,
  maxValidYear: 2050,
  inRangeFloatingFilterDateFormat: "Do MMM YYYY",
};

const props = defineProps({ results: Object, columnDefs: Object, rowData: Object });

const emit = defineEmits(["recordClick"]);

const onGridReady = (params) => {
  gridApi.value = params.api;
  columnApi.value = params.columnApi;
};

const columnTypes = {
  dateColumn: {
    filter: "agDateColumnFilter",
    filterParams: filterParams,
    // suppressMenu: true
  },
  numberColumn: {
    filter: "agNumberColumnFilter",
  },
};

const cellWasClicked = (event) => {
  // console.log("cell was clicked", event.data);
  emit("recordClick", event);
};

const valueChanged = (event) => {
  //   console.log("cell was edited", event);
};

const onPageSizeChanged = (event) => {
  // console.log(event.target.value);
  paginationPageSize.value = event.target.value;
};

// console.log(props.results);

const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
  enableCellChangeFlash: true,
  resizable: true,
  editable: true,
  sortable: true,
};
</script>
