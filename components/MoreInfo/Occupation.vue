<template>
  <div id="reloadDiv">
    <div class="ml-4 mt-3 font-bold">Occupation Information</div>
    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>
    <div class="card-body">
      <div>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Name</label>
            <input class="form-control" type="text" id="name" name="name" v-model="occupation.name" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="location" class="form-label">Location</label>
            <input class="form-control" type="text" id="location" name="location" v-model="occupation.location" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="occupation" class="col-md-6 col-form-label">Occupation</label>
            <input class="form-control" type="text" id="occupation" name="occupation" v-model="occupation.occupation" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="status" class="form-label">Status</label>
            <select id="status" class="select2 form-select" v-model="occupation.status">
              <!-- <option value="">Select Language</option> -->
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div class="mb-3 col-md-6">
            <label for="sector" class="form-label">Sector</label>
            <select id="sector" class="select2 form-select" v-model="occupation.sector">
              <!-- <option value="">Select Language</option> -->
              <option value="ict">ICT</option>
              <option value="finance">Banking and Finance</option>
              <option value="construction">Construction</option>
              <option value="health">Health</option>
              <option value="Education">Education</option>
              <option value="government">Government</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2" @click="submitOccupation">Add Occupation</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const toaster = reactive({});

const occupation = reactive({
  name: "",
  location: "",
  status: "",
  occupation: "",
  sector: "",
  member_id: route.params.id,
});

let submitOccupation = async () => {
  let submitData = await useSubmitData("submitOccupation", "member-occupation", occupation);

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Error",
      info: submitData.error.value.data.message,
    };

    // error_message.value = error.value.data.message;
  } else {
    toaster.value = {
      type: "success",
      title: "Success",
      info: "Church member's child added successfully!",
    };

    occupation.name = "";
    occupation.location = "";
    occupation.status = "";
    occupation.occupation = "";
    occupation.sector = "";
    occupation.member_id = "";
  }
};
</script>

<style></style>
