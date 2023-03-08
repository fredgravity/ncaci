<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add budget</div>

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <form ref="form">
        <div class="mb-3 row">
          <label for="ministry" class="col-md-12 col-form-label">Select Budget Item</label>
          <div class="col-md-12">
            <select class="form-control" id="ministry" v-model="budget.budget_item_id" @change="getBudgetItems($event)">
              <option value="" disabled>select here</option>
              <template v-for="(budget, index) in budgetItems.value" :key="index">
                <option v-if="budget.attributes.name" :value="budget.id">{{ budget.attributes.name }} - {{ budget.attributes.year }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="year" class="col-md-2 col-form-label">Year</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="number" id="email" v-model="budget.year" disabled /> -->
            <v-text-field disabled v-model="budget.year" clearable :rules="nameRules" variant="solo" label="budget year" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="type" class="col-md-2 col-form-label">Type</label> -->
          <div class="col-md-12">
            <!-- <select class="form-control" id="type" v-model="budget.type" disabled>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select> -->

            <v-select disabled clearable label="budget item type" :items="budgetItemTypes" item-title="type" item-value="val" :rules="nameRules" variant="solo" v-model="budget.type"></v-select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="ministry" class="col-md-2 col-form-label">Ministry</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="email" v-model="budget.ministry" disabled /> -->
            <v-text-field disabled v-model="budget.ministry" clearable :rules="nameRules" variant="solo" label="ministry" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="amount" class="col-md-2 col-form-label">Amount</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="number" id="email" v-model="budget.amount" /> -->
            <v-text-field type="number" v-model="budget.amount" clearable :rules="nameRules" variant="solo" label="budget amount" required></v-text-field>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitBudget">Add Budget</v-btn>
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
const ministries = reactive([]);
const form = ref(null);
const budgetItems = reactive([]);
const budgetItemTypes = ref([
  { type: "Income", val: "income" },
  { type: "Expense", val: "expense" },
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
const budget = reactive({
  budget_item_id: "",
  year: "",
  amount: "",
  type: "",
  ministry: "",
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
  console.log(ministries.value);
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/budget-item", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  budgetItems.value = data.value.data;
});

const getBudgetItems = async (event) => {
  let result = budgetItems.value.filter((res) => {
    return res.id == event.target.value;
  });
  console.log(result[0].attributes.name);
  budget.year = result[0].attributes.year;
  budget.type = result[0].attributes.type;
  budget.ministry = result[0].attributes.ministry_name;
};

let submitBudget = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitBudget", () =>
    $fetch(api_base + "/budget", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: budget,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Budget not added successfully!. Try again";
    error_message.title = "Add Budget";
  } else {
    error_message.type = "success";
    error_message.text = "Budget added successfully!";
    error_message.title = "Add Budget";

    // budget.year = "";
    // budget.type = "";
    // budget.amount = "";
    // budget.ministry = "";
    // budget.budget_item_id = "";
    form.value.reset();
  }
};
</script>

<style></style>
