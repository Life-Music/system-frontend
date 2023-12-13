<template>
  <div v-if="userInfo">
    <Listbox v-model="selectedPlaylist">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-lg bg-[#111823] py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span class="block truncate">{{ selectedPlaylist?.title ?? "Chọn danh sách phát" }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <VueFontAwesome v-if="isLoading" icon="fa-regular fa-spinner-third"
              class="h-4 animate-spin mr-2 fill-gray-400" />
            <VueFontAwesome v-else icon="fa-solid fa-chevron-down" class="h-4 fill-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#111823] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="playlist in playlistStore.playlists" :key="playlist.id"
              :value="playlist" as="template">
              <li :class="[active ? 'bg-[#1a222d]' : 'text-beige',
                'relative select-none py-2 pl-10 pr-4 cursor-pointer',
              ]">
                <span :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]">{{ playlist.title }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 fill-amber-600">
                  <VueFontAwesome icon="fa-regular fa-check" class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
  <div v-else>
    Vui lòng <RouterLink :to="{
      name: routerNames['AUTH.LOGIN']
    }">
      đăng nhập
    </RouterLink>
    để tiếp tục
  </div>
</template>
<script setup lang="ts">
import routerNames from '@/router/routerNames';
import { useUserInfoStore } from '@/stores/user';
import { usePlaylistStore } from '@/stores/playlist';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ref, defineModel } from 'vue';
import type { Playlist } from '~/prisma/generated/mysql';

const userStore = useUserInfoStore()
const playlistStore = usePlaylistStore()
const isLoading = ref(false)

const userInfo = userStore.userInfo
const selectedPlaylist = defineModel<Playlist>('selected')

const fetchPlaylist = async () => {
  isLoading.value = true
  await playlistStore.init()
  isLoading.value = false
}

fetchPlaylist()

</script>