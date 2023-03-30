<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">expenditure</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="expenditures" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
const expenditures = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Item", field: "expenditure_name" },
  { headerName: "Year", field: "year", type: ["numberColumn"] },
  { headerName: "Amount", field: "amount", type: ["numberColumn"] },
  { headerName: "Requested By", field: "requestedBy" },
  { headerName: "Approved By", field: "requestedBy" },
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
  let getData = await useGetData("expenditure");

  loading.value = getData.pending;
  expenditures.value = getData.data.data;

  rowData.value = expenditures.value.map((res) => {
    let mine = {
      expenditure_name: res.attributes.budget_item_name,
      year: res.attributes.year,
      created_at: new Date(res.attributes.created_at).toDateString(),
      amount: parseInt(res.attributes.amount),
      requestedBy: res.attributes.requestedBy,
      approvedBy: res.attributes.approvedBy,
      area: res.attributes.area,
      district: res.attributes.district,
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
