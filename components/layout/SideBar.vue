<template>
  <v-card class="mx-auto" width="256" tile>
    <v-navigation-drawer v-model="opened" permanent class="tw-pb-44 md:tw-pb-5">
      <!-- <div class="tw-w-full tw-text-end tw-px-4 tw-cursor-pointer" @click="close">
          <v-icon> fas fa-solid fa-xmark</v-icon>
        </div> -->
      <v-divider class="tw-mb-5"></v-divider>
      <v-list>
        <v-list-item :title="getUser.name" :subtitle="getUser.email" style="background-color: #26a0fc; color: white; margin: 0 1rem">
          <div class="tw-text-xs">{{ getUser.permission }}</div>
        </v-list-item>
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

            <v-list-item v-for="([title, link, display], i) in areas" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <template v-if="display == 'show'">
                <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- district -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-city" rounded="shaped">
          <v-list-group value="Districts">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Districts" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link, display], i) in districts" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <template v-if="display == 'show'">
                <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- assembly -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-church" rounded="shaped">
          <v-list-group value="Assemblies">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Assemblies" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link, display], i) in assemblies" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <template v-if="display == 'show'">
                <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- ministry -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-user-nurse" rounded="shaped">
          <v-list-group value="Ministries">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Ministries" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link, display], i) in ministries" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <template v-if="display == 'show'">
                <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
              </template>
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

            <v-list-item v-for="([title, link, display], i) in tithes" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <template v-if="display == 'show'">
                <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- finance -->
        <v-list-item v-model:opened="open" prepend-icon="fa-solid fa-money-bill-transfer" rounded="shaped">
          <v-list-group value="Finance">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="Finances" rounded="shaped"></v-list-item>
            </template>

            <v-list-item v-for="([title, link, display], i) in finances" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <template v-if="display == 'show'">
                <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
              </template>
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

            <v-list-item v-for="([title, link, display], i) in trainings" :key="i" :value="title" class="tw-w-full" rounded="shaped">
              <template v-if="display == 'show'">
                <NuxtLink class="tw-w-full tw-block tw-text-sm" :href="link">{{ title }}</NuxtLink>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list-item>
        <!-- reports -->
        <template v-if="getUser.role == 'admin' || getUser.role == 'user'">
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
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script setup>
// const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const getUser = ref({});
// getUser.image = "assets/assets/img/avatars/6.png";
//
const display = ref("hide");
const drawStore = useMenuStore();
const opened = computed(() => drawStore.drawer);
const close = () => {
  drawStore.openMenu();
};

const areas = ref([["View Area", "/area", "show"]]);
const districts = ref([["View District", "/district", "show"]]);
const assemblies = ref([["View Assembly", "/assembly", "show"]]);
const ministries = ref([["View Ministry", "/ministry", "show"]]);
const trainings = ref([
  ["View Training", "/trainingItem", "show"],
  ["View Participant", "/training", "show"],
  ["Add Participant", "/addTraining", "show"],
]);
const finances = ref([
  ["View Expend", "/expenditure", "show"],
  ["View Income", "/income", "show"],
  ["Add Expend", "/addExpenditure", "show"],
  ["Add Income", "/addIncome", "show"],
]);

onMounted(async () => {
  getUser.value = await loginStore.getUser;

  if (getUser.value.role == "admin" || getUser.value.role == "user") {
    display.value = "show";
  }
});

watch(display, (newDisplay) => {
  areas.value = [
    ["View Area", "/area", "show"],
    ["Add Area", "/addArea", display.value],
  ];

  districts.value = [
    ["View District", "/district", "show"],
    ["Add District", "/addDistrict", display.value],
  ];

  assemblies.value = [
    ["View Assembly", "/assembly", "show"],
    ["Add Assembly", "/addAssembly", display.value],
  ];

  ministries.value = [
    ["View Ministry", "/ministry", "show"],
    ["Add Ministry", "/addMinistry", display.value],
  ];

  trainings.value = [
    ["View Training", "/trainingItem", "show"],
    ["View Participant", "/training", "show"],
    ["Add Participant", "/addTraining", "show"],
    ["Add Training", "/addTrainingItem", display.value],
  ];

  finances.value = [
    ["View Expend", "/expenditure", "show"],
    ["View Income", "/income", "show"],
    ["Add Expend", "/addExpenditure", "show"],
    ["Add Income", "/addIncome", "show"],
    ["View Budget Setup", "/budgetItem", display.value],
    ["View Budget", "/budget", display.value],
    ["Budget Setup", "/addBudgetItem", display.value],
    ["Add Budget", "/addBudget", display.value],
  ];
});

const open = ref(["Users"]);
const menus = ref([["Dashboard", "mdi:mdi-view-dashboard", "/dashboard"]]);
const users = ref([
  ["View User", "/user"],
  ["Register", "/register"],
]);
const members = ref([
  ["View Member", "/member", "show"],
  ["Add Member", "/addMember", , "show"],
]);
const attendance = ref([
  ["View Attendance", "/attendance", "show"],
  ["Mark Attendance", "/attendanceMark", , "show"],
]);

// const areas = ref([
//   ["View Area", "/area", "show"],
//   ["Add Area", "/addArea", display.value],
// ]);

// const districts = ref([
//   ["View District", "/district", "show"],
//   ["Add District", "/addDistrict", display.value],
// ]);
// const assemblies = ref([
//   ["View Assembly", "/assembly", "show"],
//   ["Add Assembly", "/addAssembly", display.value],
// ]);
// const ministries = ref([
//   ["View Ministry", "/ministry", "show"],
//   ["Add Ministry", "/addMinistry", display.value],
// ]);
// const trainings = ref([
//   ["View Training", "/trainingItem", "show"],
//   ["View Participant", "/training", "show"],
//   ["Add Training", "/addTrainingItem", display.value],
//   ["Add Participant", "/addTraining", "show"],
// ]);
const tithes = ref([
  ["View Assembly Tithe", "/tithe", "show"],
  ["View Members Tithe", "/titheMember", "show"],
  ["Add Tithe", "/addTithe", "show"],
]);
const reports = ref([
  ["Budget Income", "/reportBudgetIncome"],
  ["Budget Expense", "/reportBudgetExpense"],
  ["Tithe Analysis", "/reportTithe"],
  ["Tithe Report", "/reportAllTithe"],
  ["Tithe Compare", "/reportTitheCompare"],
]);
// const finances = ref([
//   ["View Expend", "/expenditure", "show"],
//   ["View Income", "/income", "show"],
//   ["Add Expend", "/addExpenditure", "show"],
//   ["Add Income", "/addIncome", "show"],
//   ["View Budget Setup", "/budgetItem", display.value],
//   ["View Budget", "/budget", display.value],
//   ["Budget Setup", "/addBudgetItem", display.value],
//   ["Add Budget", "/addBudget", display.value],
// ]);
</script>

<style></style>
