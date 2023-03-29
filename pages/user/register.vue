<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">Register User</div>

    <div class="card-body md:tw-w-2/3 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <form ref="form">
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

        <div class="mb-3 row">
          <div class="col-md-10">
            <v-select clearable label="user permission" :items="permItems" item-title="perm" item-value="val" :rules="nameRules" variant="solo" v-model="user.permission"></v-select>
          </div>
        </div>

        <div class="text-center mb-3">
          <v-btn type="button" @click="submitUser">Add User</v-btn>
        </div>
      </form>
    </div>
    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>
  </div>
</template>

<script setup>
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const form = ref(null);
const loading = ref("");
const assemblies = reactive([]);
const ministries = reactive([]);
const toaster = reactive({});
const roleItems = ref([
  { role: "Admin", val: "admin" },
  { role: "User", val: "user" },
  { role: "Assembly", val: "assembly" },
  { role: "District", val: "district" },
  { role: "Area", val: "area" },
]);
const permItems = ref([]);
const nameRules = ref([
  (value) => {
    if (value) return true;

    return "Fields is requred.";
  },
]);

const user = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: "",
  permission: "",
});

watch(user, async (newRole) => {
  if (newRole.role !== "" && newRole.role !== "admin" && newRole.role !== "user") {
    const { data, error, refresh, pending } = await useFetch(api_base + "/" + newRole.role, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },

      initialCache: false,
    });

    loading.value = pending.value;
    permItems.value = [];

    data.value.data.filter((res) => {
      permItems.value.push({
        perm: res.attributes.name,
        val: res.attributes.name,
      });
    });
  }
  if (newRole.role !== "" && newRole.role == "admin") {
    permItems.value = [];
    permItems.value.push({
      perm: "Admin",
      val: "admin",
    });
  }

  if (newRole.role !== "" && newRole.role == "user") {
    permItems.value = [];
    permItems.value.push({
      perm: "User",
      val: "user",
    });
  }
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
    toaster.value = {
      type: "error",
      title: "Add User",
      info: "Church User not added successfully!. Try again",
    };

    // form.value.reset();
  } else {
    toaster.value = {
      type: "success",
      title: "Add User",
      info: "Church User added successfully!. Try again",
    };

    // user.name = "";
    // user.email = "";
    // user.password = "";
    // user.password_confirmation = "";
    // user.role = "";

    form.value.reset();
  }
};
</script>

<style></style>
