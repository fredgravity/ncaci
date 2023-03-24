<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">mark attendance</div>
    <Loading :loading="loading" />
  </div>

  <template v-if="error_message.type">
    <Alert :alert="error_message" v-if="error_message" />
  </template>

  <div class="tw-w-full tw-flex tw-gap-1 tw-justify-evenly tw-flex-wrap">
    <div class="tw-basis-1/2">
      <v-select clearable label="Assembly" :items="assemblyItems" item-title="assembly" item-value="val" variant="solo" v-model="assembly.name"></v-select>
    </div>

    <div class="tw-basis-1/2">
      <!-- <input class="form-control" type="text" id="name" v-model="user.name" /> -->
      <v-text-field v-model="assembly.date" clearable variant="solo" label="Date" type="date" required></v-text-field>
    </div>
  </div>

  <div>
    <AgGrid :key="componentKey" :results="members" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
  </div>
</template>

<script setup>
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const loading = ref("");
const rowData = ref([]);
const members = reactive([]);
const componentKey = ref(0);
const assembly = reactive({
  name: "",
  date: "",
});

const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

const forceRerender = () => {
  componentKey.value += 1;
};

const assemblyItems = ref([]);

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Email", field: "email" },
  { headerName: "Phone", field: "phone" },
  { headerName: "Assembly", field: "assembly" },
  { headerName: "Ministry", field: "ministry" },
  { headerName: "Attendance", field: "mark", cellClass: "tw-text-blue-500 tw-font-semibold hover:tw-cursor-pointer hover:tw-text-blue-300" },
  //   { headerName: "CreatedAt", field: "createdAt", type: ["dateColumn"] },
]);

const recordClick = async (event) => {
  if (assembly.date == "" && event.value == "Mark") {
    alert("Please select an attendance date ");
    return;
  }
  if (assembly.date && event.value == "Mark") {
    let attendaceDate = {
      assembly_id: event.data.assembly_id,
      member_id: event.data.member_id,
      mark_date: assembly.date,
    };

    const { data, pending, error, refresh } = await useAsyncData("submitAttendance", () =>
      $fetch(api_base + "/attendance", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + accessToken.accessToken,
        },
        body: attendaceDate,
      })
    );

    if (error.value) {
      error_message.type = "error";
      error_message.text = "Member Attendance not added successfully!. Try again";
      error_message.title = "Add Attendance";
      // form.value.reset();
    } else {
      error_message.type = "success";
      error_message.text = "Member Attendance  added successfully!.";
      error_message.title = "Add Attendance";
    }
  }
};

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/assembly", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });

  assemblyItems.value = [];
  data.value.data.filter((res) => {
    assemblyItems.value.push({ assembly: res.attributes.name, val: res.attributes.name });
  });
});

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/member", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: true,
  });
  loading.value = pending.value;
  members.value = data.value.data;
});

watch(assembly, (newAssembly) => {
  if (newAssembly.name !== "") {
    let filterMembers = members.value.filter((res) => {
      return res.attributes.assembly.name == newAssembly.name;
    });

    rowData.value = filterMembers.map((res) => {
      let mine = {
        name: res.attributes.name,
        email: res.attributes.email,
        phone: res.attributes.phone,
        assembly: res.attributes.assembly.name,
        assembly_id: res.attributes.assembly.id.toString(),
        member_id: res.id,
        ministry: res.attributes.ministry.name,
        mark: "Mark",
        id: res.id,
      };
      return mine;
    });

    forceRerender();
  }
});
</script>

<style></style>
