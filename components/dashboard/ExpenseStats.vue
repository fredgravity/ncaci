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
            <span>Total Orders</span>
          </div>
          <div id="orderStatisticsChart">
            <apexchart width="250" :options="totalRevenue1" :series="totalRevenueSeries1"></apexchart>
          </div>
        </div>
        <ul class="p-0 m-0">
          <li class="d-flex mb-4 pb-1" v-for="(item, index) in expenseArea" :key="index">
            <div class="avatar flex-shrink-0 me-3">
              <span class="avatar-initial rounded bg-label-primary"><i class="bx bx-mobile-alt"></i></span>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <h6 class="mb-0">{{ item.area }}</h6>
                <!-- <small class="text-muted">Mobile, Earbuds, TV</small> -->
              </div>
              <div class="user-progress">
                <small class="fw-semibold">GHS {{ parseInt(item.amount) }}</small>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const api_base = useRuntimeConfig().public.apiBase;
const expenses = ref([]);
const areas = ref([]);
const expenseArea = ref([]);
const expenseName = ref([]);
const expenseAmt = ref([]);
const totalExpense = computed(() => {
  const amtTotal = expenseArea.value.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  return amtTotal;
});

const totalRevenue1 = ref({
  chart: {
    id: "total revenue donut",
    type: "donut",
  },
  labels: expenseName.value,
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

const totalRevenueSeries1 = expenseAmt;

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/area", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });

  areas.value = data.value.data;
  console.log(areas.value);
});

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/expenditure", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });

  expenses.value = data.value.data;
  console.log(expenses.value);

  const areas = [];
  expenses.value.filter((res) => {
    if (res.attributes.area) {
      areas.push(res);
    }
  });
  console.log(areas);

  const result = new Map();
  areas.forEach((element) => {
    console.log(element.attributes.area);
    if (result.get(element.attributes.area)) {
      result.set(element.attributes.area, result.get(element.attributes.area) + element.attributes.amount);
    } else {
      result.set(element.attributes.area, element.attributes.amount);
    }
  });

  for (const [key, value] of result) {
    expenseArea.value.push({ area: key, amount: value });
  }

  console.log(expenseArea.value);
  for (const value of expenseArea.value) {
    expenseName.value.push(value.area);
    expenseAmt.value.push(value.amount);
  }

  // for (const key of incomeYear.value.sort()) {
  //   incomeAmount.value.push(result.get(key));
  // }
});
</script>

<style></style>
