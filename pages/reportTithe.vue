<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">Tithe Analysis</div>
    <Loading :loading="loading" />

    <div>
      <div class="card-body">
        <div class="text-center">
          <!-- <label for="ministry" class="col-md-12 col-form-label">Select Budget Year</label> -->
          <select name="" id="" class="tw-w-52 tw-mx-auto tw-bg-slate-400 tw-text-gray-50 tw-rounded-md tw-p-1 tw-text-center" @change="getYear($event)">
            <option disabled selected>Select Tithe Year</option>
            <option v-for="i in 20" :key="i" :value="2019 + i">{{ 2019 + i }}</option>
          </select>
        </div>
      </div>
    </div>

    <AgGrid :key="componentKey" :results="areas" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />

    <div id="chart" class="tw-mt-16 tw-px-10">
      <apexchart :key="componentKey" type="bar" height="450" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script setup>
import _, { map } from "underscore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const areas = ref([]);
const loading = ref("");
const titheItemAreas = ref([]);
const titheYear = ref(2020);
const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

const rowData = ref([]);

const getYear = (event) => {
  console.log(event.target.value);
  titheYear.value = parseInt(event.target.value);
  chartOptions.value.xaxis.title.text = titheYear.value + " Quarters";
  forceRerender();
};

const series = ref([
  {
    data: [0, 0, 0, 0],
  },
]);

const chartOptions = ref({
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: ["quarter 1", "quarter 2", "quarter 3", "quarter 4"],
    title: {
      text: titheYear.value + " Quarters",
    },
  },
  yaxis: {
    title: {
      text: "Amount - GHS",
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "center",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
  title: {
    text: "",
    align: "left",
  },
  toolbar: {
    show: true,
  },
  dataLabels: {
    enabled: true,
  },
});

const columnDefs = reactive([
  { headerName: "Tithe Area", field: "area" },
  { headerName: "Quarter 1", field: "quater1" },
  { headerName: "Quarter 2", field: "quater2" },
  { headerName: "Quarter 3", field: "quater3" },
  { headerName: "Quarter 4", field: "quater4" },
  // { headerName: "Tithe Year", field: "tithe_year" },
  { headerName: "Total", field: "total" },
  // { headerName: "Pastor", field: "pastor" },
  // { headerName: "Status", field: "status" },
  // { headerName: "OpenedOn", field: "openedOn", type: ["dateColumn"] },
  // { headerName: "Total Tithe", field: "total", type: ["numberColumn"] },
  // { headerName: "Created At", field: "created_at", type: ["dateColumn"] },
]);

watch(titheYear, (newTitheYear) => {
  if (newTitheYear) {
    rowData.value = areas.value.map((res) => {
      // console.log(res.attributes.assembly);
      let mine = {
        area: res.attributes.name,
        quater1: (() => {
          let assembly = res.attributes.assembly;
          if (assembly.length > 1) {
            let arrySum = [];
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = parseInt(date.getMonth() / 3) + 1;
                    if (val.assembly_id && date.getFullYear() == titheYear.value && quarter == 1) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));

                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );

            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
            // }
          }

          if (assembly.length == 1) {
            console.log(assembly);
            let arrySum = [];
            //
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = parseInt(date.getMonth() / 3) + 1;

                    if (val.assembly_id && new Date(val.created_at).getFullYear() == titheYear.value && quarter == 1) {
                      arrySum.push(num + val.amount);
                      return num + val.amount;
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );
            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
          }

          if (assembly.length < 1) {
            return 0;
          }
        })(),
        quater2: (() => {
          let assembly = res.attributes.assembly;
          if (assembly.length > 1) {
            let arrySum = [];
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                //
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = parseInt(date.getMonth() / 3) + 1;

                    if (val.assembly_id && date.getFullYear() == titheYear.value && quarter == 2) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));

                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );

            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
            // }
          }

          if (assembly.length == 1) {
            let arrySum = [];
            //
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = parseInt(date.getMonth() / 3) + 1;

                    if (val.assembly_id && new Date(val.created_at).getFullYear() == titheYear.value && quarter == 2) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));
                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );
            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
          }

          if (assembly.length < 1) {
            return 0;
          }
        })(),
        quater3: (() => {
          let assembly = res.attributes.assembly;
          if (assembly.length > 1) {
            let arrySum = [];
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                // console.log(curr);
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = parseInt(date.getMonth() / 3) + 1;

                    if (val.assembly_id && date.getFullYear() == titheYear.value && quarter == 3) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));

                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );
                console.log(b);
                return b;
              },
              0
            );

            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
            // }
          }

          if (assembly.length == 1) {
            console.log(assembly);
            let arrySum = [];
            //
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = parseInt(date.getMonth() / 3) + 1;

                    if (val.assembly_id && new Date(val.created_at).getFullYear() == titheYear.value && quarter == 3) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));
                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );
            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
          }

          if (assembly.length < 1) {
            return 0;
          }
        })(),
        quater4: (() => {
          let assembly = res.attributes.assembly;
          if (assembly.length > 1) {
            let arrySum = [];
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                //
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = Math.ceil((date.getMonth() + 1) / 3);

                    console.log(date.getFullYear());

                    if (val.assembly_id && date.getFullYear() == titheYear.value && quarter == 4) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));

                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );

            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
            // }
          }

          if (assembly.length == 1) {
            let arrySum = [];
            //
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    let date = new Date(val.created_at);
                    let quarter = parseInt(date.getMonth() / 3) + 1;

                    if (val.assembly_id && new Date(val.created_at).getFullYear() == titheYear.value && quarter == 4) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));
                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );
            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
          }

          if (assembly.length < 1) {
            return 0;
          }
        })(),
        total: (() => {
          let assembly = res.attributes.assembly;
          if (assembly.length > 1) {
            let arrySum = [];
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                // console.log(curr);
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    if (val.assembly_id && new Date(val.created_at).getFullYear() == titheYear.value) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));

                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );

                return b;
              },
              0
            );

            let finalTotal = arrySum.reduce((acc, cur) => {
              return acc + cur;
            }, 0);

            return finalTotal;
            // }
          }

          if (assembly.length == 1) {
            let arrySum = [];
            // console.log(curr);
            let a = _.reduce(
              assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, val) => {
                    console.log(val);
                    if (val.assembly_id && new Date(val.created_at).getFullYear() == titheYear.value) {
                      arrySum.push(parseInt(num) + parseInt(val.amount));
                      return parseInt(num) + parseInt(val.amount);
                    }
                    return 0;
                  },
                  0
                );
                console.log(b);
                return b;
              },
              0
            );
            let finalTotal = arrySum.reduce((acc, cur) => {
              return parseInt(acc) + parseInt(cur);
            }, 0);

            console.log(a);
            return finalTotal;
          }

          if (assembly.length < 1) {
            return 0;
          }
        })(),
        id: res.id,
      };
      return mine;
    });
  }
});

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
  loading.value = pending.value;
  areas.value = data.value.data;
});

const recordClick = (event) => {
  let arry = [];
  arry.push(event.data);
  console.log(arry[0].quater1);
  let areaName = _.pluck(arry, "area");
  let quater1 = arry[0].quater1;
  let quater2 = arry[0].quater2;
  let quater3 = arry[0].quater3;
  let quater4 = arry[0].quater4;
  let seriesData = [quater1, quater2, quater3, quater4];

  series.value[0].data = seriesData;
  chartOptions.value.title.text = areaName;

  forceRerender();
  // window.location.href = "/assemblyDetail-" + event.data.id;
};
</script>

<style></style>
