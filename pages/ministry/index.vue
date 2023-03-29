<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">ministry</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="ministries" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const ministries = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
  { headerName: "Action", field: "action" },
]);

const recordClick = (event) => {
  if (event.value == "Edit") {
    window.location.href = "/ministry/editMinistry-" + event.data.id;
  }
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/ministry", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  ministries.value = data.value.data;
  rowData.value = ministries.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      created_at: new Date(res.attributes.created_at).toDateString(),
      id: res.id,
      action: "Edit",
    };
    return mine;
  });
});
</script>

<style></style>
