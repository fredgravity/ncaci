<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">Budget Income</div>
    <Loading :loading="loading" />

    <div>
      <div class="card-body">
        <div class="text-center">
          <!-- <label for="ministry" class="col-md-12 col-form-label">Select Budget Year</label> -->
          <select name="" id="" class="tw-w-52 tw-mx-auto tw-bg-slate-400 tw-text-gray-50 tw-rounded-md tw-p-1 tw-text-center" @change="getYear($event)">
            <option disabled selected>Select Budget Year</option>
            <option v-for="i in 20" :key="i" :value="2019 + i">{{ 2019 + i }}</option>
          </select>
        </div>
      </div>
    </div>

    <div>
      <AgGrid :results="budgetItems" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
    </div>

    <div class="tw-mt-20" v-if="budgetItemIncome.length > 0">
      <ReportBudgetIncome :data="budgetItemIncome" :dataValue="chartIncome" />
    </div>
  </div>
</template>

<script setup>
import _, { map } from "underscore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const budgetItems = ref([]);
const loading = ref("");
const budgetItemIncome = ref([]);
// const budgetItemExpense = ref([]);
const rowData = ref([]);
const chartIncome = reactive({
  budget: [],
  actual: [],
});

const columnDefs = reactive([
  { headerName: "Details", field: "details" },
  { headerName: "Distribution %", field: "distribution" },
  { headerName: "Budget", field: "budget" },
  { headerName: "Actual", field: "actual" },
  { headerName: "Variance -%", field: "variance" },
]);

// get budget items
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
  budgetItems.value = data.value.data;
  console.log(budgetItems.value);
});

const gettotalIncomeBudget = () => {
  chartIncome.budget = [];
  let total = _.reduce(
    budgetItemIncome.value,
    (acc, curr) => {
      if (curr.attributes.budget.length > 0) {
        chartIncome.budget.push(parseInt(curr.attributes.budget[0].amount));
        console.log(parseInt(curr.attributes.budget[0].amount));
        let summ = parseInt(acc) + parseInt(curr.attributes.budget[0].amount);
        console.log(summ);
        return summ;
      }
      return 0;
    },
    0
  );
  console.log(chartIncome.budget);
  let ab = _.reduce(
    chartIncome.budget,
    (acc, cur) => {
      return acc + cur;
    },
    0
  );
  console.log(ab);
  return ab;
};

const gettotalIncomeActualArry = () => {
  chartIncome.actual = [];
  let mapResult = _.map(budgetItemIncome.value, (res) => {
    if (res.attributes.budget.length > 0) {
      let result = _.reduce(
        res.attributes.budget[0].incomes,
        (acc, curr) => {
          chartIncome.actual.push(parseInt(curr.amount));

          return parseInt(acc) + parseInt(curr.amount);
        },
        0
      );
      return result;
    }
  });
  return mapResult;
};

const getYear = async (event) => {
  budgetItemIncome.value = _.filter(budgetItems.value, (res) => {
    return parseInt(res.attributes.year) == parseInt(event.target.value) && res.attributes.type == "income";
  });
  // budgetItemExpense.value = _.filter(budgetItems.value, (res) => {
  //   return res.attributes.year == parseInt(event.target.value) && res.attributes.type == "expense";
  // });
  console.log("hi");
  let totalIncomeActualArry = gettotalIncomeActualArry();
  console.log("hii");
  let totalIncomeBudget = gettotalIncomeBudget();

  console.log(totalIncomeBudget);

  // const totalIncomeActual = totalIncomeActualArry.reduce((acc, curr) => {
  //   acc + curr;
  // }, 0);

  rowData.value = budgetItemIncome.value.map((res) => {
    let mine = {
      details: res.attributes.name,
      budget: res.attributes.budget.length > 0 ? parseInt(res.attributes.budget[0].amount) : 0.0,
      variance: (() => {
        if (res.attributes.budget.length > 0) {
          if (res.attributes.budget[0].incomes.length > 1) {
            console.log("h2");
            let add = _.reduce(
              res.attributes.budget[0].incomes,
              (acc, curr) => {
                return parseInt(acc) + parseInt(curr.amount);
              },
              0
            );

            let result = ((parseInt(res.attributes.budget[0].amount) - add) / parseInt(res.attributes.budget[0].amount)) * 100;
            console.log(result);
            return result.toFixed(2);
          }
          if (res.attributes.budget[0].incomes.length == 1) {
            let result = ((parseInt(res.attributes.budget[0].amount) - parseInt(res.attributes.budget[0].incomes[0].amount)) / parseInt(res.attributes.budget[0].amount)) * 100;

            return result.toFixed(2);
          }
        }

        return 0;
      })(),
      distribution: (() => {
        console.log(totalIncomeBudget);
        // res.attributes.budget.length > 0 ? ((parseInt(res.attributes.budget[0].amount) / totalIncomeBudget) * 100).toFixed(2) : 0.0;
      })(),
      actual: (function () {
        if (res.attributes.budget.length > 0) {
          if (res.attributes.budget[0].incomes.length > 1) {
            let result = _.reduce(
              res.attributes.budget[0].incomes,
              (acc, curr) => {
                return parseInt(acc) + parseInt(curr.amount);
              },
              0
            );
            return result;
          }
          if (res.attributes.budget[0].incomes.length == 1) {
            return parseInt(res.attributes.budget[0].incomes[0].amount);
          }
          return 0;
        }

        return 0;
      })(),
      id: res.id,
    };
    return mine;
  });
};

const recordClick = (event) => {
  console.log(event.data);
  // window.location.href = "/assemblyDetail-" + event.data.id;
};
</script>

<style></style>
