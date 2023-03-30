<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">user</div>
    <Loading :loading="loading" />

    <div>
      <AgGrid :results="users" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
const api_base = useRuntimeConfig().public.apiBase;
const users = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Role", field: "role" },
  { headerName: "Created On", field: "created_at", type: "dateColumn" },

  // { headerName: "Status", field: "status" },
  // { headerName: "OpenedOn", field: "openedOn", filter: "agDateColumnFilter" },
]);

const recordClick = (event) => {
  // console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  let getData = await useGetData("users");

  loading.value = getData.pending;
  users.value = getData.data;
  rowData.value = users.value.map((res) => {
    let mine = {
      name: res.name,
      email: res.email,
      role: res.role,
      created_at: new Date(res.created_at).toDateString(),
      id: res.id,
    };
    return mine;
  });
});
</script>
