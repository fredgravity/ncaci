<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">add tithe</div>

    <Loading :loading="loading" />

    <template v-if="error_message.type">
      <Alert :alert="error_message" v-if="error_message" />
    </template>

    <div class="mb-3 row">
      <label for="assembly" class="col-md-2 col-form-label">Find Assembly</label>
      <div class="col-md-10">
        <select class="form-control" id="assembly" @change="getAssemblyDetails($event)">
          <option selected disabled>Find an assembly to pay tithe</option>
          <template v-for="(assembly, index) in assemblies.value" :key="index">
            <option :value="assembly.id">{{ assembly.attributes.name }}</option>
          </template>
        </select>
      </div>
    </div>
    <div>
      <div class="col-md">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img class="card-img card-img-left" src="~/assets/assets/img/elements/12.jpg" alt="Card image" />
            </div>
            <div class="col-md-8">
              <div class="card-body" v-if="detail.attributes">
                <p class="card-title font-semibold">
                  Assembly: <span class="text-gray-400 text-lg">{{ detail.attributes.name }}</span>
                </p>
                <p class="card-text font-semibold">
                  District: <span class="text-gray-400">{{ detail.attributes.district }}</span>
                </p>
                <p class="card-text font-semibold">
                  Area: <span class="text-gray-400">{{ detail.attributes.area.name }}</span>
                </p>
                <p class="card-text font-semibold">
                  Head Pastor: <span class="text-gray-400">{{ detail.attributes.pastor }}</span>
                </p>
                <p class="card-text font-semibold">
                  <small class="text-muted">Last updated {{ new Date(detail.attributes.updated_at).toDateString() }}</small>
                </p>
              </div>
              <div class="text-center mb-3 md:mb-0" v-if="detail.attributes">
                <div class="mb-3">
                  <label for="name" class="col-md-6 col-form-label">Pay Assembly Tithe</label>
                  <div class="flex flex-wrap px-2 justify-between">
                    <div class="col-md-3 mb-2 md:mb-0 mx-auto">
                      <input class="form-control" type="number" placeholder="Enter Amount" id="amount" v-model="tithe.amount" />
                    </div>
                    <div class="col-md-4 mb-2 md:mb-0 mx-auto">
                      <input class="form-control" type="text" placeholder="Paid By" id="paidby" v-model="tithe.paidby" />
                    </div>
                    <div class="col-md-4">
                      <input class="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                  </div>
                </div>
                <button type="button" class="btn btn-success" @click="submitTithe">Pay Tithe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive text-nowrap h-42">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date Paid</th>
            <th>Paid By</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0" v-if="detail.attributes">
          <template v-for="(tithe, index) in detail.attributes.tithe" :key="index">
            <tr>
              <td>
                <i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>GHS {{ tithe.amount }}</strong>
              </td>
              <td>{{ new Date(tithe.updated_at).toDateString() }}</td>
              <td>{{ tithe.paidby }}</td>
              <!-- <td>sdfsdf</td>
            <td>
              <span class="badge bg-label-primary me-1">fdsfs</span>
            </td>
            <td>kjlkl</td> -->
              <td>
                <div class="dropdown">
                  <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" :href="'/member'"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                    <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const assemblies = reactive([]);
const detail = ref("");
const assembly_id = ref("");
const error_message = reactive({
  type: "",
  title: "",
  text: "",
});

const tithe = reactive({
  amount: "",
  paidby: "",
  assembly_id: assembly_id,
});
const loading = ref("");

onMounted(async () => {
  const { data, error, refresh, pending } = await useFetch(api_base + "/assembly", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });
  loading.value = pending.value;
  assemblies.value = data.value.data;
});

const getAssemblyDetails = async (e) => {
  assembly_id.value = e.target.value;

  let assembly = assemblies.value.filter((res) => {
    return res.id == assembly_id.value;
  });

  detail.value = assembly[0];
};

const submitTithe = async () => {
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

  loading.value = pending.value;

  if (error.value) {
    error_message.type = "error";
    error_message.text = "Tithe not paid successfully!. Try again";
    error_message.title = "Pay Tithe";
  } else {
    error_message.type = "success";
    error_message.text = "Tithe paid successfully!.";
    error_message.title = "Pay Tithe";

    tithe.amount = "";
    tithe.paidby = "";
  }
};
</script>

<style></style>
