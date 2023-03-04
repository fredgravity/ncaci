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
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const assemblies = reactive([]);
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Assembly", field: "name" },
  { headerName: "Area", field: "area" },
  { headerName: "District", field: "district" },
  { headerName: "Pastor", field: "pastor" },
  { headerName: "Status", field: "status" },
  { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
  { headerName: "Action", field: "action" },
]);

const recordClick = (event) => {
  console.log(event.data);
  if (event.value == "Edit") {
    window.location.href = "/assemblyDetail-" + event.data.id;
  }
};

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
  console.log(assemblies.value);
  rowData.value = assemblies.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      area: res.attributes.area.name,
      district: res.attributes.district,
      pastor: res.attributes.pastor,
      status: res.attributes.status,
      openedOn: res.attributes.openedOn,
      id: res.id,
      action: "Edit",
    };
    return mine;
  });
});
</script>

<style></style>
