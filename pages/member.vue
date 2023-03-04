<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">member</div>

    <Loading :loading="loading" />

    <div>
      <AgGrid :results="members" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const members = reactive([]);
const loading = ref("");
const rowData = ref([]);

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Gender", field: "gender" },
  { headerName: "DOB", field: "dob" },
  { headerName: "Email", field: "email" },
  { headerName: "Phone", field: "phone" },
  { headerName: "Assembly", field: "assembly" },
  { headerName: "Ministry", field: "ministry" },
  { headerName: "Action", field: "action" },
  // { headerName: "Action", field: "action" },
]);

const recordClick = (event) => {
  console.log(event);
  if (event.value == "Edit") {
    window.location.href = "/memberDetail-" + event.data.id;
  }
};

onMounted(async () => {
  const loginStore = useLoginStore();
  const accessToken = await loginStore.getAccessToken;

  const { data, error, refresh, pending } = await useFetch(api_base + "/member", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  members.value = data.value.data;
  console.log(members.value);
  rowData.value = members.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      gender: res.attributes.gender,
      dob: res.attributes.dob,
      email: res.attributes.email,
      phone: res.attributes.phone,
      assembly: res.attributes.assembly.name,
      ministry: res.attributes.ministry.name,
      openedOn: res.attributes.openedOn,
      action: "Edit",
      // action: "More >>",
      id: res.id,
    };
    return mine;
  });
});
</script>

<style></style>
