<template>
  <div>
    <div class="ml-4 mt-3 font-bold">Children Information</div>
    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>
    <div class="card-body">
      <form method="POST" onsubmit="return false" @submit="preventDefault">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Child Name</label>
            <input class="form-control" type="text" id="name" name="name" v-model="child.name" autofocus />
          </div>

          <div class="mb-3 col-md-6">
            <label for="dob" class="col-md-2 col-form-label">DOB</label>
            <div class="col-md-10">
              <input class="form-control" type="date" id="dob" v-model="child.dob" />
            </div>
          </div>

          <div class="mb-3 col-md-6">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" class="select2 form-select" v-model="child.gender">
              <!-- <option value="">Select Language</option> -->
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <button type="button" class="btn btn-primary me-2" @click="submitChild">Add Child</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const toaster = reactive({});

const child = reactive({
  name: "",
  gender: "",
  dob: "",
  member_id: route.params.id,
});

let submitChild = async () => {
  let submitData = await useSubmitData("submitChild", "member-children", child);
  // error_message.value = error.value.data.message;

  if (submitData.error.value) {
    toaster.value = {
      type: "error",
      title: "Pay Member Tithe",
      info: submitData.error.value.data.message,
    };
  } else {
    toaster.value = {
      type: "success",
      title: "Pay Member Tithe",
      info: "Church member tithe payed successfully!.",
    };

    child.name = "";
    child.gender = "";
    child.dob = "";
    child.member_id = "";
  }
};
</script>

<style></style>
