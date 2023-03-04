<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">Register User</div>

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-2/3 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <form>
        <div class="mb-3 row">
          <div class="col-md-10">
            <!-- <input class="form-control" type="text" id="name" v-model="user.name" /> -->
            <v-text-field v-model="user.name" clearable :rules="nameRules" variant="solo" label="name" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-10">
            <!-- <input class="form-control" type="email" id="email" v-model="user.email" /> -->
            <v-text-field v-model="user.email" clearable :rules="nameRules" variant="solo" label="email" type="email" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-10">
            <v-text-field v-model="user.password" clearable :rules="nameRules" variant="solo" label="password" type="password" required></v-text-field>
            <!-- <input class="form-control" type="password" id="password" v-model="user.password" /> -->
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-10">
            <!-- <input class="form-control" type="password" id="password2" v-model="user.password_confirmation" /> -->
            <v-text-field v-model="user.password_confirmation" clearable :rules="nameRules" variant="solo" label="confirm password" type="password" required></v-text-field>
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-10">
            <!-- <select class="form-control" id="role" v-model="user.role">
              <option selected value="admin">Admin</option>
              <option value="user">User</option>
            </select> -->
            <v-select clearable label="user role" :items="roleItems" item-title="role" item-value="val" :rules="nameRules" variant="solo" v-model="user.role"></v-select>
          </div>
        </div>

        <div class="text-center mb-3">
          <v-btn type="button" @click="submitUser">Add User</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const assemblies = reactive([]);
const ministries = reactive([]);
const roleItems = ref([
  { role: "Admin", val: "admin" },
  { role: "User", val: "user" },
]);
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);

const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "",
});

let submitUser = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitUser", () =>
    $fetch(api_base + "/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: user,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Church User not added successfully!. Try again";
    error_message.title = "Add User";
  } else {
    error_message.type = "success";
    error_message.text = "Church User added successfully!.";
    error_message.title = "Add User";

    user.name = "";
    user.email = "";
    user.password = "";
    user.password_confirmation = "";
    user.role = "";
  }
};
</script>

<style></style>
