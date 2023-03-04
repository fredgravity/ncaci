<template>
  <div v-if="props.alert.type" class="tw-mx-4">
    <v-alert closable variant="outlined" density="compact" :type="props.alert.type" :title="props.alert.title" :text="props.alert.text"></v-alert>
  </div>
</template>

<script setup>
const props = defineProps({
  alert: ref({}),
});

setTimeout(() => {
  props.alert.type = "";
}, 5000);
</script>
