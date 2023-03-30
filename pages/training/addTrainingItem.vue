<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add training item</div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <form ref="form">
        <div class="mb-3 row">
          <!-- <label for="name" class="col-md-2 col-form-label">Training Item Name</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="name" v-model="trainingItem.name" /> -->
            <v-text-field v-model="trainingItem.name" clearable :rules="nameRules" variant="solo" label="training item name" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="startDate" class="col-md-2 col-form-label">Start Date</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="date" id="startDate" v-model="trainingItem.startDate" /> -->
            <v-text-field v-model="trainingItem.startDate" type="date" clearable :rules="nameRules" variant="solo" label="start date" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="startDate" class="col-md-2 col-form-label">Start Date</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="date" id="startDate" v-model="trainingItem.startDate" /> -->
            <v-text-field v-model="trainingItem.endDate" type="date" clearable :rules="nameRules" variant="solo" label="end date" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="venue" class="col-md-2 col-form-label">Venue</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="venue" v-model="trainingItem.venue" /> -->
            <v-text-field v-model="trainingItem.venue" clearable :rules="nameRules" variant="solo" label="venue" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="ministry" class="col-md-2 col-form-label">Ministry</label> -->
          <div class="col-md-12">
            <!-- <select class="form-control" id="ministry" v-model="trainingItem.ministry_id">
              <template v-for="(ministry, index) in ministries.value" :key="index">
                <option v-if="ministry.attributes.name" :value="ministry.id">{{ ministry.attributes.name }}</option>
              </template>
            </select> -->

            <v-select clearable :rules="nameRules" variant="solo" :items="ministries" item-title="attributes.name" item-value="id" label="Ministry" v-model="trainingItem.ministry_id"></v-select>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitTrainingItem">Add Training Item</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const ministries = ref([]);
const form = ref(null);
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);
const trainingItem = reactive({
  name: "",
  startDate: "",
  endDate: "",
  ministry_id: "",
  venue: "",
});

const toaster = reactive({});

onMounted(async () => {
  let getData = await useGetData("ministry");

  ministries.value = getData.data.data;
});

let submitTrainingItem = async () => {
  let submitData = await useSubmitData("submitTrainingItem", "training-item", trainingItem);

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Add District",
      info: "Training item not added successfully!. Try again",
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Add District",
      info: "Training item added successfully!",
    };

    // trainingItem.name = "";
    // trainingItem.startDate = "";
    // trainingItem.endDate = "";
    // trainingItem.ministry_id = "";
    // trainingItem.venue = "";
    form.value.reset();
  }
};
</script>

<style></style>
