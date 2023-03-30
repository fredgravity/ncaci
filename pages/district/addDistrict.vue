<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add district</div>
    </div>
    <Loading :loading="loading" />

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <form ref="form">
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
const form = ref(null);
const loading = ref("");
const toaster = reactive({});

const district = reactive({
  name: "",
  area_id: "",
});

onMounted(async () => {
  let getData = await useGetData("area");

  loading.value = getData.pending;
  areas.value = getData.data.data;
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
    toaster.value = {
      type: "error",
      title: "Add District",
      info: "Church District not added successfully!. Try again",
    };

    // error_message.value = error.value.data.message;
  } else {
    toaster.value = {
      type: "success",
      title: "Add District",
      info: "Church District added successfully!",
    };

    // district.name = "";
    // district.area_id = "";
    form.value.reset();
  }
};
</script>

<style></style>
