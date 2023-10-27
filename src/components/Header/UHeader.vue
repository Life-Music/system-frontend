<template>
  <div
    class="py-6 px-10 flex items-center text-beige fill-beige gap-x-8 sticky top-0 z-10 bg-main"
  >
    <div class="flex items-center gap-x-3">
      <VueFontAwesome icon="fa-regular fa-chevron-left" class="h-5" />
      <VueFontAwesome icon="fa-regular fa-chevron-right" class="h-5" />
    </div>
    <label
      class="border rounded-xl flex gap-x-3 items-center px-3 py-2 border-beige mr-auto"
      for="search_input"
    >
      <VueFontAwesome icon="fa-regular fa-magnifying-glass" class="h-4" />
      <input
        type="text"
        id="search_input"
        class="w-48 bg-transparent outline-none text-sm"
        :placeholder="$t('search')"
      />
    </label>
    <div>
      <button
        class="btn-base bg-main-gradient text-slate-900 font-sans font-semibold"
        @click="() => router.push({ name: routerNames['AUTH.LOGIN'] })"
      >
        {{ $t("sign_in") }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import routerNames from "@/router/routerNames";
import { useRouter } from "vue-router";
const router = useRouter();
</script>
