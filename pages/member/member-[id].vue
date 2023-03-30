<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add member details</div>
    </div>

    <div v-if="error_message" class="alert alert-danger alert-dismissible" role="alert">
      {{ error_message }}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>

    <div class="card-body">
      <div class="d-flex align-items-start align-items-sm-center gap-4">
        <img src="../../assets/assets/img/avatars/1.png" alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar" />
        <div class="button-wrapper" v-if="member.attributes">
          <p class="text-muted mb-0">Name: {{ member.attributes.name }}</p>
          <p class="text-muted mb-0">Gender: {{ member.attributes.gender }}</p>
          <p class="text-muted mb-0">DOB: {{ member.attributes.dob }}</p>
          <p class="text-muted mb-0">Marital Status: {{ member.attributes.marital_status }}</p>
        </div>
      </div>
    </div>
    <hr class="border-b border-blue-300 mb-4" />

    <!--  -->
    <v-card class="tw-mb-10">
      <v-tabs v-model="tab" bg-color="" centered stacked>
        <v-tab value="tab-1"> Spouse </v-tab>

        <v-tab value="tab-2"> Children </v-tab>

        <v-tab value="tab-3"> Parent </v-tab>
        <v-tab value="tab-4"> Occupation </v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="tab-1">
          <LazyMoreInfoSpouse />
        </v-window-item>
        <v-window-item value="tab-2">
          <LazyMoreInfoChildren />
        </v-window-item>
        <v-window-item value="tab-3">
          <v-card>
            <LazyMoreInfoParent />
          </v-card>
        </v-window-item>
        <v-window-item value="tab-4">
          <v-card>
            <LazyMoreInfoOccupation />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>

    <!--  -->
  </div>
</template>

<script setup>
const route = useRoute();
const member = ref([]);
const error_message = ref("");
const tab = ref(null);
const router = useRouter();

onMounted(async () => {
  const member_id = route.params.id;
  let getData = await useGetData("member/" + member_id);

  if (getData.error.value && getData.error.value.statusCode == 404) {
    router.back();
  }
  member.value = getData.data.data;
});
</script>

<style></style>
