<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">member</div>

    <Loading :loading="loading" />

    <div>
      <AgGrid :results="members" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent class="tw-w-1/2">
        <!-- <template v-slot:activator="{ props }"> -->
        <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
        <!-- <div class="tw-flex tw-justify-items-start tw-text-green-400 tw-cursor-pointer hover:tw-border-b-2 tw-ease-linear tw-duration-200" v-bind="props">Pay Here</div> -->
        <!-- </template> -->
        <v-card class="tw-text-center">
          <v-card-title class="text-h5"> Pay Tithe - {{ tithe.paidby }} </v-card-title>
          <v-container class="tw-mb-2">
            <form ref="form">
              <div class="mb-3 row">
                <!-- <label for="name" class="col-md-2 col-form-label">Amount</label> -->
                <div class="col-md-12">
                  <!-- <v-select clearable  variant="solo" :items="ministries" item-title="attributes.name" item-value="id" label="Ministry" ></v-select> -->
                </div>
              </div>
              <div class="mb-3 row">
                <!-- <label for="name" class="col-md-2 col-form-label">Amount</label> -->
                <div class="col-md-12">
                  <!-- <input class="form-control" type="number" id="name" v-model="tithe.amount" /> -->
                  <v-text-field clearable variant="solo" type="number" label="tithe amount" v-model="tithe.amount"></v-text-field>
                </div>
              </div>

              <div class="mb-3 row">
                <!-- <label for="email" class="col-md-2 col-form-label">paidBy</label> -->
                <div class="col-md-12">
                  <!-- <input class="form-control" type="text" id="email" v-model="tithe.paidby" /> -->
                  <v-text-field clearable variant="solo" type="text" label="paid by" v-model="tithe.paidby"></v-text-field>
                </div>
              </div>
            </form>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="dialog = false"> Close </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="submitTitheMember"> Pay Now! </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script setup>
const members = reactive([]);
const loading = ref("");
const rowData = ref([]);
const dialog = ref(false);
const router = useRouter();
const form = ref(null);
const toaster = reactive({});
const tithe = reactive({
  amount: "",
  paidby: "",
  member_id: 1,
});

const columnDefs = reactive([
  { headerName: "Name", field: "name" },
  { headerName: "Gender", field: "gender" },
  { headerName: "DOB", field: "dob", type: ["dateColumn"] },
  { headerName: "Email", field: "email" },
  { headerName: "Phone", field: "phone" },
  { headerName: "Assembly", field: "assembly" },
  { headerName: "Ministry", field: "ministry" },
  { headerName: "CreatedBy", field: "createdBy" },
  { headerName: "CreatedAt", field: "createdAt", type: ["dateColumn"] },
  { headerName: "Edit", field: "edit", cellClass: "tw-bg-blue-400 tw-text-gray-50 tw-rounded-sm tw-cursor-pointer hover:tw-bg-blue-500 tw-font-bold" },
  { headerName: "Pay", field: "pay", cellClass: "tw-bg-gray-600 tw-text-gray-50 tw-rounded-sm tw-cursor-pointer hover:tw-bg-gray-500 tw-font-bold" },
  // { headerName: "Action", field: "action" },
]);

const recordClick = (event) => {
  if (event.value == "Edit") {
    // window.location.href = "/memberDetail-" + event.data.id;
    router.push("member/memberDetail-" + event.data.id);
  }
  if (event.value == "Pay Tithe") {
    dialog.value = true;

    tithe.member_id = event.data.id;
    tithe.paidby = event.data.name;
  }
};

onMounted(async () => {
  let getData = await useGetData("member");

  loading.value = getData.pending;
  members.value = getData.data.data;
  // console.log(members.value);
  rowData.value = members.value.map((res) => {
    let mine = {
      name: res.attributes.name,
      gender: res.attributes.gender,
      dob: res.attributes.dob,
      email: res.attributes.email,
      phone: res.attributes.phone,
      assembly: res.attributes.assembly.name,
      ministry: res.attributes.ministry.name,
      createdAt: new Date(res.attributes.created_at).toDateString(),
      createdBy: res.relationships["user name"],
      openedOn: res.attributes.openedOn,
      edit: "Edit",
      pay: "Pay Tithe",
      // action: "More >>",
      id: res.id,
    };
    return mine;
  });
});

let submitTitheMember = async () => {
  let submitData = await useSubmitData("submitTitheMember", "tithe", tithe);
  // error_message.value = error.value.data.message;

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Pay Member Tithe",
      info: submitData.error.value.data.message,
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Pay Member Tithe",
      info: "Church member tithe payed successfully!.",
    };
  }
};
</script>

<style></style>
