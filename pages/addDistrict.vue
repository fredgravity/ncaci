<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add district</div>
    </div>
    <Loading :loading="loading" />

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <form>
        <div class="mb-3 row">
          <label for="district" class="col-md-2 col-form-label">Area</label>
          <div class="col-md-12">
            <!-- <select class="form-control" id="district" v-model="district.area_id">
              <template v-for="(area, index) in areas.value" :key="index">
                <option :value="area.id">{{ area.attributes.name }}</option>
              </template>
            </select> -->
            <v-select clearable variant="solo" :items="areas" item-title="attributes.name" item-value="id" label="area" v-model="district.area_id"></v-select>
          </div>
        </div>

        <div class="mb-3 row">
          <div class="col-md-12">
            <v-text-field v-model="district.name" clearable variant="solo" label="district" required></v-text-field>
          </div>
        </div>

        <div class="text-center">
          <v-btn type="button" @click="submitDistrict">Add District</v-btn>
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
const areas = ref([]);
const loading = ref("");
const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

const district = reactive({
  name: "",
  area_id: "",
});

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/area", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },

    initialCache: false,
  });
  loading.value = pending.value;
  areas.value = data.value.data;
  console.log(areas.value);
});

let submitDistrict = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitDistrict", () =>
    $fetch(api_base + "/district", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: district,
    })
  );

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Church District not added successfully!. Try again";
    error_message.title = "Add District";

    // error_message.value = error.value.data.message;
  } else {
    // alert();

    error_message.type = "success";
    error_message.text = "Church District added successfully!";
    error_message.title = "Add District";

    district.name = "";
    district.area_id = "";
  }
};
</script>

<style></style>
