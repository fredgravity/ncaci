<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add assembly</div>
    </div>

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <form ref="form">
        <div class="mb-3 row">
          <!-- <label for="name" class="col-md-2 col-form-label">Assembly Name</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="name" v-model="assembly.name" /> -->
            <v-text-field v-model="assembly.name" clearable :rules="nameRules" variant="solo" label="assembly name" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="pastor" v-model="assembly.pastor" /> -->
            <v-text-field v-model="assembly.pastor" clearable :rules="nameRules" variant="solo" label="pastor" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-12">
            <!-- <input class="form-control" type="date" id="openedOn" v-model="assembly.openedOn" /> -->
            <v-text-field type="date" v-model="assembly.openedOn" clearable :rules="nameRules" variant="solo" label="opened on" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="status" class="col-md-2 col-form-label">Status</label> -->
          <div class="col-md-12">
            <!-- <select class="form-control" id="area" v-model="assembly.status">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select> -->
            <v-select clearable label="assembly status" :items="statusItems" item-title="status" item-value="val" :rules="nameRules" variant="solo" v-model="assembly.status"></v-select>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="area" class="col-md-12 col-form-label">Select an Area</label>
          <div class="col-md-12">
            <select class="form-control" id="area" v-model="assembly.area_id" @change="getDistrict($event)">
              <option value="" disabled>select here</option>
              <template v-for="(area, index) in areas" :key="index">
                <option v-if="area.attributes.name" :value="parseInt(area.id)">{{ area.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="district" class="col-md-2 col-form-label">District</label> -->
          <div class="col-md-12">
            <!-- <select class="form-control" id="district" v-model="assembly.district">
              <template v-for="(district, index) in filteredDistricts" :key="index">
                <option v-if="district.attributes" :value="district.attributes.name">{{ district.attributes.name }}</option>
              </template>
            </select> -->

            <v-select clearable variant="solo" :rules="nameRules" :items="filteredDistricts" item-title="attributes.name" item-value="attributes.name" label="district" v-model="assembly.district"></v-select>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitAssembly">Add Assembly</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const areas = ref([]);
const districts = ref([]);
const form = ref(null);
const filteredDistricts = ref([]);
const statusItems = ref([
  { status: "Active", val: "active" },
  { status: "Inactive", val: "inactive" },
]);
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);

const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

const assembly = reactive({
  name: "",
  area_id: "",
  district: "",
  pastor: "",
  openedOn: "",
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/area", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  areas.value = data.value.data;
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/district", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  districts.value = data.value.data;
});

const getDistrict = async (e) => {
  let res = districts.value.filter((res) => {
    console.log(res.attributes.area_id.toString());
    console.log(assembly.area_id);
    let data = res.attributes.area_id.toString() == assembly.area_id;
    return data;
  });

  filteredDistricts.value = res;
};

let submitAssembly = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitAssembly", () =>
    $fetch(api_base + "/assembly", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: assembly,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Church Assembly not added successfully!. Try again";
    error_message.title = "Add Assembly";
  } else {
    // alert();
    error_message.type = "success";
    error_message.text = "Church Assembly added successfully!";
    error_message.title = "Add Assembly";

    // assembly.area_id = "";
    // assembly.district = "";

    form.value.reset();
  }
};
</script>

<style></style>
