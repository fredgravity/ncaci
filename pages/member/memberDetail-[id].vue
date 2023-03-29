<template>
  <div>
    <div>
      <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">member details</div>
    </div>
    <Loading :loading="loading" />

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-between">
      <div class="d-flex align-items-start align-items-sm-center tw-gap-4">
        <div>
          <img src="~/assets/assets/img/avatars/1.png" alt="user-avatar" class="d-block tw-h-24 tw-w-32 tw-rounded" height="150" width="100" id="uploadedAvatar" />
        </div>
        <div class="button-wrapper" v-if="member.attributes">
          <p class="text-muted tw-mb-0">Name: {{ member.attributes.name }}</p>
          <p class="text-muted tw-mb-0">Gender: {{ member.attributes.gender }}</p>
          <p class="text-muted tw-mb-0">DOB: {{ member.attributes.dob }}</p>
          <p class="text-muted tw-mb-0">Marital Status: {{ member.attributes.marital_status }}</p>
        </div>
      </div>
      <div>
        <div class="button-wrapper" v-if="member.attributes">
          <p class="text-muted tw-mb-0 tw-text-sm">Address: {{ member.attributes.address }}</p>
          <p class="text-muted tw-mb-0">Email: {{ member.attributes.email }}</p>
          <p class="text-muted tw-mb-0">Phone: {{ member.attributes.phone }}</p>
          <p class="text-muted tw-mb-0">Home Town: {{ member.attributes.home_town }}</p>
        </div>
      </div>
      <div>
        <div class="button-wrapper" v-if="member.attributes">
          <p class="text-muted tw-mb-0">Assembly: {{ member.attributes.assembly.name }}</p>
          <p class="text-muted tw-mb-0">Ministry: {{ member.attributes.ministry.name }}</p>
          <p class="text-muted tw-mb-0">Pastor: {{ member.attributes.assembly.pastor }}</p>
          <p class="text-muted tw-mb-0">Church Status: {{ member.attributes.assembly.status }}</p>
        </div>
      </div>
    </div>
    <!-- <div class="tw-font-normal tw-ml-3 btn btn-sm tw-w-full tw-mb-2 btn-outline-primary tw-text-blue-500 tw-cursor-pointer" data-bs-toggle="modal" data-bs-target="#editSpouse">Edit</div> -->
    <template v-if="member_modal.length != 0">
      <ModalsEditMember2 :member="member_modal" :assemblies="assemblies" :ministries="ministries" :member_id="spouse.member_id" />
    </template>
    <NuxtLink :to="'/member/member-' + member.id" class="tw-font-normal tw-ml-4 btn btn-sm tw-w-full md:tw-w-1/3 tw-mb-2 btn-outline-primary tw-text-blue-500 tw-cursor-pointer">Add More Info</NuxtLink>
    <hr class="tw-my-0" />
    <div class="tw-ml-4 tw-mt-3 tw-font-bold">Spouse History</div>
    <div class="tw-flex tw-flex-wrap tw-mx-3" v-if="member.attributes">
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">name</p>
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">phone</p>
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">dob</p>
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">status</p>
      <template v-for="(spouse, index) in member.attributes.spouses" :key="index">
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ spouse.name }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ spouse.phone }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ spouse.dob }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ spouse.status }}</p>
      </template>
    </div>
    <hr class="tw-my-0" />
    <div class="tw-ml-4 tw-mt-3 tw-font-bold">Children History</div>
    <div class="tw-flex tw-flex-wrap tw-mx-3" v-if="member.attributes">
      <p class="tw-font-semibold tw-basis-1/3 tw-mb-1 tw-pl-1">name</p>
      <p class="tw-font-semibold tw-basis-1/3 tw-mb-1 tw-pl-1">gender</p>
      <p class="tw-font-semibold tw-basis-1/3 tw-mb-1 tw-pl-1">dob</p>
      <template v-for="(child, index) in member.attributes.children" :key="index">
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/3 tw-mb-1 tw-pb-2 tw-pl-1">{{ child.name }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/3 tw-mb-1 tw-pb-2 tw-pl-1">{{ child.gender }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/3 tw-mb-1 tw-pb-2 tw-pl-1">{{ child.dob }}</p>
      </template>
    </div>
    <hr class="tw-my-0" />
    <div class="tw-ml-4 tw-mt-3 tw-font-bold">Parent History</div>
    <div class="tw-flex tw-flex-wrap tw-mx-3" v-if="member.attributes">
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">name</p>
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">gender</p>
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">dob</p>
      <p class="tw-font-semibold tw-basis-1/4 tw-mb-1 tw-pl-1">relation</p>
      <template v-for="(parent, index) in member.attributes.parents" :key="index">
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ parent.name }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ parent.gender }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ parent.dob }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/4 tw-mb-1 tw-pb-2 tw-pl-1">{{ parent.relation }}</p>
      </template>
    </div>
    <hr class="tw-my-0" />
    <div class="tw-ml-4 tw-mt-3 tw-font-bold">Occupation History</div>
    <div class="tw-flex tw-flex-wrap tw-mx-3" v-if="member.attributes">
      <p class="tw-font-semibold tw-basis-1/5 tw-mb-1 tw-pl-1">company</p>
      <p class="tw-font-semibold tw-basis-1/5 tw-mb-1 tw-pl-1">location</p>
      <p class="tw-font-semibold tw-basis-1/5 tw-mb-1 tw-pl-1">occupation</p>
      <p class="tw-font-semibold tw-basis-1/5 tw-mb-1 tw-pl-1">sector</p>
      <p class="font-semibold basis-1/5 mb-1 pl-1">status</p>
      <template v-for="(job, index) in member.attributes.occupations" :key="index">
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/5 tw-mb-1 tw-pb-2 tw-pl-1">{{ job.name }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/5 tw-mb-1 tw-pb-2 tw-pl-1">{{ job.location }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/5 tw-mb-1 tw-pb-2 tw-pl-1">{{ job.occupation }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/5 tw-mb-1 tw-pb-2 tw-pl-1">{{ job.sector }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/5 tw-mb-1 tw-pb-2 tw-pl-1">{{ job.status }}</p>
      </template>
    </div>
    <hr class="tw-my-0" />
    <template v-if="member_modal.length != 0">
      <div class="tw-ml-4 tw-mt-3 tw-font-bold tw-flex tw-gap-5 tw-items-center">Tithe History (<ModalsPayTithe2 :member="member_modal" :member_id="member.id" />)</div>
    </template>
    <div class="tw-flex tw-flex-wrap tw-mx-3" v-if="member.attributes">
      <p class="tw-font-semibold tw-basis-1/3 tw-mb-1 tw-pl-1">paid on</p>
      <p class="tw-font-semibold tw-basis-1/3 tw-mb-1 tw-pl-1">amount</p>
      <p class="tw-font-semibold tw-basis-1/3 tw-mb-1 tw-pl-1">paid by</p>

      <template v-for="(tithe, index) in member.attributes.tithes" :key="index">
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/3 tw-mb-1 tw-pb-2 tw-pl-1">{{ new Date(tithe.updated_at).toDateString() }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/3 tw-mb-1 tw-pb-2 tw-pl-1">{{ tithe.amount }}</p>
        <p class="tw-text-gray-500 tw-text-xs tw-basis-1/3 tw-mb-1 tw-pb-2 tw-pl-1">{{ tithe.paidby }}</p>
      </template>
    </div>

    <hr class="mt-4" />
    <!-- Button trigger modal -->

    <template v-if="member_modal.length != 0 && assemblies.length != 0">
      <ModalsEditMember :member="member_modal" :assemblies="assemblies" :ministries="ministries" :member_id="spouse.member_id" />
    </template>
    <!-- <template v-if="member_modal.length != 0">
      <ModalsPayTithe :member="member_modal" :assemblies="assemblies" :ministries="ministries" :member_id="spouse.member_id" />
    </template> -->
  </div>
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const api_base = useRuntimeConfig().public.apiBase;
const loginStore = useLoginStore();
const accessToken = await loginStore.getAccessToken;
const route = useRoute();
const member = ref([]);
const member_modal = ref([]);
const toaster = reactive({});
const assemblies = ref([]);
const ministries = ref([]);
const loading = ref("");
const router = useRouter();

const spouse = reactive({
  name: "",
  status: "",
  phone: "",
  address: "",
  home_town: "",
  dob: "",
  member_id: route.params.id,
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/assembly", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  assemblies.value = data.value.data;
  //
});

onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/ministry", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  ministries.value = data.value.data;
});

