<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add income</div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <form ref="form">
        <div class="mb-3 row">
          <label for="income" class="col-md-12 col-form-label">Add Income Item</label>
          <div class="col-md-12">
            <select class="form-control" id="income" v-model="income.budget_item_id" @change="getBudgetItems($event)">
              <option value="" disabled>select here</option>
              <template v-for="(budget, index) in budgetItems.value" :key="index">
                <option v-if="budget.attributes.name" :value="budget.id">{{ budget.attributes.name }} - {{ budget.attributes.year }}</option>
              </template>
            </select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="year" class="col-md-2 col-form-label">Year</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="number" id="year" v-model="expenditure.year" disabled /> -->
            <v-text-field disabled v-model="income.year" clearable :rules="nameRules" variant="solo" label="income year" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="type" class="col-md-2 col-form-label">Type</label> -->
          <div class="col-md-12">
            <!-- <select class="form-control" id="type" v-model="expenditure.type" disabled>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select> -->
            <v-select disabled clearable label="expenditure item type" :items="incomeItemTypes" item-title="type" item-value="val" :rules="nameRules" variant="solo" v-model="income.type"></v-select>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="amount" class="col-md-2 col-form-label">Amount</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="number" id="amount" v-model="expenditure.amount" /> -->
            <v-text-field disabled type="number" v-model="budget_amt" clearable :rules="nameRules" variant="solo" label="budget amount" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <!-- <label for="amount" class="col-md-2 col-form-label">Amount</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="number" id="amount" v-model="expenditure.amount" /> -->
            <v-text-field type="number" v-model="income.amount" clearable :rules="nameRules" variant="solo" label="income amount" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <div>
            <!-- <label for="details" class="form-label">Details</label> -->
            <!-- <textarea class="form-control" id="details" rows="3" v-model="expenditure.details"></textarea> -->
            <v-textarea counter clearable label="details" :rules="nameRules" variant="solo" auto-grow v-model="income.details"></v-textarea>
          </div>
        </div>

        <label for="details" class="form-label">Choose Either of the below</label>
        <div class="d-flex pa-4">
          <div class="tw-flex tw-flex-wrap tw-justify-around">
            <v-checkbox-btn v-model="enabledAssembly" class="pe-2"></v-checkbox-btn>
          </div>
          <!-- <v-text-field :disabled="!enabled" hide-details label="I only work if you check the box"></v-text-field> -->
          <v-select clearable :rules="nameRules" variant="solo" :items="assemblies" item-title="attributes.name" item-value="attributes.name" :disabled="!enabledAssembly" hide-details label="Assembly" v-model="income.assembly"></v-select>
        </div>
        <div class="d-flex pa-4">
          <div class="tw-flex tw-flex-wrap tw-justify-around">
            <v-checkbox-btn v-model="enabledDistrict" class="pe-2"></v-checkbox-btn>
          </div>
          <!-- <v-text-field :disabled="!enabled" hide-details label="I only work if you check the box"></v-text-field> -->
          <v-select clearable :rules="nameRules" variant="solo" :items="districts" item-title="attributes.name" item-value="attributes.name" :disabled="!enabledDistrict" hide-details label="District" v-model="income.district"></v-select>
        </div>
        <div class="d-flex pa-4">
          <div class="tw-flex tw-flex-wrap tw-justify-around">
            <v-checkbox-btn v-model="enabledArea" class="pe-2"></v-checkbox-btn>
          </div>
          <!-- <v-text-field :disabled="!enabled" hide-details label="I only work if you check the box"></v-text-field> -->
          <v-select clearable :rules="nameRules" variant="solo" :items="areas" item-title="attributes.name" item-value="attributes.name" :disabled="!enabledArea" hide-details label="Area" v-model="income.area"></v-select>
        </div>

        <div class="text-center mb-3">
          <v-btn type="button" @click="submitIncome">Add Income</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const ministries = reactive([]);
const budgetItems = reactive([]);
const assemblies = ref([]);
const form = ref(null);
const districts = ref([]);
const areas = ref([]);
const enabledAssembly = ref(false);
const enabledDistrict = ref(false);
const enabledArea = ref(false);
const budget_amt = ref(0);
const incomeItemTypes = ref([
  { type: "Income", val: "income" },
  { type: "Expense", val: "expense" },
]);
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);
const toaster = reactive({});

const income = reactive({
  budget_item_id: "",
  budget_id: "",
  year: "",
  amount: "",
  type: "",
  assembly: "",
  district: "",
  area: "",
  details: "",
});

onMounted(async () => {
  let getData = await useGetData("ministry");
  let getData2 = await useGetData("assembly");
  let getData3 = await useGetData("district");
  let getData4 = await useGetData("area");
  let getData5 = await useGetData("budget-item");

  ministries.value = getData.data.data;
  assemblies.value = getData2.data.data;
  districts.value = getData3.data.data;
  areas.value = getData4.data.data;

  let Items = getData5.data.data;

  let arry = [];
  Items.filter((res) => {
    if (res.attributes.type === "income") {
      arry.push(res);
    }
  });
  budgetItems.value = arry;
});

const getBudgetItems = async (event) => {
  let result = budgetItems.value.filter((res) => {
    return res.id == event.target.value;
  });

  income.year = result[0].attributes.year;
  income.type = result[0].attributes.type;

  if (result[0].attributes.budget.length > 0) {
    budget_amt.value = result[0].attributes.budget[0].amount;
    income.budget_id = result[0].attributes.budget[0].id.toString();
  } else {
    budget_amt.value = 0;
    income.budget_id = "";
  }
};

let submitIncome = async () => {
  let submitData = await useSubmitData("submitIncome", "income", income);

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Add Income",
      info: "Income not added successfully. Try again",
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Add Income",
      info: "Income  added successfully!",
    };

    // income.budget_item_id = "";
    // income.year = "";
    // income.amount = "";
    // income.type = "";
    // income.approvedBy = "";
    // income.assembly = "";
    // income.district = "";
    // income.area = "";
    // income.details = "";
    form.value.reset();
  }
};
</script>

<style></style>
