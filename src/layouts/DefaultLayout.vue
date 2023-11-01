<template>
  <div class="bg-main">
    <div class="w-screen h-screen flex overflow-auto">
      <div class="sticky top-0 h-full z-10">
        <USidebar />
      </div>
      <div class="flex-auto overflow-auto">
        <UHeader />
        <div class="py-10">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import USidebar from "@/components/Sidebar/USidebar.vue";
import UHeader from "@/components/Header/UHeader.vue";
import requestInstance from "@/utils/axios";

const userInfo = requestInstance.get("/me");
</script>
