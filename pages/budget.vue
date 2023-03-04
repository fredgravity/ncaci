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
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const budget = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Item", field: "budget_name" },
  { headerName: "Year", field: "year" },
  { headerName: "Amount", field: "amount" },
  { headerName: "Type", field: "type" },
  { headerName: "Ministry", field: "ministry" },
  // { headerName: "Status", field: "status" },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/budget", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  budget.value = data.value.data;
  console.log(budget.value);
  rowData.value = budget.value.map((res) => {
    let mine = {
      budget_name: res.attributes.budget_item_name,
      year: res.attributes.year,
      type: res.attributes.type,
      amount: res.attributes.amount,
      ministry: res.attributes.ministry,
      amount: res.attributes.amount,
      budget_item_id: res.attributes.budget_item_id,
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
