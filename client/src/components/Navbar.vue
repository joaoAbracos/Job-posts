<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center">
          <div class="relative inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              @click="visible = !visible"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                class="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <div class="flex space-x-4">
              <router-link
                :to="{ name: 'home' }"
                class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2"
                aria-current="page"
                >Jobs</router-link
              >
            </div>
          </div>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch">
          <div v-if="store.isLoggedIn" class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->

              <div
                v-if="store.role === 'person'"
                class="hidden sm:ml-6 sm:block py-2"
              >
                <router-link
                  :to="{ name: 'pagePerson' }"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Profile</router-link
                >
              </div>
              <div
                v-if="store.role === 'company'"
                class="hidden sm:ml-6 sm:block py-2"
              >
                <router-link
                  :to="{ name: 'myPosts' }"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >My Posts</router-link
                >
                <router-link
                  :to="{ name: 'pageCompany' }"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Profile</router-link
                >
                <router-link
                  :to="{ name: 'post' }"
                  class=" bg-amber-400 text-black-300 hover:bg-amber-100 hover:text-black rounded-md px-6 py-2 text-sm font-medium"
                  >Post a Job</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <template v-if="!store.isLoggedIn">
              <router-link
                :to="{ name: 'post' }"
                class="text-white bg-amber-400 text-black-300 hover:bg-amber-100 hover:text-black rounded-md px-6 py-2 text-sm font-medium"
                >Post a Job</router-link
              >
              <router-link
                :to="{ name: 'login' }"
                class="text-white rounded-md px-3 py-2 text-sm font-medium"
                aria-current="page"
                >Login</router-link
              >
              <router-link
                :to="{ name: 'register' }"
                class="hidden sm:block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >Register</router-link
              >
            </template>
            <template v-else>
              <div class="relative ml-3">
                <div>
                  <div
                    class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <!-- <span class="absolute -inset-1.5" /> -->
                    <button
                      @click.prevent="logoutVisible = !logoutVisible"
                      aria-controls="navbar-dropdown"
                      class="text-white"
                    >
                      {{ store.user.name  }}
                    </button>
                  </div>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <div
                    v-if="logoutVisible"
                    class="absolute right-0 z-10 mt-2 w-38 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div>
                      <a
                        @click.prevent="logout"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ]"
                        >Logout</a
                      >
                    </div>
                  </div>
                </transition>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <!-- <div v-if="visible" class="space-y-1 px-2 pb-3 pt-2"> -->
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->

        <template v-if="visible && !store.isLoggedIn">
          <router-link
            :to="{ name: 'register' }"
            class="sm:hidden text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >Register</router-link
          >
        </template>
        <template v-if="visible &&  store.role === 'company' && store.isLoggedIn">
         <div class="space-y-1 px-2 pb-3 pt-2">
          <router-link
            :to="{ name: 'myPosts' }"
            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >My Posts</router-link
          >
        </div>
        <div class="space-y-1 px-2 pb-3 pt-2">
          <router-link
            :to="{ name: 'pageCompany' }"
            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >Profile</router-link
          >
        </div>
        </template>
      

      </div>
    <!-- </div> -->
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const store = useAuthStore();

const router = useRouter();
const visible = ref(false);
const logoutVisible = ref(false);
const logout = async () => {
  await store.handleLogout();
  visible.value = false;
  router.push({ name: "login" });
};
</script>
