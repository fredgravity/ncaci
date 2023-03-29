<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add ministry</div>
    </div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-xl tw-mb-4 tw-p-2">
      <form ref="form">
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
const form = ref(null);

const toaster = reactive({});

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
    toaster.value = {
      type: "error",
      title: "Add Ministry",
      info: "Church Ministry not added successfully!. Try again",
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Add Ministry",
      info: "Church Ministry added successfully!.",
    };

    ministry.name = "";
    form.value.reset();
  }
};
</script>

<style></style>
