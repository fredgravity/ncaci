<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const loginStore = useLoginStore();
const api_base = useRuntimeConfig().public.apiBase;
const user = await loginStore.getUser;
const router = useRouter();
const route = useRoute();
const accessToken = await loginStore.getAccessToken;
onMounted(async () => {
  const { data, error, refresh } = await useFetch(api_base + "/user", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + accessToken.accessToken,
    },
    initialCache: false,
  });

  loginStore.setUser(data.value);
});

onMounted(async () => {
  if (route.fullPath == "/") {
    if (user) {
      router.push({ path: "/dashboard" });
    }
  } else {
    if (!user) {
      router.push({ path: "/" });
    } else {
      if (user.role == "user") {
        if (route.fullPath == "/user" || route.fullPath == "/register") {
          console.log(user);
          router.push({ path: "/dashboard" });
        }
      }
    }
  }
});
</script>

<script>
export default {
  head() {
    return {
      title: "Church Management System", // Other meta information
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "Church",
          name: "Church Finance",
          content: "Church Finance",
        },
      ],
      link: [{ rel: "icon", href: "/ncaciLogo.jpg" }],
      // link: [{ rel: "icon", href: "/favicon.ico" }],
      script: [
        // { hid: "qq", src: "./assets/assets/vendor/libs/jquery/jquery.js", defer: true, body: true },
        // // { hid: "menu", src: "./assets/assets/vendor/js/menu.js", defer: true, body: true },
        // { hid: "helpers", src: "./assets/assets/vendor/js/helpers.js", defer: true, body: true },
        // // { hid: "main", src: "./assets/assets/js/main.js", defer: true, body: true },
        // { hid: "all", src: "./assets/assets/output/all.js", defer: false, body: false },
        // { hid: "config", src: "./assets/assets/js/config.js", defer: true, body: true },
        // { hid: "bootstrap", src: "./assets/assets/vendor/js/bootstrap.js", defer: true, body: true },
        // { hid: "scroll", src: "./assets/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js", defer: true, body: true },
        // { hid: "popper", src: "./assets/assets/vendor/libs/popper/popper.js", defer: true, body: true },
        // { hid: "dashboard", src: "./assets/assets/js/dashboards-analytics.js", defer: true, body: true },
      ],
    };
  },
};
</script>
