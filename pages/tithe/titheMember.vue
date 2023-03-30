<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">member tithe</div>
    <Loading :loading="loading" />

    <AgGrid :results="tithes" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const tithes = ref([]);
const loading = ref("");
const rowData = ref([]);
const router = useRouter();

const columnDefs = reactive([
  { headerName: "Paid By", field: "paidby" },
  { headerName: "Amount", field: "tithe", type: ["numberColumn"] },
  { headerName: "Paid On", field: "paidon", type: ["dateColumn"] },
]);

const recordClick = (event) => {
  let tithe = event.data;
  let getTithe = tithes.value.filter((res) => {
    return res.id == tithe.id;
  });
  // console.log(getTithe[0].attributes.member.id);
  router.push("memberDetail-" + event.data.id);
  // window.location.href = "/memberDetail-" + getTithe[0].attributes.member.id;
};

onMounted(async () => {
  let getData = await useGetData("tithe");

  loading.value = getData.pending;
  tithes.value = getData.data.data;
  let titheMembers = tithes.value.filter((res) => res.attributes.member !== null);
  rowData.value = titheMembers.map((res) => {
    if (res.attributes.member_id !== null) {
      // console.log(res.attributes);
      let mine = {
        // name: res.attributes.assembly.name,
        // district: res.attributes.assembly.district,
        // pastor: res.attributes.assembly.pastor,
        // status: res.attributes.assembly.status,
        // openedOn: res.attributes.assembly.openedOn,
        paidby: res.attributes.paidby,
        tithe: parseInt(res.attributes.amount),
        paidon: new Date(res.attributes.updated_at).toDateString(),
        id: res.id,
      };
      return mine;
    }
  });
});
</script>

<style></style>
