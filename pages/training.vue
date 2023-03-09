<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">training</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="trainings" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const trainings = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Training", field: "name" },
  { headerName: "Participant", field: "participant" },
  { headerName: "Phone", field: "phone" },
  { headerName: "Position", field: "position" },
  { headerName: "Start Date", field: "startDate" },
  { headerName: "End Date", field: "endDate" },
  { headerName: "Venue", field: "venue" },
  { headerName: "Organised By", field: "ministry" },
  { headerName: "Created By", field: "createdBy" },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/training", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  trainings.value = data.value.data;
  console.log(trainings.value);
  rowData.value = trainings.value.map((res) => {
    let mine = {
      name: res.attributes.training_item_name,
      participant: res.attributes.participant,
      phone: res.attributes.phone,
      position: res.attributes.position,
      startDate: res.attributes.startDate,
      endDate: res.attributes.endDate,
      venue: res.attributes.venue,
      ministry: res.attributes.ministry,
      training_item_id: res.attributes.training_item_id,
      createdBy: res.relationships["user name"],
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
