<template>
  <div class="tw-px-3 md:tw-px-0 tw-relative tw-h-full">
    <SvgsLogin />
    <div class="tw-text-2xl md:tw-text-4xl tw-my-10 text-deep-purple tw-text-blue-500 tw-text-center">The New Covenant Apostolic Church International</div>
    <v-form class="md:tw-w-96 tw-mx-auto tw-text-gray-600" ref="form" v-model="valid" lazy-validation>
      <!-- <div class="tw-text-center tw-text-2xl">Login</div> -->
      <div class="tw-w-full tw-text-center tw-pb-4">
        <v-img class="tw-w-20 tw-mx-auto" src="/ncaciLogo.jpg" cover></v-img>
      </div>
      <div class="tw-text-center tw-text-red-400" v-if="errorMessage">{{ errorMessage }}</div>
      <v-text-field class="tw-pr-4 md:tw-pr-0" v-model="loginForm.email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field class="tw-pr-4 md:tw-pr-0" type="password" v-model="loginForm.password" :rules="passwordRules" label="Password" required></v-text-field>
      <v-btn color="" class="tw-w-full tw-py-10 tw-bg-blue-400" @click="validate">
        <template v-if="loading"> Go! </template>
        <template v-else-if="!loading"> Loading... </template>
      </v-btn>
    </v-form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "",
});
const loading = ref("false");
const valid = ref(true);
const errorMessage = ref("");
const loginForm = reactive({
  email: "admin@me.com",
  password: "admin@123",
});
// const email = ref("admin@me.com");
// const password = ref("admin@123");
const emailRules = [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"];
const passwordRules = [(v) => !!v || "Password is required"];
const validate = async () => {
  if (!loginForm.email || !loginForm.password) {
    alert("validation failed");
  } else {
    submitLogin();
  }
};
const loginStore = useLoginStore();

const submitLogin = async () => {
  loading.value = !loading.value;
  await loginStore.login(loginForm);
  if (loginStore.error) {
    errorMessage.value = loginStore.error;
    setTimeout(() => {
      errorMessage.value = "";
      loading.value = true;
    }, 5000);
  }
};
</script>

<style></style>
