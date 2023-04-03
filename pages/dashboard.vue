<template>
  <Loading :loading="loading" />
  <div class="tw-mx-auto tw-p-4">
    <!-- first welcome row -->
    <LazyDashboardWelcomeRow :users="users" :member="member" v-if="member.length > 0" />
    <!-- Total Revenue -->
    <LazyDashboardTotalRevenue :getData="income" v-if="income.length > 0" />
    <!--/ Total Revenue -->

    <div class="row">
      <!-- income stats -->
      <LazyDashboardIncomeStats :getDataIncome="income" :getDataArea="area" v-if="income.length > 0" />
      <!--/ income stats -->

      <!-- expense stats -->
      <LazyDashboardDistrictStats :getData="district" :getDataIncome="income" v-if="district.length > 0" />
      <!--/ expense stats -->

      <!-- district stats -->
      <LazyDashboardExpenseStats :getDataExp="expenditure" :getDataArea="area" v-if="expenditure.length > 0" />
      <!--/ district stats -->
    </div>
    <!-- birthday stat -->
    <LazyDashboardBirthdayStat />
    <!-- birthday stat -->
  </div>
</template>

<script setup>
const users = ref({});
const member = ref({});
const area = ref({});
const income = ref({});
const district = ref({});
const expenditure = ref({});
const loading = ref("");

onMounted(async () => {
  let getDataUsers = await useGetData("users");
  users.value = getDataUsers.data;

  let getDataArea = await useGetData("area");
  area.value = getDataArea.data.data;

  let getDataIncome = await useGetData("income");
  income.value = getDataIncome.data.data;

  let getDataDistrict = await useGetData("district");
  district.value = getDataDistrict.data.data;

  let getDataExp = await useGetData("expenditure");
  expenditure.value = getDataExp.data.data;

  let getDataMember = await useGetData("member");
  member.value = getDataMember.data.data;

  loading.value = getDataExp.pending;
});
</script>

<style></style>
