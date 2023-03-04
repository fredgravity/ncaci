<template>
  <div>
    <!-- Modal -->

    <div class="modal fade" id="payTithe" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Pay Tithe</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3 row">
                <label for="name" class="col-md-2 col-form-label">Amount</label>
                <div class="col-md-10">
                  <input class="form-control" type="number" id="name" v-model="tithe.amount" />
                </div>
              </div>

              <div class="mb-3 row">
                <label for="email" class="col-md-2 col-form-label">paidBy</label>
                <div class="col-md-10">
                  <input class="form-control" type="text" id="email" v-model="tithe.paidby" />
                </div>
              </div>
            </form>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="submitTithe">Pay Now!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
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
  const { data, error, refresh } = await useFetch(api_base + "/tithe/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: tithe,
    initialCache: false,
  });

  //   console.log(error_message);
  if (error.value) {
    // error_message.value = error.value.data.message;
  }
  if (data.value.data) {
    // error_message.value = "Church member edited successfully!";
  }
};
</script>

<style></style>
