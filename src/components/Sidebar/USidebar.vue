<template>
  <div class="h-screen overflow-auto border-r border-slate-800">
    <div class="flex gap-x-4 py-6 px-8">
      <div class="logo w-12 h-7 bg-contain bg-center bg-no-repeat"></div>
      <div class="text-lg">Lifemusic</div>
    </div>
    <div class="py-6 fill-beige text-beige border-t border-inherit px-8" v-for="(menu, i) in menus" :key="i">
      <div class="uppercase text-xs text-slate-600 mb-2 -ml-2 -mt-2 font-sans" v-if="menu.title">
        {{ $t(menu.title) }}
      </div>
      <div class="space-y-4">
        <div
          class="gap-x-4 flex items-center cursor-pointer transition-colors hover:text-orange-400 hover:fill-orange-400"
          v-for="(item, j) in menu.children" :class="{
            'text-orange-400 fill-orange-400':
              currentRoute.name === item.routerName,
          }" :key="j" @click="item.onClick()">
          <VueFontAwesome v-if="item.icon" :icon="item.icon" class="w-4 fill-inherit" />
          <span>{{ $t(item.text) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref, watch } from "vue";
import Logo from "@/assets/images/logo.png";
import { useRoute, useRouter } from "vue-router";
import routerNames from "@/router/routerNames";
import { useUserInfoStore } from "@/stores/user";
import { usePlaylistStore } from "@/stores/playlist";
const cssLogo = `url('${Logo}')`;

const router = useRouter();
const route = useRoute();
const userStore = useUserInfoStore();
const playlistStore = usePlaylistStore();
const currentRoute = route.matched[0];

const menus: Ref<
  Array<{
    title?: string;
    children: {
      text: string;
      icon?: string;
      onClick: () => void;
      routerName: string;
    }[];
  }>
> = ref([
  {
    title: "",
    children: [
      {
        icon: "fa-regular fa-compass",
        text: "sidebar.explore",
        routerName: routerNames.HOME,
        onClick() {
          router.push({
            name: this.routerName,
          });
        },
      },
      // {
      //   icon: "fa-regular fa-radio",
      //   text: "sidebar.radio",
      //   routerName: routerNames.RADIO,
      //   onClick() {
      //     router.push({
      //       name: this.routerName,
      //     });
      //   },
      // },
      {
        icon: "fa-regular fa-microphone-stand",
        text: "sidebar.artist",
        routerName: routerNames.ARTIST,
        onClick() {
          router.push({
            name: this.routerName,
          });
        },
      },
      {
        icon: "fa-regular fa-fire",
        text: "sidebar.trending",
        routerName: routerNames.TRENDING,
        onClick() {
          router.push({
            name: this.routerName,
          });
        },
      },
    ],
  },
  {
    title: "sidebar.your_library",
    children: [
      {
        text: "sidebar.recent_play",
        routerName: routerNames.RECENT_PLAY,
        onClick() {
          router.push({
            name: this.routerName,
          });
        },
      },
      {
        text: "sidebar.liked",
        routerName: routerNames.LIKED,
        onClick() {
          router.push({
            name: this.routerName,
          });
        },
      },
    ],
  },
  {
    title: "sidebar.playlist",
    children: [
      {
        routerName: "",
        text: "sidebar.no_playlist",
        onClick() { },
      },
    ],
  },
]);

userStore.init()
  .then((res) => {
    if (res) {
      updateMenuPlaylist()
    }
  })

const updateMenuPlaylist = async () => {
  const res = await playlistStore.init()
  const playlistMenu = menus.value.find((menu) => {
    return menu.title === "sidebar.playlist";
  });
  if (!playlistMenu) return;
  playlistMenu.children = res.map((item) => {
    return {
      routerName: routerNames.PLAYLIST_DETAIL,
      text: item.title,
      onClick() {
        router.push({
          name: this.routerName,
          params: {
            playlistId: item.id,
          }
        });
      }
    }
  })
}

watch(() => playlistStore.playlists, updateMenuPlaylist)

</script>

<style scoped>
.logo {
  background-image: v-bind(cssLogo);
}
</style>
