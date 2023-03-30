<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add area</div>
    </div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <form ref="form">
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
const form = ref(null);

const toaster = reactive({});

const area = reactive({
  name: "",
});

let submitArea = async () => {
  let submitData = await useSubmitData("submitArea", "area", area);

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Add Area",
      info: "Church Area not added successfully! Try again",
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Add Area",
      info: "Church Area added successfully!",
    };

    area.name = "";
    form.value.reset();
  }
};
</script>

<style></style>
