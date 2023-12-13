<template>
  <div ref="header" class="py-6 px-10 flex items-center text-beige fill-beige gap-x-8 fixed top-0 z-10 left-48 right-5">
    <div class="flex items-center gap-x-3">
      <VueFontAwesome icon="fa-regular fa-chevron-left" class="h-5" />
      <VueFontAwesome icon="fa-regular fa-chevron-right" class="h-5" />
    </div>
    <label class="border rounded-xl flex gap-x-3 items-center px-3 py-2 border-beige mr-auto" for="search_input">
      <VueFontAwesome icon="fa-regular fa-magnifying-glass" class="h-4" />
      <input autocomplete="off" type="text" v-model="q" id="search_input" class="w-56 bg-transparent outline-none text-sm"
        :placeholder="$t('search_placeholder')" @keydown="handleSearch" />
    </label>
    <div>
      <LazyPulse :handler="userInfoStore" class-loader="w-24 h-10">
        <template v-if="userInfo">
          <Menu class="relative" as="div">
            <MenuButton>
              <div class="flex gap-x-3 items-center cursor-pointer">
                <Avatar :user-info="userInfo" size="sm" />
                <div class="font-sans font-semibold text-beige">
                  {{ userInfo.username }}
                </div>
              </div>
            </MenuButton>
            <MenuItems class="absolute right-0 mt-2 bg-slate-800 p-1 rounded-lg w-max origin-top-right">
              <MenuItem v-slot="{ active }">
              <div class="flex items-center gap-x-3 cursor-pointer px-4 rounded-lg py-2"
                :class="[active ? 'bg-slate-900 text-white' : '']" @click="gotoStudio()">
                <VueFontAwesome icon="fa-regular fa-folder-music" class="h-4" />
                <div>Quản lý kênh</div>
              </div>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <div class="flex items-center gap-x-3 cursor-pointer px-4 rounded-lg py-2"
                :class="[active ? 'bg-slate-900 text-white' : '']" @click="logout()">
                <VueFontAwesome icon="fa-regular fa-right-from-bracket" class="h-4" />
                <div>Đăng xuất</div>
              </div>
              </MenuItem>
            </MenuItems>
          </Menu>
        </template>
        <template v-else>
          <button class="btn-base bg-main-gradient text-slate-900 font-sans font-semibold"
            @click="() => router.push({ name: routerNames['AUTH.LOGIN'] })">
            {{ $t("sign_in") }}
          </button>
        </template>
      </LazyPulse>
    </div>
  </div>
</template>
<script setup lang="ts">
import routerNames from "@/router/routerNames";
import { useRouter } from "vue-router";
import LazyPulse from "@/components/Lazy/Pulse.vue";
import ArtistAvatar from "@/components/Artist/Avatar.vue";
import { useUserInfoStore } from "@/stores/user";
import { onMounted, onUnmounted, ref } from "vue";
import { User } from "~/prisma/generated/mysql";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import Avatar from "../User/Avatar/Avatar.vue";
const router = useRouter();
const userStore = useUserInfoStore();
const userInfoStore = userStore.handler;
const userInfo = ref<User | null | false>(null);
userInfoStore?.then((res) => {
  userInfo.value = res;
});

const header = ref()
const q = ref("");

const logout = () => {
  localStorage.removeItem("access_token");
  window.location.reload();
};

const gotoStudio = () => {
  const url = new URL(import.meta.env.VITE_STUDIO_ENDPOINT_AUTH);
  url.searchParams.append("token", localStorage.getItem("access_token") ?? "");
  window.open(url, "_blank");
};

const handlerContainerScroll = function (e: Event) {
  const top = (e.currentTarget as HTMLDivElement).scrollTop;

  if (top > 0) {
    header.value.classList.add("bg-main");
  } else {
    header.value.classList.remove("bg-main");
  }
}

const handleSearch = (e: KeyboardEvent) => {
  const key = e.keyCode || e.which;
  if (key === 13 && q.value) {
    router.push({
      name: routerNames.SEARCH,
      query: {
        q: q.value,
      }
    })
  }
}

onMounted(() => {
  document.getElementById("container")?.addEventListener("scroll", handlerContainerScroll);
})

onUnmounted(() => {
  document.getElementById("container")?.removeEventListener("scroll", handlerContainerScroll);
})
</script>
