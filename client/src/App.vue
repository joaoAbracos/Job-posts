<template>
  <div class="flex flex-col h-screen bg-gray-800">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view v-slot="{ Component }" >
        <component :is="Component"  />
      </router-view>
    </transition>
    <Footer />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

</script>
