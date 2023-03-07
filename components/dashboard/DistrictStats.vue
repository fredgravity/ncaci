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
          <div id="orderStatisticsChart">
            <apexchart width="250" :options="totalRevenue1" :series="totalRevenueSeries1"></apexchart>
          </div>
        </div>
        <ul class="p-0 m-0">
          <li class="d-flex mb-4 pb-1" v-for="(item, index) in incomeDistrict" :key="index">
            <div class="avatar flex-shrink-0 me-3">
              <span class="avatar-initial rounded bg-label-primary"><i class="bx bx-mobile-alt"></i></span>
            </div>
            <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
              <div class="me-2">
                <h6 class="mb-0">{{ item.district }}</h6>
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
const incomes = ref([]);
const districts = ref([]);
const incomeDistrict = ref([]);
const incomeName = ref([]);
const incomeAmt = ref([]);
const totalIncome = computed(() => {
  const amtTotal = incomeDistrict.value.reduce((acc, curr) => {
    return parseInt(acc) + parseInt(curr.amount);
  }, 0);
  return amtTotal.toFixed(2);
});

const totalRevenue1 = ref({
  chart: {
    id: "total revenue donut",
    type: "donut",
  },
  labels: incomeName.value,
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

const totalRevenueSeries1 = incomeAmt;

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/district", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });

  districts.value = data.value.data;
  console.log(districts.value);

  const dist = [];
  incomes.value.filter((res) => {
    if (res.attributes.district) {
      dist.push(res);
    }
  });

  console.log(dist);
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
  console.log(incomes.value);

  const districts = [];
  incomes.value.filter((res) => {
    if (res.attributes.district) {
      districts.push(res);
    }
  });
  console.log(districts);

  const result = new Map();
  districts.forEach((element) => {
    console.log(element.attributes.district);
    if (result.get(element.attributes.district)) {
      result.set(element.attributes.district, result.get(element.attributes.district) + element.attributes.amount);
    } else {
      result.set(element.attributes.district, element.attributes.amount);
    }
  });

  console.log(result);

  for (const [key, value] of result) {
    incomeDistrict.value.push({ district: key, amount: value });
  }

  console.log(incomeDistrict.value);
  for (const value of incomeDistrict.value) {
    incomeName.value.push(value.district);
    incomeAmt.value.push(value.amount);
  }
  console.log(incomeName.value);
  console.log(incomeAmt.value);
});
</script>

<style></style>
