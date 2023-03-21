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
  console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/users", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  users.value = data.value;
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
