<template>
  <div class="h-full overflow-auto border-r border-slate-800">
    <div class="flex gap-x-4 py-6 px-8">
      <div class="logo w-12 h-7 bg-contain bg-center bg-no-repeat"></div>
      <div class="text-lg">Lifemusic</div>
    </div>
    <div
      class="py-6 fill-beige text-beige border-t border-inherit px-8"
      v-for="(menu, i) in menus"
    >
      <div
        class="uppercase text-xs text-slate-600 mb-1 -ml-2 -mt-2 font-sans"
        v-if="menu.title"
      >
        {{ $t(menu.title) }}
      </div>
      <div class="space-y-6">
        <div
          class="gap-x-4 flex items-center"
          v-for="(item, j) in menu.children"
        >
          <VueFontAwesome
            v-if="item.icon"
            :icon="item.icon"
            class="w-4 fill-inherit"
          />
          <span>{{ $t(item.text) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Logo from "@/assets/images/logo.png";
const cssLogo = `url('${Logo}')`;

const menus = ref([
  {
    title: "",
    children: [
      {
        icon: "fa-regular fa-compass",
        text: "sidebar.explore",
      },
      {
        icon: "fa-regular fa-radio",
        text: "sidebar.radio",
      },
      {
        icon: "fa-regular fa-microphone-stand",
        text: "sidebar.artist",
      },
      {
        icon: "fa-regular fa-fire",
        text: "sidebar.trending",
      },
    ],
  },
  {
    title: "sidebar.your_library",
    children: [
      {
        text: "sidebar.recent_play",
      },
    ],
  },
  {
    title: "sidebar.playlist",
    children: [
      {
        text: "sidebar.no_playlist",
      },
    ],
  },
]);
</script>

<style scoped>
.logo {
  background-image: v-bind(cssLogo);
}
</style>
