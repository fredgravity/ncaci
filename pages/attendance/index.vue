<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">attendance</div>
    <Loading :loading="loading" />
  </div>

  <div>
    <AgGrid :results="members" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
  </div>
</template>

<script setup>
const loading = ref("");
const rowData = ref([]);
const members = reactive([]);

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Phone", field: "phone" },
  { headerName: "Assembly", field: "assembly" },
  { headerName: "Ministry", field: "ministry" },
  { headerName: "Mark Date", field: "mark_date", type: ["dateColumn"] },
  { headerName: "CreatedBy", field: "createdBy" },
  //   { headerName: "CreatedAt", field: "createdAt", type: ["dateColumn"] },
]);

onMounted(async () => {
  let getData = await useGetData("attendance");

  loading.value = getData.pending;
  members.value = getData.data.data;
  // console.log(members.value);
  rowData.value = members.value.map((res) => {
    let mine = {
      name: res.attributes.member.name,
      email: res.attributes.member.email,
      phone: res.attributes.member.phone,
      assembly: res.attributes.assembly.name,
      ministry: res.attributes.member.ministry.name,
      mark_date: new Date(res.attributes.markDate).toDateString(),
      createdAt: new Date(res.attributes.created_at).toDateString(),
      createdBy: res.relationships["user name"],
      id: res.id,
    };
    return mine;
  });
});

const recordClick = async (event) => {
  //   console.log(event.data);
};
</script>

<style></style>
