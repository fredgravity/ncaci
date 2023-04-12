<template>
  <div>
    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>
    <Loading :loading="loading" />
    <div class="col-md-12 order-2 mb-4">
      <div class="tw-shadow-xl h-100">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h5 class="card-title m-0 me-2">Birthdays Pending</h5>
          <h5 class="card-title m-0 me-2 tw-text-xs">Today is - {{ new Date().toDateString() }}</h5>
        </div>
        <div class="card-body">
          <ul class="p-0 m-0">
            <li class="d-flex mb-4 pb-1" v-for="(member, index) in birthday" :key="index">
              <div class="avatar flex-shrink-0 me-3" v-if="member.gender == 'female'">
                <img src="~/assets/assets/img/avatars/6.png" alt="User" class="rounded" />
              </div>
              <div class="avatar flex-shrink-0 me-3" v-else>
                <img src="~/assets/assets/img/avatars/7.png" alt="User" class="rounded" />
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <small class="d-block mb-0">{{ member.name }}</small>
                  <h6 class="mb-0 text-muted d-block tw-text-xs">{{ member.phone }}</h6>
                  <h6 class="mb-0 text-muted d-block tw-text-xs">{{ member.assembly }}</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                  <v-btn size="x-small" class="text-muted tw-text-xs tw-mr-4" @click="wishMember(member)" v-if="member.send">{{ member.send }}</v-btn>
                  <h6 class="mb-0">{{ member.dob }}</h6>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from "@vueuse/core";
const members = ref([]);
const birthday = ref([]);
const toaster = reactive({});
const loading = ref(false);
const state = useStorage("bdayMessage");

const wishMember = async (member) => {
  // process sms here
  loading.value = true;

  let data = {
    phone: [member.phone],
    message: state.value,
  };

  let submitData = await useSubmitData("wishMember", "member-birthdays-message", data);
  loading.value = false;
  console.log(submitData.data.data.status);
  if (submitData.data.data.status != "success") {
    toaster.value = {
      type: "error",
      title: "Happy Birthday",
      info: "Failed to send a happy birthday wish has been sent to member",
    };
  } else {
    toaster.value = {
      type: "info",
      title: "Happy Birthday",
      info: "A happy birthday wish has been sent to member",
    };
  }
};

onMounted(async () => {
  let getData = await useGetData("member-birthdays");

  let today = new Date();
  let month = (today.getMonth() + 1).toString().padStart(2, "0");
  let day = today.getDate().toString().padStart(2, "0");
  let nowDate = [month, day].join("/");

  members.value = getData.data.data;
  birthday.value = [];
  members.value.map((res) => {
    let mySplit = res.attributes.dob.split("-");
    let newDate = mySplit[1].concat("/", mySplit[2]);
    if (nowDate == newDate) {
      birthday.value.push({
        name: res.attributes.name,
        assembly: res.attributes.assembly.name,
        dob: res.attributes.dob,
        gender: res.attributes.gender,
        phone: res.attributes.phone,
        send: "Wish!",
      });
    } else {
      birthday.value.push({
        name: res.attributes.name,
        assembly: res.attributes.assembly.name,
        dob: res.attributes.dob,
        gender: res.attributes.gender,
        phone: res.attributes.phone,
        send: "",
      });
    }
  });
});
</script>

<style></style>
