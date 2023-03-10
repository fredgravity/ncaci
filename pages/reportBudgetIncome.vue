<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">Budget Income</div>
    <Loading :loading="loading" />

    <div>
      <div class="card-body">
        <div class="text-center">
          <label for="ministry" class="col-md-12 col-form-label">Select Budget Year</label>
          <select name="" id="" class="tw-w-52 tw-mx-auto tw-bg-slate-400 tw-text-gray-50 tw-rounded-md tw-p-1 tw-text-center" @change="getYear($event)">
            <option v-for="i in 20" :key="i" :value="2019 + i">{{ 2019 + i }}</option>
            <!-- <option value="">2001</option>
            <option value="">2002</option> -->
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const budgets = ref([]);
const incomes = ref([]);
const budgetItems = ref([]);
const filterBudgetItems = ref([]);
const filterBudgets = ref([]);
const filterIncomes = ref([]);
const loading = ref("");

// get budget items
onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/budget", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  budgetItems.value = data.value.data;
  console.log(budgetItems.value);
});

// get budget income
onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/budget-item", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  budgets.value = data.value.data;
  console.log(budgets.value);
});

// get income
onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/income", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  incomes.value = data.value.data;
  console.log(incomes.value);
});

const getYear = async (event) => {
  console.log(event.target.value);

  const mapResult = new Map();

  incomes.value.forEach((element) => {
    if (mapResult.get(element.attributes.budget_item_name)) {
      mapResult.set(element.attributes.budget_item_name, mapResult.get(element.attributes.budget_item_name) + element.attributes.amount);
    } else {
      mapResult.set(element.attributes.budget_item_name, element.attributes.amount);
    }
  });

  console.log(mapResult);
};
</script>

<style></style>
