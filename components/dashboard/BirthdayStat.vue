<template>
  <div>
    <div class="col-md-12 order-2 mb-4">
      <div class="card h-100">
        <div class="card-header d-flex align-items-center justify-content-between">
          <h5 class="card-title m-0 me-2">Birthdays Pending</h5>
        </div>
        <div class="card-body">
          <ul class="p-0 m-0">
            <li class="d-flex mb-4 pb-1" v-for="(member, index) in birthday" :key="index">
              <div class="avatar flex-shrink-0 me-3" v-if="member.gender == 'female'">
                <img src="~/assets/assets/img/avatars/6.png" alt="User" class="rounded" />
              </div>
              <div class="avatar flex-shrink-0 me-3" v-else>
                <img src="~/assets/assets/img/avatars/7.png" alt="User" class="rounded" />
              </div>
              <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                  <small class="text-muted d-block mb-1">{{ member.name }}</small>
                  <h6 class="mb-0">{{ member.assembly }}</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                  <h6 class="mb-0">{{ new Date(member.dob).toDateString() }}</h6>
                  <!-- <span class="text-muted">USD</span> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const members = ref([]);
const birthday = ref([]);

onMounted(async () => {
  let getData = await useGetData("member-birthdays");

  members.value = getData.data.data;
  birthday.value = [];
  members.value.map((res) => {
    birthday.value.push({
      name: res.attributes.name,
      assembly: res.attributes.assembly.name,
      dob: res.attributes.dob,
      gender: res.attributes.gender,
    });
  });
});
</script>

<style></style>
