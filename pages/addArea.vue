<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add area</div>
    </div>

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <form>
        <div class="mb-3 row">
          <!-- <label for="name" class="col-md-2 col-form-label">Area Name</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="name" v-model="area.name" /> -->
            <v-text-field v-model="area.name" clearable variant="solo" label="area name" required></v-text-field>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitArea">Add Area</v-btn>
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
  text: "",
  title: "",
});

const area = reactive({
  name: "",
});

let submitArea = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitArea", () =>
    $fetch(api_base + "/area", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: area,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Church Area not added successfully!. Try again";
    error_message.title = "Add Area";
  } else {
    error_message.type = "success";
    error_message.text = "Church Area added successfully!";
    error_message.title = "Add Area";

    area.name = "";
  }
};
</script>

<style></style>
