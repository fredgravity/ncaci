<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">income</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="incomes" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
const incomes = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Item", field: "income_name" },
  { headerName: "Year", field: "year", type: ["numberColumn"] },
  { headerName: "Amount", field: "amount", type: ["numberColumn"] },
  { headerName: "Area", field: "area" },
  { headerName: "District", field: "district" },
  { headerName: "Assembly", field: "assembly" },
  { headerName: "Created By", field: "createdBy" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  // console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  let getData = await useGetData("income");

  loading.value = getData.pending;
  incomes.value = getData.data.data;

  rowData.value = incomes.value.map((res) => {
    let mine = {
      income_name: res.attributes.budget_item_name,
      year: res.attributes.year,
      amount: parseInt(res.attributes.amount),
      area: res.attributes.area,
      district: res.attributes.district,
      created_at: new Date(res.attributes.created_at).toDateString(),
      assembly: res.attributes.assembly,
      budget_item_id: res.attributes.budget_item_id,
      createdBy: res.relationships["user name"],
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
