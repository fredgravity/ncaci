<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">broadcast message</div>

    <Loading :loading="loading" />
    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <div class="mb-3 row" v-if="ministryItems.length > 0">
        <div class="col-md-12">
          <v-select clearable label="Broadcast to Ministry" :items="ministryItems" item-title="name" item-value="val" v-model="ministry.ministry_name"></v-select>
        </div>
      </div>

      <v-textarea clearable counter label="Broadcast Message" auto-grow model-value="" v-model="ministry.message"></v-textarea>

      <v-btn class="tw-w-full" @click="sendMessage">Send!</v-btn>
    </div>
  </div>
</template>

<script setup>
const ministries = ref([]);
const members = ref([]);
const loading = ref("");
const toaster = reactive({});
const ministry = reactive({
  ministry_name: "",
  message: "",
});

const ministryItems = ref([]);

const sendMessage = async () => {
  if (ministry.ministry_name == "" || ministry.message == "") {
    alert("ministry name and message can not be empty");
    return;
  }
  loading.value = true;
  let phoneNumbers = [];

  members.value.filter((res) => {
    if (res.attributes.ministry.name == ministry.ministry_name) {
      phoneNumbers.push(res.attributes.phone);
    }
  });

  let data = {
    phone: phoneNumbers,
    message: ministry.message,
  };

  if (phoneNumbers.length > 0) {
    let submitData = await useSubmitData("wishMember", "member-birthdays-message", data);

    loading.value = false;
    if (submitData.data.data.status != 1000) {
      toaster.value = {
        type: "error",
        title: "Happy Birthday",
        info: "Failed to send a happy birthday wish has been sent to member",
      };
    } else {
      toaster.value = {
        type: "info",
        title: "Happy Birthday",
        info: "A happy birthday wish has been sent to members",
      };

      ministry.message = "";
    }
  } else {
    toaster.value = {
      type: "error",
      title: "Happy Birthday",
      info: "No member has been sent a happy birthday wish",
    };
  }

  loading.value = false;
};

onMounted(async () => {
  let getData = await useGetData("ministry");
  let getDataMember = await useGetData("member");

  loading.value = getData.pending;
  ministries.value = getData.data.data;
  members.value = getDataMember.data.data;

  let result = ministries.value.map((res) => {
    return { name: res.attributes.name, val: res.attributes.name };
  });

  ministryItems.value = result;
});
</script>
