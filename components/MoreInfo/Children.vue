<template>
  <div>
    <div class="ml-4 mt-3 font-bold">Children Information</div>
    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>
    <div class="card-body">
      <form method="POST" onsubmit="return false" @submit="preventDefault">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Child Name</label>
            <input class="form-control" type="text" id="name" name="name" v-model="child.name" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="dob" class="col-md-2 col-form-label">DOB</label>
            <div class="col-md-10">
              <input class="form-control" type="date" id="dob" v-model="child.dob" />
            </div>
          </div>

          <div class="mb-3 col-md-6">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" class="select2 form-select" v-model="child.gender">
              <!-- <option value="">Select Language</option> -->
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <button type="button" class="btn btn-primary me-2" @click="submitChild">Add Child</button>
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
const route = useRoute();
const toaster = reactive({});

const child = reactive({
  name: "",
  gender: "",
  dob: "",
  member_id: route.params.id,
});

let submitChild = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitChild", () =>
    $fetch(api_base + "/member-children", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: child,
    })
  );

  if (error.value) {
    toaster.value = {
      type: "error",
      title: "Error",
      info: error.value.data.message,
    };
  }
  if (data.value.data) {
    toaster.value = {
      type: "success",
      title: "Success",
      info: "Church member's child added successfully!",
    };

    child.name = "";
    child.gender = "";
    child.dob = "";
    child.member_id = "";
  }
};
</script>

<style></style>
