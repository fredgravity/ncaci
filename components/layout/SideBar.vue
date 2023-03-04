<template>
  <v-card class="mx-auto" width="256" tile>
    <v-navigation-drawer v-model="opened" permanent class="tw-pb-44 md:tw-pb-5">
      <!-- <div class="tw-w-full tw-text-end tw-px-4 tw-cursor-pointer" @click="close">
          <v-icon> fas fa-solid fa-xmark</v-icon>
        </div> -->
      <v-divider class="tw-mb-5"></v-divider>
      <v-list>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Sandra Adams" subtitle="sandra_a88@gmailcom"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav class="tw-text-sm">
        <!-- dashboard -->
        <v-list-item v-for="([title, icon, link], i) in menus" :key="i" :prepend-icon="icon" :value="title" class="tw-bg-black" rounded="shaped">
          <NuxtLink class="tw-w-full tw-block tw-text-sm tw-text-black" :href="link">{{ title }}</NuxtLink>
        </v-list-item>
        <li class="tw-border-b-2 tw-list-none">
          <span class=""></span>
        </li>
        <!-- users -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-user" rounded="shaped">
          <v-list-group value="Users">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Users" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in users" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- members -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-users" rounded="shaped">
          <v-list-group value="Members">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Members" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in members" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <li class="tw-border-b-2 tw-list-none">
          <span class=""></span>
        </li>
        <!-- area -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-tower-cell" rounded="shaped">
          <v-list-group value="Areas">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Areas" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in areas" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- district -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-city" rounded="shaped">
          <v-list-group value="Districts">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Districts" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in districts" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- assembly -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-church" rounded="shaped">
          <v-list-group value="Assemblies">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Assemblies" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in assemblies" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- ministry -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-user-nurse" rounded="shaped">
          <v-list-group value="Ministries">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Ministries" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in ministries" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <li class="tw-border-b-2 tw-list-none">
          <span class=""></span>
        </li>
        <!-- tithe -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-envelope-open-text" rounded="shaped">
          <v-list-group value="Tithe">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Tithes" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in tithes" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- finance -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-money-bill-transfer" rounded="shaped">
          <v-list-group value="Finance">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Finances" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in finances" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>

        <li class="tw-border-b-2 tw-list-none">
          <span class=""></span>
        </li>
        <!-- training -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-folder-open" rounded="shaped">
          <v-list-group value="Training">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Training" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in trainings" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup>
const drawStore = useMenuStore();
const opened = computed(() => drawStore.drawer);
const close = () => {
  drawStore.openMenu();
};

const open = ref(["Users"]);
const menus = ref([
  ["Dashboard", "mdi:mdi-view-dashboard", "/dashboard"],
  // ["Shared with me", "mdi:mdi-account-multiple"],
  // ["Starred", "mdi:mdi-star"],
]);
const users = ref([
  ["User", "/user"],
  ["Register", "/register"],
]);
const members = ref([
  ["View", "/member"],
  ["Add", "/addMember"],
]);
const areas = ref([
  ["View", "/area"],
  ["Add", "/addArea"],
]);
const districts = ref([
  ["View", "/district"],
  ["Add", "/addDistrict"],
]);
const assemblies = ref([
  ["View", "/assembly"],
  ["Add", "addAssembly"],
]);
const ministries = ref([
  ["View", "/ministry"],
  ["Add", "/addMinistry"],
]);
const trainings = ref([
  ["Item", "/trainingItem"],
  ["Add Item", "/addTrainingItem"],
  ["View", "/training"],
  ["Add", "/addTraining"],
]);
const tithes = ref([
  ["All", "/tithe"],
  ["Members", "/titheMember"],
  ["Add", "/addTithe"],
]);
const finances = ref([
  ["Budget Item", "/budgetItem"],
  ["Add  Item", "/addBudgetItem"],
  ["Budget", "/budget"],
  ["Add Budget", "/addBudget"],
  ["Expenditure", "/expenditure"],
  ["Add Expend", "/addExpenditure"],
  ["Income", "/income"],
  ["Add Income", "/addIncome"],
]);
</script>

<style></style>
