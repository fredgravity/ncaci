<template>
  <v-card class="mx-auto" width="256" tile>
    <v-navigation-drawer v-model="opened" permanent class="tw-pb-44 md:tw-pb-5">
      <!-- <div class="tw-w-full tw-text-end tw-px-4 tw-cursor-pointer" @click="close">
          <v-icon> fas fa-solid fa-xmark</v-icon>
        </div> -->
      <v-divider class="tw-mb-5"></v-divider>
      <v-list>
        <v-list-item :title="getUser.name" :subtitle="getUser.email" style="background-color: #26a0fc; color: white; margin: 0 1rem"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav class="tw-text-sm">
        <!-- dashboard -->
        <v-list-item v-for="([title, icon, link], i) in menus" :key="i" :prepend-icon="icon" :value="title" class="tw-bg-black" rounded="shaped">
          <NuxtLink class="tw-w-full tw-block tw-text-sm tw-text-gray-600" :href="link">{{ title }}</NuxtLink>
        </v-list-item>
        <li class="tw-border-b-2 tw-list-none">
          <span class=""></span>
        </li>
        <!-- users -->
        <template v-if="getUser.role == 'admin'">
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
        </template>
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

        <!-- attendance -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-edit" rounded="shaped">
          <v-list-group value="Attendance">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Attendance" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in attendance" :key="i" :value="title" class="tw-w-full" rounded="shaped">
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
        <!-- reports -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-file-signature" rounded="shaped">
          <v-list-group value="Report">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Report" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link], i) in reports" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
            </v-list-item>
          </v-list-group>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup>
// const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const getUser = await loginStore.getUser;
// getUser.image = "assets/assets/img/avatars/6.png";
// console.log(getUser);
const drawStore = useMenuStore();
const opened = computed(() => drawStore.drawer);
console.log(getUser);
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
  ["View User", "/user"],
  ["Register", "/register"],
]);
const members = ref([
  ["View Member", "/member"],
  ["Add Member", "/addMember"],
]);
const attendance = ref([
  ["View Attendance", "/attendance"],
  ["Mark Attendance", "/attendanceMark"],
]);
const areas = ref([
  ["View Area", "/area"],
  ["Add Area", "/addArea"],
]);
const districts = ref([
  ["View District", "/district"],
  ["Add District", "/addDistrict"],
]);
const assemblies = ref([
  ["View Assembly", "/assembly"],
  ["Add Assembly", "addAssembly"],
]);
const ministries = ref([
  ["View Ministry", "/ministry"],
  ["Add Ministry", "/addMinistry"],
]);
const trainings = ref([
  ["View Training", "/trainingItem"],
  ["Add Training", "/addTrainingItem"],
  ["View Participant", "/training"],
  ["Add Participant", "/addTraining"],
]);
const tithes = ref([
  ["View Assembly Tithe", "/tithe"],
  ["View Members Tithe", "/titheMember"],
  ["Add Tithe", "/addTithe"],
]);
const reports = ref([
  ["Budget Income", "/reportBudgetIncome"],
  ["Budget Expense", "/reportBudgetExpense"],
  ["Tithe Analysis", "/reportTithe"],
  ["Tithe Report", "/reportAllTithe"],
  ["Tithe Compare", "/reportTitheCompare"],
]);
const finances = ref([
  ["View Budget Setup", "/budgetItem"],
  ["Budget Setup", "/addBudgetItem"],
  ["View Budget", "/budget"],
  ["Add Budget", "/addBudget"],
  ["View Expend", "/expenditure"],
  ["Add Expend", "/addExpenditure"],
  ["View Income", "/income"],
  ["Add Income", "/addIncome"],
]);
</script>

<style></style>
