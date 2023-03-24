<template>
  <div class="tw-mx-auto tw-p-4">
    <!-- first welcome row -->
    <LazyDashboardWelcomeRow />
    <!-- Total Revenue -->
    <LazyDashboardTotalRevenue />
    <!--/ Total Revenue -->

    <div class="row">
      <!-- income stats -->
      <LazyDashboardIncomeStats />
      <!--/ income stats -->

      <!-- expense stats -->
      <LazyDashboardDistrictStats />
      <!--/ expense stats -->

      <!-- district stats -->
      <LazyDashboardExpenseStats />
      <!--/ district stats -->
    </div>
    <!-- birthday stat -->
    <LazyDashboardBirthdayStat />
    <!-- birthday stat -->
  </div>
</template>

<script setup></script>

<style></style>
