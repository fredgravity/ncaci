<template>
  <v-app :theme="theme">
    <LayoutTopBar />
    <LayoutSideBar />
    <v-main>
      <main class="tw-container tw-mx-auto tw-pb-32 md:tw-pb-5">
        <slot> </slot>
      </main>
    </v-main>
  </v-app>
</template>

<script setup>
const drawStore = useMenuStore();
const theme = computed(() => drawStore.theme);
</script>
