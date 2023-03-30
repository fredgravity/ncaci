<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add member</div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-2/3 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <v-form ref="form" @submit.prevent>
        <div class="mb-3 row">
          <!-- <label for="name" class="col-md-2 col-form-label">Name</label> -->
          <div class="col-md-10">
            <!-- <input class="form-control" type="text" id="name" v-model="member.name" /> -->
            <v-text-field v-model="member.name" clearable :rules="nameRules" variant="solo" label="name" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="email" class="col-md-2 col-form-label">Email</label> -->
          <div class="col-md-10">
            <!-- <input class="form-control" type="email" id="email" v-model="member.email" /> -->
            <v-text-field v-model="member.email" clearable :rules="nameRules" variant="solo" label="email" type="email" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="home_town" class="col-md-2 col-form-label">Home Town</label> -->
          <div class="col-md-10">
            <!-- <input class="form-control" type="text" id="home_town" v-model="member.home_town" /> -->
            <v-text-field v-model="member.home_town" clearable :rules="nameRules" variant="solo" label="home_town" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="phone" class="col-md-2 col-form-label">Phone</label> -->
          <div class="col-md-10">
            <!-- <input class="form-control" type="tel" id="phone" v-model="member.phone" /> -->
            <v-text-field v-model="member.phone" clearable :rules="nameRules" variant="solo" hint="eg: 0244123456" label="phone" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="dob" class="col-md-2 col-form-label">Date of Birth</label> -->
          <div class="col-md-10">
            <!-- <input class="form-control" type="date" id="dob" v-model="member.dob" /> -->
            <v-text-field v-model="member.dob" clearable :rules="nameRules" variant="solo" label="dob" type="date" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="gender" class="col-md-2 w-full col-form-label">Gender</label> -->
          <div class="col-md-10">
            <v-select clearable label="gender" :items="genderItems" item-title="gender" item-value="val" :rules="nameRules" variant="solo" v-model="member.gender"></v-select>
          </div>
        </div>
        <div class="mb-3 row">
          <!-- <label for="marital_status" class="col-md-2 col-form-label">Marital Status</label> -->
          <div class="col-md-10">
            <v-select clearable label="marital status" :items="maritalItems" item-title="status" item-value="val" :rules="nameRules" variant="solo" v-model="member.marital_status"></v-select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="assembly" class="col-md-2 col-form-label">Assembly</label> -->
          <div class="col-md-10">
            <!-- <select class="form-control" id="assembly" v-model="member.assembly_id">
              <template v-for="(assembly, index) in assemblies.value" :key="index">
                <option v-if="assembly.attributes.name" :value="assembly.id">{{ assembly.attributes.name }}</option>
              </template>
            </select> -->
            <v-select clearable :rules="nameRules" variant="solo" :items="assemblies" item-title="attributes.name" item-value="id" label="Assembly" v-model="member.assembly_id"></v-select>
          </div>
        </div>
        <div class="mb-3 row">
          <!-- <label for="ministry" class="col-md-2 col-form-label">Ministry</label> -->
          <div class="col-md-10">
            <!-- <select class="form-control" id="ministry" v-model="member.ministry_id">
              <template v-for="(ministry, index) in ministries.value" :key="index">
                <option v-if="ministry.attributes.name" :value="ministry.id">{{ ministry.attributes.name }}</option>
              </template>
            </select> -->
            <v-select clearable :rules="nameRules" variant="solo" :items="ministries" item-title="attributes.name" item-value="id" label="Ministry" v-model="member.ministry_id" :hint="`${member.ministry_id}`"></v-select>
          </div>
        </div>
        <div class="tw-mb-3 tw-w-full">
          <!-- <label for="Address" class="col-md-2 col-form-label">Address</label> -->
          <!-- <textarea class="form-control" id="Address" rows="3" v-model="member.address"></textarea> -->
          <v-textarea clearable :rules="nameRules" variant="solo" counter label="Address" auto-grow model-value="" v-model="member.address"></v-textarea>
        </div>
        <div class="text-center">
          <v-btn variant="outlined" type="submit" @click="submitMember"> Add Member </v-btn>
          <!-- <button type="button" class="" >Add Member</button> -->
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const assemblies = ref([]);
const ministries = ref([]);
const form = ref(null);
const toaster = reactive({});
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);
const genderItems = ref([
  { gender: "Male", val: "male" },
  { gender: "Female", val: "female" },
]);
const maritalItems = ref([
  { status: "Single", val: "single" },
  { status: "Married", val: "married" },
]);

const member = reactive({
  name: "",
  email: "",
  home_town: "",
  phone: "",
  dob: "",
  gender: "",
  assembly_id: "",
  ministry_id: "",
  marital_status: "",
  address: "",
});

onMounted(async () => {
  let getData1 = await useGetData("assembly");
  let getData2 = await useGetData("ministry");

  assemblies.value = getData1.data.data;
  ministries.value = getData2.data.data;
});

let submitMember = async () => {
  const { data, pending, error, refresh } = await useAsyncData("member", () =>
    $fetch(api_base + "/member", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: member,
    })
  );

  if (error.value) {
    toaster.value = {
      type: "error",
      title: "Add Member",
      info: "Church member not added successfully!. Try again",
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Add Member",
      info: "Church member added successfully!.",
    };

    // member.name = "";
    // member.email = "";
    // member.home_town = "";
    // member.phone = "";
    // member.dob = "";
    // member.gender = "";
    // member.assembly_id = "";
    // member.ministry_id = "";
    // member.marital_status = "";
    // member.address = "";

    form.value.reset();
  }
};
</script>

<style></style>
