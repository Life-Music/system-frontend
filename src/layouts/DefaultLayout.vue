<template>
  <div class="bg-main">
    <div class="w-screen h-screen flex overflow-auto">
      <div class="sticky top-0 h-full z-10">
        <USidebar />
      </div>
      <div class="flex-auto overflow-auto" id="container">
        <UHeader />
        <slot />
        <div class="fixed bottom-0 left-0 right-0 z-40">
          <Player class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import USidebar from "@/components/Sidebar/USidebar.vue";
import UHeader from "@/components/Header/UHeader.vue";
import { useUserInfoStore } from "@/stores/user";
import Player from "@/components/AudioPlayer/Player.vue";
import { triggerPushNotification } from "@/utils/notification";

const userStore = useUserInfoStore();
userStore.init()
  .then((res) => {
    if (res)
      triggerPushNotification()
  })

</script>
