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
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const areas = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Action", field: "action" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
]);

const recordClick = (event) => {
  if (event.value == "Edit") {
    // window.location.href = "/editMinistry-" + event.data.id;
  }
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/area", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  areas.value = data.value.data;
  rowData.value = areas.value.map((res) => {
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
