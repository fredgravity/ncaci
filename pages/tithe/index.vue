<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">tithe</div>
    <Loading :loading="loading" />
    <AgGrid :results="tithes" :columnDefs="columnDefs" :rowData="rowData" />
  </div>
</template>

<script setup>
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const tithes = reactive([]);
const loading = ref("");
const assemblies = ref([]);
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Assembly", field: "name" },
  { headerName: "Area", field: "area" },
  { headerName: "District", field: "district" },
  { headerName: "Pastor", field: "pastor" },
  { headerName: "Status", field: "status" },
  { headerName: "Tithe Year", field: "tithe_year", type: ["numberColumn"] },
  { headerName: "OpenedOn", field: "openedOn", type: ["dateColumn"] },
  { headerName: "Total Tithe", field: "total", type: ["numberColumn"] },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
]);

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/assembly", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });
  loading.value = pending.value;
  assemblies.value = data.value.data;

  let assembliesFiltered = assemblies.value.filter((res) => {
    return res.attributes.tithe.length > 0;
  });

  // let titheAssembly = titheFiltered.filter((res) => res.attributes.member !== null);

  rowData.value = assembliesFiltered.map((res) => {
    //
    let mine = {
      name: res.attributes.name,
      area: res.attributes.area.name,
      district: res.attributes.district,
      pastor: res.attributes.pastor,
      status: res.attributes.status,
      tithe_year: res.attributes.tithe.reduce((acc, curr) => {
        return new Date(curr.created_at).getFullYear();
      }, 0),
      openedOn: res.attributes.openedOn,
      created_at: new Date(res.attributes.created_at).toDateString(),
      total: res.attributes.tithe.reduce((acc, curr) => {
        return parseInt(acc) + parseInt(curr.amount);
      }, 0),
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
