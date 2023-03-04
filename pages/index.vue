<template>
  <div class="tw-w-full tw-mx-auto tw-mt-32">
    <v-form class="tw-w-96 tw-mx-auto tw-py-10" ref="form" v-model="valid" lazy-validation>
      <div class="tw-text-center tw-text-2xl">Login</div>
      <v-text-field class="tw-pr-4 md:tw-pr-0" v-model="loginForm.email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-text-field class="tw-pr-4 md:tw-pr-0" type="password" v-model="loginForm.password" :rules="passwordRules" label="Password" required></v-text-field>
      <v-btn color="success" class="tw-w-full tw-py-10" @click="validate">
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
  loginStore.login(loginForm);
};
</script>

<style></style>
