<template>
  <div class="tw-px-3 md:tw-px-0 tw-relative tw-h-full">
    <!-- ?xml version="1.0" standalone="no"?-->
    <svg id="sw-js-blob-svg" viewBox="-10 10 100 100" xmlns="http://www.w3.org/2000/svg" class="tw-hidden md:tw-block -tw-z-50 md:tw-absolute">
      <defs>
        <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
          <stop id="stop1" stop-color="rgba(71.059, 55, 248, 1)" offset="0%"></stop>
          <stop id="stop2" stop-color="rgba(148.756, 156.943, 214.718, 1)" offset="80%"></stop>
        </linearGradient>
      </defs>
      <path
        fill="url(#sw-gradient)"
        d="M18.8,-18.3C24.2,-13.4,28.3,-6.7,30.3,2C32.3,10.7,32.2,21.4,26.8,27.7C21.4,34,10.7,35.8,0.3,35.5C-10.1,35.1,-20.1,32.7,-27.8,26.4C-35.5,20.1,-40.8,10.1,-41.6,-0.7C-42.3,-11.5,-38.5,-23.1,-30.8,-27.9C-23.1,-32.8,-11.5,-30.9,-2.4,-28.5C6.7,-26.1,13.4,-23.1,18.8,-18.3Z"
        width="70%"
        height="70%"
        transform="translate(10 40)"
        stroke-width="0"
        style="transition: all 0.3s ease 0s"
        stroke="url(#sw-gradient)"
      ></path>
    </svg>
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
