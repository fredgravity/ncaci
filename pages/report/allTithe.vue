<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">all tithe report</div>
    <Loading :loading="loading" />
    <AgGrid :results="tithes" :columnDefs="columnDefs" :rowData="rowData" />
  </div>
</template>

<script setup>
const tithes = reactive([]);
const loading = ref("");
const rowData = ref([]);
const assemblies = ref([]);

const columnDefs = reactive([
  { headerName: "Assembly", field: "name" },
  { headerName: "Area", field: "area" },
  { headerName: "District", field: "district" },
  { headerName: "Pastor", field: "pastor" },
  { headerName: "Status", field: "status" },
  { headerName: "Paid By", field: "paid_by" },
  { headerName: "Tithe Date", field: "tithe_date", type: ["numberColumn"] },
  { headerName: "OpenedOn", field: "openedOn", type: ["dateColumn"] },
  { headerName: "Total Tithe", field: "total", type: ["numberColumn"] },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
]);

onMounted(async () => {
  let getData = await useGetData("tithe-all");

  loading.value = getData.pending;
  tithes.value = getData.data.data;

  let tithesFiltered = tithes.value.filter((res) => {
    return res.attributes.assembly !== null;
  });

  // let titheAssembly = titheFiltered.filter((res) => res.attributes.member !== null);

  rowData.value = tithesFiltered.map((res) => {
    let mine = {
      name: res.attributes.assembly.name,
      area: res.attributes.assembly.area.name,
      district: res.attributes.assembly.district,
      pastor: res.attributes.assembly.pastor,
      status: res.attributes.assembly.status,
      paid_by: res.attributes.paidby,
      tithe_date: new Date(res.attributes.updated_at).toDateString(),
      openedOn: res.attributes.assembly.openedOn,
      created_at: new Date(res.attributes.assembly.created_at).toDateString(),
      total: res.attributes.amount,
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
