<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton>
        <VueFontAwesome icon="fa-light fa-ellipsis-vertical" class="h-4 fill-beige" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#262b34] shadow-lg ring-1 ring-black/5 focus:outline-none">
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
          <button :class="[
            active ? 'bg-violet-500 text-white' : 'text-beige',
            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
          ]" @click="emits('add-to-playlist')">
            <VueFontAwesome icon="fa-light fa-list-music" class="h-4 fill-beige mr-2" />
            Thêm vào playlist
          </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const emits = defineEmits(['add-to-playlist',])

</script>