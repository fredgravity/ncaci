<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">area</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="areas" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
const areas = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  // { headerName: "Action", field: "action" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
]);

const recordClick = (event) => {
  if (event.value == "Edit") {
    // window.location.href = "/editMinistry-" + event.data.id;
  }
};

onMounted(async () => {
  let getData = await useGetData("area");

  loading.value = getData.pending;
  areas.value = getData.data.data;
  rowData.value = areas.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      created_at: new Date(res.attributes.created_at).toDateString(),
      id: res.id,
      // action: "Edit",
    };
    return mine;
  });
});
</script>

<style></style>
