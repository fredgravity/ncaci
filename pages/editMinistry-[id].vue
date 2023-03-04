<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">edit ministry</div>
    </div>
    <Loading :loading="loading" />

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-bg-gray-100 tw-shadow-xl tw-mb-4 tw-p-2">
      <form>
        <div class="mb-3 row">
          <!-- <label for="name" class="col-md-2 col-form-label">Ministry Name</label> -->
          <div class="col-md-12">
            <!-- <input class="form-control" type="text" id="name" v-model="ministry.name" /> -->
            <v-text-field v-model="ministry.name" clearable variant="solo" label="ministry name" required></v-text-field>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitMinistry">Edit Ministry</v-btn>
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
const loading = ref("");
const error_message = reactive({
  type: "",
  title: "",
  text: "",
});
const ministry_id = ref("");
const route = useRoute();

const ministry = reactive({
  name: "",
});

onMounted(async () => {
  ministry_id.value = route.params.id;

  const { data, error, refresh, pending } = await useFetch(api_base + "/ministry/" + ministry_id.value, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  loading.value = pending.value;
  let result = data.value.data;
  ministry.name = result.attributes.name;
});

let submitMinistry = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitMinistry", () =>
    $fetch(api_base + "/ministry/" + ministry_id.value, {
      method: "put",
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
    error_message.text = error.value.data.message;
    error_message.title = "Add Ministry";
  }
  if (data.value.data) {
    error_message.type = "success";
    error_message.text = "Church Ministry edited successfully!.";
    error_message.title = "Add Ministry";
  }
};
</script>

<style></style>
