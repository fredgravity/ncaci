<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">budget</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="budget" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
const budget = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Item", field: "budget_name" },
  { headerName: "Year", field: "year", type: ["numberColumn"] },
  { headerName: "Amount", field: "amount", type: ["numberColumn"] },
  { headerName: "Type", field: "type" },
  { headerName: "Ministry", field: "ministry" },
  { headerName: "Created By", field: "createdBy" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  let getData = await useGetData("budget");

  loading.value = getData.pending;
  budget.value = getData.data.data;

  rowData.value = budget.value.map((res) => {
    let mine = {
      budget_name: res.attributes.budget_item_name,
      year: res.attributes.year,
      type: res.attributes.type,
      created_at: new Date(res.attributes.created_at).toDateString(),
      amount: parseInt(res.attributes.amount),
      ministry: res.attributes.ministry,
      createdBy: res.relationships["user name"],
      budget_item_id: res.attributes.budget_item_id,
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
