<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add training item</div>

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <form>
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
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const ministries = ref([]);
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

const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/ministry", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  ministries.value = data.value.data;
});

let submitTrainingItem = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitTrainingItem", () =>
    $fetch(api_base + "/training-item", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: trainingItem,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Training item not added successfully!. Try again";
    error_message.title = "Add District";
  } else {
    error_message.type = "success";
    error_message.text = "Training item added successfully!";
    error_message.title = "Add District";

    trainingItem.name = "";
    trainingItem.startDate = "";
    trainingItem.endDate = "";
    trainingItem.ministry_id = "";
    trainingItem.venue = "";
  }
};
</script>

<style></style>
