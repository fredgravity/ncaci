<template>
  <div>
    <div class="md:tw-flex tw-no-wrap tw-mt-10 md:tw-mx-2">
      <!-- Left Side -->
      <div class="tw-w-full md:tw-w-3/12 md:tw-mx-2">
        <!-- Profile Card -->
        <div class="tw-bg-white tw-p-3 tw-border-t-4 tw-border-green-400">
          <div class="tw-overflow-hidden">
            <img class="tw-h-auto tw-w-full tw-mx-auto" src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg" alt="" />
          </div>
          <h1 class="tw-text-gray-900 tw-font-bold tw-text-xl tw-leading-8 tw-my-1">{{ user.name }}</h1>
          <ul class="tw-bg-gray-100 tw-text-gray-600 hover:tw-text-gray-700 hover:tw-shadow tw-py-2 tw-px-3 tw-mt-3 tw-divide-y tw-rounded tw-shadow-sm">
            <li class="tw-flex tw-items-center tw-py-3">
              <span>Status</span>
              <span class="tw-ml-auto"><span class="tw-bg-green-500 tw-py-1 tw-px-2 tw-rounded tw-text-white tw-text-sm">Active</span></span>
            </li>
            <li class="tw-flex tw-items-center tw-py-3">
              <span>Member since</span>
              <span class="tw-ml-auto">{{ new Date(user.created_at).toDateString() }}</span>
            </li>
          </ul>
        </div>
        <!-- End of profile card -->
        <div class="tw-my-4"></div>
      </div>
      <!-- Right Side -->
      <div class="tw-w-full md:tw-w-9/12 tw-mx-2 tw-h-64">
        <!-- Profile tab -->
        <!-- About Section -->
        <div class="tw-bg-white tw-p-3 tw-shadow-sm tw-rounded-sm">
          <div class="tw-flex tw-items-center tw-space-x-2 tw-font-semibold tw-text-gray-900 tw-leading-8">
            <span clas="tw-text-green-500">
              <svg class="tw-h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span class="tw-tracking-wide">About</span>
          </div>
          <div class="text-gray-700">
            <div class="tw-grid md:tw-grid-cols-2 tw-text-sm">
              <div class="tw-grid tw-grid-cols-2">
                <div class="tw-px-4 tw-py-2 tw-font-semibold">Name</div>
                <div class="tw-px-4 tw-py-2">{{ user.name }}</div>
              </div>
              <div class="tw-grid tw-grid-cols-2">
                <div class="tw-px-4 tw-py-2 tw-font-semibold"></div>
                <div class="tw-px-4 tw-py-2"></div>
              </div>
              <div class="tw-grid tw-grid-cols-2">
                <div class="tw-px-4 tw-py-2 tw-font-semibold">Role</div>
                <div class="tw-px-4 tw-py-2">{{ user.role }}</div>
              </div>

              <div class="tw-grid tw-grid-cols-2">
                <div class="tw-px-4 tw-py-2 tw-font-semibold"></div>
                <div class="tw-px-4 tw-py-2">
                  <a class="text-blue-800"></a>
                </div>
              </div>
              <div class="tw-grid tw-grid-cols-2">
                <div class="tw-px-4 tw-py-2 tw-font-semibold">Email</div>
                <div class="tw-px-4 tw-py-2">
                  <a class="text-blue-800">{{ user.email }}</a>
                </div>
              </div>
              <!-- <div class="tw-grid tw-grid-cols-2">
                <div class="tw-px-4 tw-py-2 tw-font-semibold">Birthday</div>
                <div class="tw-px-4 tw-py-2">Feb 06, 1998</div>
              </div> -->
            </div>
          </div>
          <!-- <button class="tw-block tw-w-full tw-text-blue-800 tw-text-sm tw-font-semibold tw-rounded-lg hover:tw-bg-gray-100 focus:tw-outline-none focus:tw-shadow-outline focus:tw-bg-gray-100 hover:tw-shadow-xs tw-p-3 tw-my-4">Show Full Information</button> -->
        </div>
        <!-- End of about section -->

        <div class="tw-my-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const loginStore = useLoginStore();
const user = await loginStore.getUser;
console.log(user);
</script>

<style></style>
