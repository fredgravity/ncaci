<template>
  <div class="col-md-6 col-lg-4 col-xl-4 order-0 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between pb-0">
        <div class="card-title mb-0">
          <h5 class="m-0 me-2">Income Statistics Area</h5>
          <small class="text-muted"> {{ areas.length }} Areas</small>
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
            <h2 class="mb-2 tw-text-2xl">GHS {{ totalIncome }}</h2>
            <span>Areas</span>
          </div>
          <div id="orderStatisticsChart">
            <apexchart :key="componentKey" width="250" :options="incomeStatChart" :series="incomeStatSeries"></apexchart>
          </div>
        </div>
        <ul class="p-0 m-0">
          <li class="d-flex mb-0 pb-0" v-for="(item, index) in incomeArea" :key="index">
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
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const api_base = useRuntimeConfig().public.apiBase;
const incomes = ref([]);
const areas = ref([]);
const incomeArea = ref([]);
const incomeName = ref([]);
const incomeAmt = ref([]);
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};

const totalIncome = computed(() => {
  const amtTotal = incomeArea.value.reduce((acc, curr) => {
    return parseInt(acc) + parseInt(curr.amount);
  }, 0);
  return amtTotal.toFixed(2);
});

const incomeStatChart = ref({
  chart: {
    id: "income stat donut",
    type: "pie",
  },
  labels: [],
  // labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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

const incomeStatSeries = ref([]);

// const incomeStatSeries = [44, 55, 13, 43, 22];

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
});

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

  incomes.value = data.value.data;

  const areas = [];
  incomes.value.filter((res) => {
    if (res.attributes.area) {
      areas.push(res);
    }
  });

  const result = new Map();
  areas.forEach((element) => {
    if (result.get(element.attributes.area)) {
      result.set(element.attributes.area, result.get(element.attributes.area) + element.attributes.amount);
    } else {
      result.set(element.attributes.area, element.attributes.amount);
    }
  });

  for (const [key, value] of result) {
    incomeArea.value.push({ area: key, amount: value });
  }
});

watch(incomeArea.value, (newIncomeArea) => {
  if (newIncomeArea) {
    let arryArea = [];
    let arryAmt = [];
    for (const value of newIncomeArea) {
      // incomeName.value.push(value.area);
      // incomeAmt.value.push(value.amount);
      arryArea.push(value.area);
      arryAmt.push(parseInt(value.amount));
    }

    incomeStatSeries.value = arryAmt;
    incomeStatChart.value.labels = arryArea;

    forceRerender();
  }
});
</script>

<style></style>
