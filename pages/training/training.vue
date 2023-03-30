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
const trainings = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Training", field: "name" },
  { headerName: "Participant", field: "participant" },
  { headerName: "Phone", field: "phone" },
  { headerName: "Position", field: "position" },
  { headerName: "Start Date", field: "startDate", type: ["dateColumn"] },
  { headerName: "End Date", field: "endDate", type: ["dateColumn"] },
  { headerName: "Venue", field: "venue" },
  { headerName: "Organised By", field: "ministry" },
  { headerName: "Created By", field: "createdBy" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  // console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  let getData = await useGetData("training");

  loading.value = getData.pending;
  trainings.value = getData.data.data;
  rowData.value = trainings.value.map((res) => {
    let mine = {
      name: res.attributes.training_item_name,
      participant: res.attributes.participant,
      phone: res.attributes.phone,
      position: res.attributes.position,
      created_at: new Date(res.attributes.created_at).toDateString(),
      startDate: new Date(res.attributes.startDate).toDateString(),
      endDate: new Date(res.attributes.endDate).toDateString(),
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
