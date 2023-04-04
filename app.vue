<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useFavicon } from "@vueuse/core";
const icon = useFavicon("./public/ncaciLogo.jpg", {
  baseUrl: "/",
  rel: "icon",
});
// icon.value = "./public/ncaciLogo.jpg";
console.log(icon.value);
</script>
