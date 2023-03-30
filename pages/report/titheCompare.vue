<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">Tithe Comparison Analysis</div>
    <Loading :loading="loading" />

    <div>
      <div class="card-body">
        <div class="text-center tw-mx-auto">
          <!-- <label for="ministry" class="col-md-12 col-form-label">Select Budget Year</label> -->
          <select name="" id="" class="tw-w-52 tw-bg-slate-400 tw-mx-3 tw-mb-2 md:tw-mb-0 tw-text-gray-50 tw-rounded-md tw-p-1 tw-text-center" @change="getYearPrev($event)">
            <option disabled selected>Select Year One</option>
            <option v-for="i in 20" :key="i" :value="2019 + i">{{ 2019 + i }}</option>
          </select>
          <select name="" id="" class="tw-w-52 tw-bg-slate-400 tw-text-gray-50 tw-rounded-md tw-p-1 tw-text-center" @change="getYearCurrent($event)">
            <option disabled selected>Select Year Two</option>
            <option v-for="i in 20" :key="i" :value="2019 + i">{{ 2019 + i }}</option>
          </select>
        </div>
      </div>
    </div>

    <AgGrid :key="componentKey" :results="titheAreas" :columnDefs="columnDefs" :rowData="rowData" @recordClick="recordClick" />
  </div>
</template>

<script setup>
import _, { map } from "underscore";
const titheYearPrev = ref(2020);
const titheYearCurrent = ref(2021);
const titheAreas = ref([]);
const componentKey = ref(0);
const loading = ref("");
const rowData = ref([]);
const forceRerender = () => {
  componentKey.value += 1;
};
const columnDefs = reactive([
  { headerName: "Tithe Area", field: "area" },
  { headerName: titheYearPrev.value, field: "prev", type: ["numberColumn"] },
  { headerName: titheYearCurrent.value, field: "current", type: ["numberColumn"] },
  // { headerName: "Indicators", field: "indicators", type: ["numberColumn"] },
]);

onMounted(async () => {
  let getData = await useGetData("area");

  loading.value = getData.pending;
  titheAreas.value = getData.data.data;
});

watch([titheYearPrev, titheYearCurrent], ([newPrevYear, newCurrYear]) => {
  if (newPrevYear) {
    rowData.value = titheAreas.value.map((res) => {
      let mine = {
        area: res.attributes.name,
        id: res.id,
        prev: (() => {
          if (res.attributes.assembly.length > 0) {
            let arrySum = [];
            let a = _.reduce(
              res.attributes.assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, cur) => {
                    if (cur.assembly_id && new Date(cur.created_at).getFullYear() == parseInt(newPrevYear)) {
                      arrySum.push(parseInt(num) + parseInt(cur.amount));
                      return parseInt(num) + parseInt(cur.amount);
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

          return 0;
        })(),
        current: (() => {
          if (res.attributes.assembly.length > 0) {
            let arrySum = [];
            let a = _.reduce(
              res.attributes.assembly,
              (acc, curr) => {
                let b = _.reduce(
                  curr.tithes,
                  (num, cur) => {
                    if (cur.assembly_id && new Date(cur.created_at).getFullYear() == parseInt(newCurrYear)) {
                      arrySum.push(parseInt(num) + parseInt(cur.amount));
                      return parseInt(num) + parseInt(cur.amount);
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

          return 0;
        })(),
        // indicators: 0,
      };
      return mine;
    });
  }
});

const getYearPrev = (event) => {
  //
  let year = event.target.value;
  titheYearPrev.value = event.target.value;
  columnDefs[1].headerName = event.target.value;

  forceRerender();
};

const getYearCurrent = (event) => {
  //
  titheYearCurrent.value = event.target.value;
  columnDefs[2].headerName = event.target.value;
  forceRerender();
};

const recordClick = (event) => {};
</script>

<style></style>
