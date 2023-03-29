<template>
  <div></div>
</template>

<script setup>
import { toast } from "vue3-toastify";
const props = defineProps({
  alert: reactive({}),
});

watch(props.alert, (newType, oldType) => {
  if (newType.value.type !== "") {
    if (newType.value.type == "success") {
      toast.success(`${newType.value.title}  \n${newType.value.info}`);
    }
    if (newType.value.type == "error") {
      toast.error(`${newType.value.title}  \n${newType.value.info}`);
    }
    if (newType.value.type == "info") {
      toast.info(`${newType.value.title}  \n${newType.value.info}`);
    }
    if (newType.value.type == "warning") {
      toast.warning(`${newType.value.title}  \n${newType.value.info}`);
    }
  }
});
</script>
