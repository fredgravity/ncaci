<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add ministry</div>
    </div>

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <form>
        <div class="mb-3 row">
          <!-- <label for="name" class="col-md-2 col-form-label">Ministry Name</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="name" v-model="ministry.name" /> -->
            <v-text-field v-model="ministry.name" clearable variant="solo" label="ministry name" required></v-text-field>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitMinistry">Add Ministry</v-btn>
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

const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

const ministry = reactive({
  name: "",
});

let submitMinistry = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitMinistry", () =>
    $fetch(api_base + "/ministry", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: ministry,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Church Ministry not added successfully!. Try again";
    error_message.title = "Add Ministry";
  } else {
    // alert();

    error_message.type = "success";
    error_message.text = "Church Ministry added successfully!.";
    error_message.title = "Add Ministry";

    ministry.name = "";
  }
};
</script>

<style></style>
