<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add budget item</div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <form ref="form">
        <div class="mb-3 row">
          <!-- <label for="name" class="col-md-2 col-form-label">Budget Item Name</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="name" v-model="budgetItem.name" /> -->
            <v-text-field v-model="budgetItem.name" clearable :rules="nameRules" variant="solo" label="budget item name" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="year" class="col-md-2 col-form-label">Year</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="number" id="email" v-model="budgetItem.year" /> -->
            <v-text-field type="number" v-model="budgetItem.year" clearable :rules="nameRules" variant="solo" label="budget item year" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="type" class="col-md-2 col-form-label">Type</label> -->
          <div class="col-md-12">
            <!-- <select class="form-control" id="type" v-model="budgetItem.type">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select> -->
            <v-select clearable label="budget item type" :items="budgetItems" item-title="type" item-value="val" :rules="nameRules" variant="solo" v-model="budgetItem.type"></v-select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="ministry" class="col-md-2 col-form-label">Ministry</label> -->
          <div class="col-md-12">
            <!-- <select class="form-control" id="ministry" v-model="budgetItem.ministry_id">
              <template v-for="(ministry, index) in ministries.value" :key="index">
                <option v-if="ministry.attributes.name" :value="ministry.id">{{ ministry.attributes.name }}</option>
              </template>
            </select> -->
            <v-select clearable :rules="nameRules" variant="solo" :items="ministries" item-title="attributes.name" item-value="id" label="Ministry" v-model="budgetItem.ministry_id" :hint="`${budgetItem.ministry_id}`"></v-select>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitBudgetItem">Add Budget Item</v-btn>
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
const form = ref(null);
const budgetItems = ref([
  { type: "Income", val: "income" },
  { type: "Expense", val: "expense" },
]);
const budgetItem = reactive({
  name: "",
  year: "",
  type: "",
  ministry_id: "",
});
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);

const toaster = reactive({});

onMounted(async () => {
  let getData = await useGetData("ministry");

  ministries.value = getData.data.data;
});

let submitBudgetItem = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitBudgetItem", () =>
    $fetch(api_base + "/budget-item", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: budgetItem,
    })
  );

  if (error.value) {
    toaster.value = {
      type: "error",
      title: "Add Budget Item",
      info: "Budget Item not added successfully!. Try again",
    };
  }
  if (data.value.data) {
    toaster.value = {
      type: "error",
      title: "Add Budget Item",
      info: "Budget Item added successfully!",
    };

    // budgetItem.name = "";
    // budgetItem.year = "";
    // budgetItem.type = "";
    // budgetItem.ministry_id = "";
    form.value.reset();
  }
};
</script>

<style></style>
