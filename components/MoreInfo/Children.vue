<template>
  <div>
    <div class="ml-4 mt-3 font-bold">Children Information</div>
    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>
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
const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

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
    error_message.type = "error";
    error_message.title = "Error";
    error_message.text = error.value.data.message;
    // error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    error_message.type = "success";
    error_message.title = "Success";
    error_message.text = "Church member's child added successfully!";
    // error_message.value = "Church member's child added successfully!";
    child.name = "";
    child.gender = "";
    child.dob = "";
    child.member_id = "";
  }
};
</script>

<style></style>
