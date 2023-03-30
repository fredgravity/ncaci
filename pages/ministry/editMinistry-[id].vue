<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">edit ministry</div>
    </div>
    <Loading :loading="loading" />

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-bg-gray-100 tw-shadow-xl tw-mb-4 tw-p-2">
      <form ref="form">
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
const loading = ref("");
const toaster = reactive({});
const ministry_id = ref("");
const route = useRoute();

const ministry = reactive({
  name: "",
});

onMounted(async () => {
  ministry_id.value = route.params.id;
  let getData = await useGetData("ministry/" + ministry_id.value);

  loading.value = getData.pending;
  let result = getData.data.data;
  ministry.name = result.attributes.name;
});

let submitMinistry = async () => {
  let submitData = await useSubmitData("submitMinistry", "ministry/" + ministry_id.value, ministry, "put");

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Edit Ministry",
      info: submitData.error.value.data.message,
    };
  }
  if (submitData.data.data) {
    toaster.value = {
      type: "success",
      title: "Edit Ministry",
      info: "Church Ministry edited successfully!.",
    };
  }
};
</script>

<style></style>
