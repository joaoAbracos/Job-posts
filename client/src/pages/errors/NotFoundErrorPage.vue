<template>
  <div class="max-auto bg-blue-600">
    <h1 class="text-3xl">404</h1>
    <p>Sorry, the page <code>{{ $route.params.notFound }}</code> does not exist</p>
    <router-link :to="{ name: 'tasks' }">Click to Tasks</router-link>
  </div>
</template>