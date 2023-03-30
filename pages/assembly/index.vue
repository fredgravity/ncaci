<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">member</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="assemblies" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
const assemblies = reactive([]);
const loading = ref("");
const rowData = ref([]);
const router = useRouter();

const columnDefs = reactive([
  { headerName: "Assembly", field: "name" },
  { headerName: "Area", field: "area" },
  { headerName: "District", field: "district" },
  { headerName: "Pastor", field: "pastor" },
  { headerName: "Status", field: "status" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
  { headerName: "OpenedOn", field: "openedOn", type: ["dateColumn"] },
  { headerName: "Action", field: "action" },
]);

const recordClick = (event) => {
  if (event.value == "Edit") {
    // window.location.href = "/assembly/assemblyDetail-" + event.data.id;
    router.push("/assembly/assemblyDetail-" + event.data.id);
  }
};

onMounted(async () => {
  let getData = await useGetData("assembly");

  loading.value = getData.pending;
  assemblies.value = getData.data.data;
  console.log(assemblies.value);
  rowData.value = assemblies.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      area: res.attributes.area.name,
      district: res.attributes.district,
      pastor: res.attributes.pastor,
      status: res.attributes.status,
      created_at: new Date(res.attributes.created_at).toDateString(),
      openedOn: res.attributes.openedOn,
      id: res.id,
      action: "Edit",
    };
    return mine;
  });
});
</script>

<style></style>
