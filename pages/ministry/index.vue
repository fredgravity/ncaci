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
const router = useRouter();

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
  { headerName: "Action", field: "action" },
]);

const recordClick = (event) => {
  if (event.value == "Edit") {
    // window.location.href = "/ministry/editMinistry-" + event.data.id;
    router.push("/ministry/editMinistry-" + event.data.id);
  }
};

onMounted(async () => {
  let getData = await useGetData("ministry");

  loading.value = getData.pending;
  ministries.value = getData.data.data;
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
