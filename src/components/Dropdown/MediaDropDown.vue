<template>
  <Menu as="div" class="relative inline-block text-left z-10">
    <div>
      <MenuButton @click="emits('click', $event)">
        <div class="p-2">
          <VueFontAwesome icon="fa-light fa-ellipsis-vertical" class="h-4 fill-beige" />
        </div>
      </MenuButton>
    </div>

    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <MenuItems
        class="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#262b34] shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
          <button :class="[
            active ? 'bg-violet-500 text-white' : 'text-beige',
            'group rounded-md px-2 py-2 text-sm w-full',
          ]">
            <slot name="playlist" :handlePlayList="handlePlayList">
              <div class="flex w-full items-center" @click.stop="handlePlayList">
                <VueFontAwesome icon="fa-light fa-list-music" class="h-4 fill-beige mr-2" />
                Thêm vào playlist
              </div>
            </slot>
          </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <ModalAddToPlaylist v-model:open="isOpenModalPlaylist" :media-id="props.media.id" />
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ref } from "vue";
import ModalAddToPlaylist from "../Modal/ModalAddToPlaylist.vue";
import { Prisma } from "~/prisma/generated/mysql";
const props = defineProps<{
  media: Prisma.PlaylistGetPayload<{
  }>,
}>()

const emits = defineEmits(['click'])

const isOpenModalPlaylist = ref(false);

const handlePlayList = () => {
  isOpenModalPlaylist.value = true
}
</script>