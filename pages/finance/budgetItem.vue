<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">budget item</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="budgetItems" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
const budgetItems = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Item", field: "name" },
  { headerName: "Year", field: "year", type: ["numberColumn"] },
  { headerName: "Type", field: "type" },
  { headerName: "Ministry", field: "ministry_name" },
  { headerName: "Created By", field: "createdBy" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  let getData = await useGetData("budget-item");

  loading.value = getData.pending;
  budgetItems.value = getData.data.data;

  rowData.value = budgetItems.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      year: res.attributes.year,
      type: res.attributes.type,
      ministry_name: res.attributes.ministry_name,
      created_at: new Date(res.attributes.created_at).toDateString(),
      ministry_id: res.attributes.ministry_id,
      createdBy: res.relationships["user name"],
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
