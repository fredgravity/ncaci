<template>
  <div>
    <div class="ml-4 mt-3 font-bold">Spouse Information</div>
    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>
    <div class="card-body">
      <form id="formAccountSettings" method="POST" onsubmit="return false">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="name" class="form-label">Spouse Name</label>
            <input class="form-control" type="text" id="name" v-model="spouse.name" name="name" autofocus />
          </div>
          <div class="mb-3 col-md-6">
            <label for="home_town" class="form-label">Home Town</label>
            <input class="form-control" type="text" name="home_town" id="home_town" v-model="spouse.home_town" />
          </div>

          <div class="mb-3 col-md-6">
            <label class="form-label" for="phone">Phone Number</label>
            <div class="input-group input-group-merge">
              <!-- <span class="input-group-text">US (+1)</span> -->
              <input type="text" id="phone" name="phone" class="form-control" placeholder="202 555 0111" v-model="spouse.phone" />
            </div>
          </div>
          <div class="mb-3 col-md-6">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" name="address" placeholder="Address" v-model="spouse.address" />
          </div>

          <div class="mb-3 col-md-6">
            <label for="dob" class="col-md-2 col-form-label">DOB</label>
            <div class="col-md-10">
              <input class="form-control" type="date" id="dob" v-model="spouse.dob" />
            </div>
          </div>

          <div class="mb-3 col-md-6">
            <label for="status" class="form-label">Status</label>
            <select id="status" class="select2 form-select" v-model="spouse.status">
              <!-- <option value="">Select Language</option> -->
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
            </select>
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-primary me-2" @click="submitSpouse">Add Spouse</button>
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
const route = useRoute();
const toaster = reactive({});

const spouse = reactive({
  name: "",
  status: "",
  phone: "",
  address: "",
  home_town: "",
  dob: "",
  member_id: route.params.id,
});

let submitSpouse = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitSpouse", () =>
    $fetch(api_base + "/member-spouse", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: spouse,
    })
  );

  if (error.value) {
    toaster.value = {
      type: "error",
      title: "Error",
      info: error.value.data.message,
    };
  }
  if (data.value.data) {
    toaster.value = {
      type: "success",
      title: "Success",
      info: "Church member's spouse added successfully!",
    };

    spouse.name = "";
    spouse.phone = "";
    spouse.home_town = "";
    spouse.address = "";
    spouse.status = "";
    spouse.dob = "";
  }
};
</script>

<style></style>
