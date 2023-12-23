<template>
  <footer class="shadow bg-gray-800">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a href="/" class="flex items-center mb-4 sm:mb-0">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap text-white"
            >BotaBota</span
          >
        </a>
        <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 gap-4"
        >
          <li>
            <router-link
                  :to="{ name: 'home' }"
                  class="text-gray-300  hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Jobs</router-link
                >
          </li>
          <li>
            <router-link
                  :to="{ name: 'home' }"
                  class="text-gray-300  hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Blog</router-link
                >
          </li>
          <li>
            <router-link
                  :to="{ name: 'home' }"
                  class="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >Contact</router-link
                >
          </li>
        </ul>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <span
        class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023
        <a href="https://flowbite.com/" class="hover:underline">Botabota™</a>.
        All Rights Reserved.</span
      >
    </div>
  </footer>
</template>