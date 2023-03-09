<template>
  <div>
    <!-- Modal -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent class="tw-w-1/2">
        <template v-slot:activator="{ props }">
          <!-- <v-btn color="primary" v-bind="props"> Open Dialog </v-btn> -->
          <div class="tw-flex tw-justify-items-start tw-text-green-400 tw-cursor-pointer hover:tw-border-b-2 tw-ease-linear tw-duration-200" v-bind="props">Pay Here</div>
        </template>
        <v-card class="tw-text-center">
          <v-card-title class="text-h5"> Pay Tithe ({{ tithe.paidby }}) </v-card-title>
          <v-container class="tw-mb-2">
            <form ref="form">
              <div class="mb-3 row">
                <!-- <label for="name" class="col-md-2 col-form-label">Amount</label> -->
                <div class="col-md-12">
                  <!-- <v-select clearable  variant="solo" :items="ministries" item-title="attributes.name" item-value="id" label="Ministry" ></v-select> -->
                </div>
              </div>
              <div class="mb-3 row">
                <!-- <label for="name" class="col-md-2 col-form-label">Amount</label> -->
                <div class="col-md-12">
                  <!-- <input class="form-control" type="number" id="name" v-model="tithe.amount" /> -->
                  <v-text-field clearable variant="solo" type="number" label="tithe amount" v-model="tithe.amount"></v-text-field>
                </div>
              </div>

              <div class="mb-3 row">
                <!-- <label for="email" class="col-md-2 col-form-label">paidBy</label> -->
                <div class="col-md-12">
                  <!-- <input class="form-control" type="text" id="email" v-model="tithe.paidby" /> -->
                  <v-text-field clearable variant="solo" type="text" label="paid by" v-model="tithe.paidby"></v-text-field>
                </div>
              </div>
            </form>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="dialog = false"> Close </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="submitTithe"> Pay Now! </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const dialog = ref(false);
const form = ref(null);
const props = defineProps({
  member: ref([]),
  member_id: String,
});
const data = await ref(props.member);
//
const tithe = reactive({
  amount: "",
  paidby: "",
  member_id: props.member_id,
});
setTimeout(() => {
  // console.log(data.value.attributes.name);
  // tithe.amount = data.value.value.attributes.amount;
  tithe.paidby = data.value.attributes.name;
}, 2000);

let submitTithe = async () => {
  const { data, pending, error, refresh } = await useAsyncData("submitTithe", () =>
    $fetch(api_base + "/tithe", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + accessToken.accessToken,
      },
      body: tithe,
    })
  );

  console.log(error.value);
  if (error.value) {
    // error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    form.value.reset();
    // error_message.value = "Church member edited successfully!";
  }
};
</script>

<style></style>
