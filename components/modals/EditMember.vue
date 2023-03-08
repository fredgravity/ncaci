<template>
  <div>
    <!-- Modal -->

    <div class="modal fade" id="editSpouse" tabindex="-1" aria-hidden="true">
      <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
        {{ error_message }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit Spouse</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form ref="form">
              <div class="mb-3 row">
                <label for="name" class="col-md-2 col-form-label">Name</label>
                <div class="col-md-10">
                  <input class="form-control" type="text" id="name" v-model="member.name" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="email" class="col-md-2 col-form-label">Email</label>
                <div class="col-md-10">
                  <input class="form-control" type="email" id="email" v-model="member.email" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="home_town" class="col-md-2 col-form-label">Home Town</label>
                <div class="col-md-10">
                  <input class="form-control" type="text" id="home_town" v-model="member.home_town" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="phone" class="col-md-2 col-form-label">Phone</label>
                <div class="col-md-10">
                  <input class="form-control" type="tel" id="phone" v-model="member.phone" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="dob" class="col-md-2 col-form-label">Date of Birth</label>
                <div class="col-md-10">
                  <input class="form-control" type="date" id="dob" v-model="member.dob" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="gender" class="col-md-2 w-full col-form-label">Gender</label>
                <div class="col-md-10">
                  <select class="form-control" id="gender" v-model="member.gender">
                    <!-- <option selected>Open this select menu</option> -->
                    <option selected value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="marital_status" class="col-md-2 col-form-label">Marital Status</label>
                <div class="col-md-10">
                  <select class="form-control" id="marital_status" v-model="member.marital_status">
                    <!-- <option selected>Open this select menu</option> -->
                    <option selected value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="assembly" class="col-md-2 col-form-label">Assembly</label>
                <div class="col-md-10">
                  <select class="form-control" id="assembly" v-model="member.assembly_id">
                    <template v-for="(assembly, index) in assemblies.value" :key="index">
                      <option v-if="assembly.attributes.name" :value="assembly.id">{{ assembly.attributes.name }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="ministry" class="col-md-2 col-form-label">Ministry</label>
                <div class="col-md-10">
                  <select class="form-control" id="ministry" v-model="member.ministry_id">
                    <template v-for="(ministry, index) in ministries.value" :key="index">
                      <option v-if="ministry.attributes.name" :value="ministry.id">{{ ministry.attributes.name }}</option>
                    </template>
                  </select>
                </div>
              </div>
              <div class="mb-3 row mx-1">
                <label for="Address" class="col-md-2 col-form-label">Address</label>
                <textarea class="form-control" id="Address" rows="3" v-model="member.address"></textarea>
              </div>
            </form>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="submitMember">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const props = defineProps({
  member: ref([]),
  assemblies: ref([]),
  ministries: ref([]),
  member_id: String,
});
const form = ref(null);
const data = ref(props.member);
const error_message = ref("");
//
const member = reactive({
  name: "",
  email: "",
  home_town: "",
  phone: "",
  dob: "",
  gender: "",
  assembly_id: "",
  ministry_id: "",
  marital_status: "",
  address: "",
});

setTimeout(() => {
  // console.log(data.value.attributes.name);
  member.name = data.value.attributes.name;
  member.email = data.value.attributes.email;
  member.home_town = data.value.attributes.home_town;
  member.phone = data.value.attributes.phone;
  member.dob = data.value.attributes.dob;
  member.gender = data.value.attributes.gender;
  member.marital_status = data.value.attributes.marital_status;
  member.address = data.value.attributes.address;
  member.ministry_id = data.value.attributes.ministry_id;
  member.assembly_id = data.value.attributes.assembly_id;
}, 2000);

let submitMember = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/member/" + props.member_id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: member,
    initialCache: false,
  });

  //   console.log(error_message);
  if (error.value) {
    error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    error_message.value = "Church member edited successfully!";
    form.value.reset();
  }
};
</script>

<style></style>
