<template>
  <div class="col-md-6 col-lg-4 order-1 mb-4">
    <div class="card h-100">
      <div class="card-header d-flex align-items-center justify-content-between pb-0">
        <div class="card-title mb-0">
          <h5 class="m-0 me-2">Income Statistics District</h5>
          <small class="text-muted">{{ districts.length }} Districts</small>
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
            <span>Districts</span>
          </div>
          <div id="orderStatisticsChart" v-if="districts.length > 0">
            <apexchart :key="componentKey" width="250" :options="districtStatChart" :series="districtStatSeries"></apexchart>
          </div>
        </div>
        <ul class="p-0 m-0">
          <li class="d-flex mb-0 pb-0" v-for="(item, index) in incomeDistrict" :key="index">
            <div class="">
              <span class="tw-text-xl tw-pr-2">*</span>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <h6 class="mb-0">{{ item.district }}</h6>
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
const getUser = await loginStore.getUser;
const incomes = ref([]);
const districts = ref([]);
const incomeDistrict = ref([]);
const incomeName = ref([]);
const incomeAmt = ref([]);
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
};

const totalIncome = computed(() => {
  const amtTotal = incomeDistrict.value.reduce((acc, curr) => {
    return parseInt(acc) + parseInt(curr.amount);
  }, 0);
  return amtTotal.toFixed(2);
});

const districtStatChart = ref({
  chart: {
    id: "district stat donut",
    type: "pie",
  },
  labels: [],
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

const districtStatSeries = ref([]);

const props = defineProps({
  getData: {},
  getDataIncome: {},
});

onMounted(async () => {
  districts.value = props.getData;

  const dist = [];
  incomes.value.filter((res) => {
    if (res.attributes.district) {
      dist.push(res);
    }
  });

  incomes.value = props.getDataIncome;

  const mydistricts = [];
  let role = "district";

  incomes.value.filter((res) => {
    if (res.attributes[role]) {
      mydistricts.push(res);
    }
  });

  const result = new Map();
  mydistricts.forEach((element) => {
    if (result.get(element.attributes[role])) {
      result.set(element.attributes[role], result.get(element.attributes[role]) + element.attributes.amount);
    } else {
      result.set(element.attributes[role], element.attributes.amount);
    }
  });

  for (const [key, value] of result) {
    incomeDistrict.value.push({ district: key, amount: value });
  }
});

watch(incomeDistrict.value, (newIncomeDistrict) => {
  if (newIncomeDistrict) {
    let arryArea = [];
    let arryAmt = [];
    for (const value of newIncomeDistrict) {
      // incomeName.value.push(value.area);
      // incomeAmt.value.push(value.amount);
      arryArea.push(value.district);
      arryAmt.push(parseInt(value.amount));
    }

    districtStatSeries.value = arryAmt;
    districtStatChart.value.labels = arryArea;

    forceRerender();
  }
});
</script>

<style></style>
