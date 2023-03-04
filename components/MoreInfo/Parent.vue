<template>
  <div>
    <div class="ml-4 mt-3 font-bold">Parent Information</div>
    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>
    <div class="card-body">
      <form id="formAccountSettings" method="POST" onsubmit="return false">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Parent Name</label>
            <input class="form-control" type="text" id="name" name="name" v-model="parent.name" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="relation" class="form-label">Parent Relation</label>
            <input class="form-control" type="text" id="relation" name="relation" v-model="parent.relation" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="dob" class="col-md-2 col-form-label">DOB</label>
            <div class="col-md-10">
              <input class="form-control" type="date" id="dob" v-model="parent.dob" />
            </div>
          </div>

          <div class="mb-3 col-md-6">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" class="select2 form-select" v-model="parent.gender">
              <!-- <option value="">Select Language</option> -->
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2" @click="submitParent">Add Parent</button>
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

const parent = reactive({
  name: "",
  gender: "",
  dob: "",
  relation: "",
  member_id: route.params.id,
});

let submitParent = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitParent", () =>
    $fetch(api_base + "/member-parent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: parent,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.title = "Error";
    error_message.text = error.value.data.message;
    // error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    // error_message.value = "Church member's child added successfully!";
    error_message.type = "success";
    error_message.title = "Success";
    error_message.text = "Church member's parent added successfully!";
    parent.name = "";
    parent.gender = "";
    parent.dob = "";
    parent.relation = "";
    parent.member_id = "";
  }
};
</script>

<style></style>
