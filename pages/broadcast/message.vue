<template>
  <div>
    <div class="tw-p-2 tw-border-b tw-border-blue-300 tw-mb-2 tw-ml-20">message</div>

    <div v-if="toaster">
      <Toaster :alert="toaster" />
    </div>

    <div class="card-body md:tw-w-1/2 tw-mx-auto tw-shadow-sm tw-mb-4 tw-p-2">
      <v-textarea clearable counter label="Generic Birthday Message" auto-grow model-value="" v-model="message"></v-textarea>

      <v-btn class="tw-w-full" @click="saveMessage">Save Message!</v-btn>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from "@vueuse/core";
const toaster = reactive({});
const message = ref("");
const state = useStorage("bdayMessage", message.value);

onMounted(() => {
  message.value = state.value;
});

const saveMessage = () => {
  if (message.value != "") {
    state.value = message.value;
    toaster.value = {
      type: "success",
      title: "Happy Birthday Message",
      info: "Happy birthday message has been saved successfully!",
    };
    return;
  }
  toaster.value = {
    type: "error",
    title: "Happy Birthday Message",
    info: "Happy birthday message failed to save successfully!",
  };
};
</script>
