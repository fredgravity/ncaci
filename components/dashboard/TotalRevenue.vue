<template>
  <div>
    <div class="col-12 col-lg-12 order-2 order-md-3 order-lg-2 mb-4">
      <div class="tw-shadow-xl">
        <div class="row row-bordered g-0">
          <div class="col-md-8">
            <h5 class="card-header m-0 me-2 pb-3">Total Revenue</h5>
            <div id="totalRevenueChart" v-if="incomeYear.length > 0" class="tw-px-2">
              <apexchart width="580" type="bar" :options="totalRevenue" :series="totalRevenueSeries"></apexchart>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card-body">
              <div class="text-center">
                <!-- <select name="" id="" class="btn btn-sm btn-outline-primary dropdown-toggle">
                  <option value="">2000</option>
                  <option value="">2001</option>
                  <option value="">2002</option>
                </select> -->
              </div>
            </div>
            <div id="growthChart" v-if="incomeYear.length > 0">
              <apexchart width="300" :options="totalRevenue1" :series="totalRevenueSeries1"></apexchart>
            </div>

            <div class="text-center fw-semibold pt-3 mb-2" v-if="incomeYearSlice[1] !== ''">{{ varience }}% Revenue Comparison</div>

            <div class="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-between">
              <div class="d-flex">
                <div class="me-2">
                  <span class="badge bg-label-primary p-2"><i class="bx bx-dollar text-primary"></i></span>
                </div>
                <div class="d-flex flex-column" v-if="incomeYearSlice[1] !== ''">
                  <small>{{ incomeYearSlice[1] }}</small>
                  <h6 class="mb-0 tw-text-xs">GHS {{ incomeAmountSlice[1] }}</h6>
                </div>
              </div>
              <div class="d-flex">
                <div class="me-2">
                  <span class="badge bg-label-success p-2"><i class="bx bx-wallet text-info"></i></span>
                </div>
                <div class="d-flex flex-column" v-if="incomeYearSlice[0] !== ''">
                  <small>{{ incomeYearSlice[0] }}</small>
                  <h6 class="mb-0 tw-text-xs">GHS {{ incomeAmountSlice[0] }}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const incomes = ref([]);
const incomeYear = ref([]);
const incomeYearSlice = ref([]);
const incomeAmount = ref([]);
const incomeAmountSlice = ref([]);

const varience = ref(0);
setTimeout(() => {
  varience.value = computed(() => {
    if (!incomeAmountSlice.value[1]) {
      let ans = (incomeAmountSlice.value[0] / incomeAmountSlice.value[0]) * 100;
      return parseInt(ans.toFixed(2));
    } else {
      let ans = (incomeAmountSlice.value[0] / incomeAmountSlice.value[1]) * 100;
      return parseInt(ans.toFixed(2));
    }
  });
}, 3000);

const category = ref(["2022"]);
const catData = ref([0.1]);

const totalRevenue = ref({
  chart: {
    id: "total revenue",
  },
  xaxis: {
    // categories: incomeYear.value.sort(),
    categories: category.value.sort(),
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
});

const totalRevenueSeries = ref([
  {
    name: "total revenue series",
    // data: incomeAmount.value,
    data: catData.value,
  },
]);

const totalRevenue1 = ref({
  chart: {
    id: "total revenue donut",
    type: "donut",
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  labels: [],

  // xaxis: {
  //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  // },
});

const totalRevenueSeries1 = incomeAmountSlice;

const props = defineProps({
  getData: {},
});
incomes.value = props.getData;

onMounted(async () => {
  const result = new Map();
  incomes.value.forEach((element) => {
    if (result.get(element.attributes.year)) {
      result.set(element.attributes.year, result.get(element.attributes.year) + parseInt(element.attributes.amount));
    } else {
      result.set(element.attributes.year, parseInt(element.attributes.amount));
    }
  });

  for (const [key, value] of result) {
    incomeYear.value.push(key.toString());
    category.value.push(key.toString());
  }

  for (const key of incomeYear.value.sort()) {
    if (result.get(parseInt(key))) {
      incomeAmount.value.push(result.get(parseInt(key)));
      catData.value.push(result.get(parseInt(key)));
    } else {
      incomeAmount.value.push(result.get(key));
      catData.value.push(result.get(key));
    }
  }
  incomeAmountSlice.value = incomeAmount.value.slice(-2);
  incomeYearSlice.value = incomeYear.value.slice(-2);

  totalRevenue1.value.labels.push(incomeYearSlice.value);
});
</script>

<style></style>
