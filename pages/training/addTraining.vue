<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add training</div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <v-form ref="form">
        <div class="mb-3 row">
          <!-- <label for="participant" class="col-md-2 col-form-label">Participant</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="participant" v-model="training.participant" /> -->
            <v-text-field v-model="training.participant" clearable :rules="nameRules" variant="solo" label="participant" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="position" class="col-md-2 col-form-label">Position</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="position" v-model="training.position" /> -->
            <v-text-field v-model="training.position" clearable :rules="nameRules" variant="solo" label="position" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="phone" class="col-md-2 col-form-label">Phone</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="phone" v-model="training.phone" /> -->
            <v-text-field v-model="training.phone" clearable :rules="nameRules" variant="solo" type="number" hint="eg: 0244123456" label="phone" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="email" class="col-md-2 col-form-label">Email</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="email" id="email" v-model="training.email" /> -->
            <v-text-field v-model="training.email" clearable :rules="nameRules" variant="solo" label="email" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <label for="ministry" class="col-md-2 col-form-label">Training Item</label>
          <div class="col-md-12">
            <select class="form-control" id="ministry" v-model="training.training_item_id" @change="getTraining($event)">
              <template v-for="(item, index) in trainingItems" :key="index">
                <option v-if="item.attributes.name" :value="item.id">{{ item.attributes.name }}</option>
              </template>
            </select>
            <!-- <v-select clearable :rules="nameRules" variant="solo" :items="trainingItems" item-title="attributes.name" item-value="id" label="training item" v-model="training.training_item_id"></v-select> -->
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="startDate" class="col-md-2 col-form-label">Start Date</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="date" id="startDate" v-model="trainingItem.startDate" /> -->
            <v-text-field v-model="training.startDate" type="date" clearable :rules="nameRules" variant="solo" label="start date" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="startDate" class="col-md-2 col-form-label">Start Date</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="date" id="startDate" v-model="training.startDate" /> -->
            <v-text-field v-model="training.endDate" type="date" clearable :rules="nameRules" variant="solo" label="end date" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="venue" class="col-md-2 col-form-label">Venue</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="venue" v-model="trainingItem.venue" /> -->
            <v-text-field v-model="training.venue" clearable :rules="nameRules" variant="solo" label="venue" required></v-text-field>
          </div>
        </div>

        <v-select clearable :rules="nameRules" variant="solo" :items="ministries" item-title="attributes.name" item-value="attributes.name" label="Ministry" v-model="training.ministry"></v-select>

        <div class="mb-3 row">
          <label for="assembly" class="col-md-12 col-form-label">Select Assembly</label>
          <div class="col-md-12">
            <select class="form-control" id="assembly" v-model="training.assembly" @change="getAssembly($event)">
              <option value="" disabled>select here</option>
              <template v-for="(item, index) in assemblies.value" :key="index">
                <option v-if="item.attributes.name" :value="item.attributes.name">{{ item.attributes.name }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="district" class="col-md-2 col-form-label">District</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="district" v-model="training.district" /> -->
            <v-text-field v-model="training.district" clearable :rules="nameRules" variant="solo" label="district" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="area" class="col-md-2 col-form-label">Area</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="area" v-model="training.area" /> -->
            <v-text-field v-model="training.area" clearable :rules="nameRules" variant="solo" label="area" required></v-text-field>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitTraining">Add Training</v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
const assemblies = reactive([]);
const trainingItems = ref([]);
const ministries = ref([]);
const form = ref("");
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);

const toaster = reactive({});

const training = reactive({
  training_item_id: "",
  participant: "",
  position: "",
  phone: "",
  email: "",
  startDate: "",
  endDate: "",
  venue: "",
  ministry: "",
  assembly: "",
  district: "",
  area: "",
});

onMounted(async () => {
  let getData1 = await useGetData("ministry");
  let getData2 = await useGetData("assembly");
  let getData = await useGetData("training-item");

  assemblies.value = getData2.data.data;
  ministries.value = getData1.data.data;
  trainingItems.value = getData.data.data;
});

const getTraining = async (event) => {
  let result = trainingItems.value.filter((res) => {
    return res.id == event.target.value;
  });

  training.startDate = result[0].attributes.startDate;
  training.endDate = result[0].attributes.endDate;
  training.venue = result[0].attributes.venue;
  training.ministry = result[0].attributes.ministry_name;
};

const getAssembly = async (event) => {
  let result = assemblies.value.filter((res) => {
    return res.attributes.name == event.target.value;
  });

  training.district = result[0].attributes.district;
  training.area = result[0].attributes.area.name;
};

let submitTraining = async () => {
  let submitData = await useSubmitData("submitTraining", "training", training);

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Add Training",
      info: "Training not added successfully!. Try again",
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Add Training",
      info: "Training added successfully!",
    };

    // training.training_item_id = "";
    // training.startDate = "";
    // training.endDate = "";
    // training.ministry = "";
    // training.participant = "";
    // training.position = "";
    // training.venue = "";
    // training.phone = "";
    // training.assembly = "";
    // training.area = "";
    // training.district = "";
    // training.email = "";

    form.value.reset();
  }
};
</script>

<style></style>
