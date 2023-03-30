<template>
  <div class="col-md-6 col-lg-4 order-2 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between pb-0">
        <div class="card-title mb-0">
          <h5 class="m-0 me-2">Expense Statistics Area</h5>
          <small class="text-muted">{{ areas.length }} Areas</small>
        </div>
        <div class="dropdown">
          <button class="btn p-0" type="button" id="orederStatistics" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="bx bx-dots-vertical-rounded"></i>
          </button>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="orederStatistics">
            <a class="dropdown-item" href="javascript:void(0);">Select All</a>
            <a class="dropdown-item" href="javascript:void(0);">Refresh</a>
            <a class="dropdown-item" href="javascript:void(0);">Share</a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="d-flex flex-column align-items-center gap-1">
            <h2 class="mb-2 tw-text-2xl">GHS {{ totalExpense }}</h2>
            <span>Areas</span>
          </div>
          <div id="orderStatisticsChart">
            <apexchart :key="componentKey" width="250" :options="expenseStatChart" :series="expenseStatSeries"></apexchart>
          </div>
        </div>
        <ul class="p-0 m-0">
          <li class="d-flex mb-0 pb-0" v-for="(item, index) in expenseArea" :key="index">
            <div class="">
              <span class="tw-text-xl tw-pr-2">*</span>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <h6 class="mb-0">{{ item.area }}</h6>
                <!-- <small class="text-muted">Mobile, Earbuds, TV</small> -->
              </div>
              <div class="user-progress">
                <small class="fw-semibold">GHS {{ parseInt(item.amount).toFixed(2) }}</small>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const expenses = ref([]);
const areas = ref([]);
const expenseArea = ref([]);
const expenseName = ref([]);
const expenseAmt = ref([]);
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};

const totalExpense = computed(() => {
  const amtTotal = expenseArea.value.reduce((acc, curr) => {
    return parseInt(acc) + parseInt(curr.amount);
  }, 0);
  return amtTotal.toFixed(2);
});

const expenseStatChart = ref({
  chart: {
    id: "expense stat donut",
    type: "pie",
  },
  // labels: expenseName.value,
  // labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  // xaxis: {
  //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  // },
});

// const expenseStatSeries = expenseAmt.value;
const expenseStatSeries = ref([]);

onMounted(async () => {
  let getData = await useGetData("area");
  let getData2 = await useGetData("expenditure");

  areas.value = getData.data.data;
  expenses.value = getData2.data.data;

  const myareas = [];
  expenses.value.filter((res) => {
    if (res.attributes.area) {
      myareas.push(res);
    }
  });

  const result = new Map();
  myareas.forEach((element) => {
    if (result.get(element.attributes.area)) {
      result.set(element.attributes.area, result.get(element.attributes.area) + element.attributes.amount);
    } else {
      result.set(element.attributes.area, element.attributes.amount);
    }
  });

  for (const [key, value] of result) {
    expenseArea.value.push({ area: key, amount: value });
  }
});

watch(expenseArea.value, (newExpenseArea) => {
  if (newExpenseArea) {
    let arryArea = [];
    let arryAmt = [];
    for (const value of newExpenseArea) {
      // incomeName.value.push(value.area);
      // incomeAmt.value.push(value.amount);
      arryArea.push(value.area);
      arryAmt.push(parseInt(value.amount));
    }

    expenseStatSeries.value = arryAmt;
    expenseStatChart.value.labels = arryArea;

    forceRerender();
  }
});
</script>

<style></style>
