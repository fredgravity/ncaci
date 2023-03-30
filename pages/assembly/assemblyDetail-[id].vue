<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">edit assembly</div>
    </div>

    <Loading :loading="loading" />

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <form class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <!--  -->
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
      <!--  -->

      <div class="text-center">
        <v-btn type="button" @click="submitAssembly">Update Assembly</v-btn>
      </div>
    </form>
  </div>
</template>

<script setup>
const assembly_id = ref("");
const areas = ref("");
const districts = ref("");
const filteredDistricts = ref([]);
const route = useRoute();
const loading = ref("");
const toaster = reactive({});

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

const assembly = reactive({
  name: "",
  area_id: "",
  status: "",
  openedOn: "",
  district: "",
  pastor: "",
});

onMounted(async () => {
  assembly_id.value = route.params.id;
  let getData1 = await useGetData("area");
  let getData2 = await useGetData("district");
  let getData = await useGetData("assembly/" + assembly_id.value);

  loading.value = getData.pending;

  let result = getData.data.data;
  assembly.name = result.attributes.name;
  assembly.area_id = result.attributes.area_id;
  assembly.status = result.attributes.status;
  assembly.openedOn = result.attributes.openedOn;
  assembly.district = result.attributes.district;
  assembly.pastor = result.attributes.pastor;

  areas.value = getData1.data.data;
  districts.value = getData2.data.data;
});

const getDistrict = async (e) => {
  let res = districts.value.filter((res) => {
    let data = res.attributes.area_id.toString() == assembly.area_id;
    return data;
  });

  filteredDistricts.value = res;
};

let submitAssembly = async () => {
  let submitData = await useSubmitData("submitAssembly", "assembly/" + assembly_id.value, assembly, "put");

  loading.value = submitData.pending;

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Update assembly",
      info: submitData.error.value.data.message,
    };
  }
  if (submitData.data.data) {
    toaster.value = {
      type: "success",
      title: "Update assembly",
      info: "Church Assembly updated successfully!",
    };
  }
};
</script>

<style></style>