onMounted(async () => {
  const member_id = route.params.id;

  const { data, error, refresh, pending } = await useFetch(api_base + "/member/" + member_id, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  loading.value = pending.value;

  if (error.value && error.value.statusCode == 404) {
    router.back();
  }
  member.value = data.value.data;
  member_modal.value = data.value.data;
});

let submitSpouse = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/member-spouse", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: spouse,
    initialCache: false,
  });

  if (error.value) {
    toaster.value = {
      type: "error",
      title: "Add Member Spouse",
      info: error.value.data.message,
    };
  }
  if (data.value.data) {
    // error_message.value = "Church member's spouse added successfully!";
    toaster.value = {
      type: "error",
      title: "Add Member Spouse",
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

let submitChild = async () => {
  const { data, error, refresh } = await useFetch(api_base + "/member-children", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    body: child,
    initialCache: false,
  });

  if (error.value) {
    toaster.value = {
      type: "error",
      title: "Add Member Child",
      info: error.value.data.message,
    };
  }
  if (data.value.data) {
    toaster.value = {
      type: "success",
      title: "Add Member Child",
      info: "Church member's child added successfully!",
    };

    spouse.name = "";
    spouse.gender = "";
    spouse.home_town = "";
    spouse.dob = "";
  }
};
</script>

<style></style>
