<template>
  <div class="flex gap-x-2 w-full">
    <div>
      <Avatar :user-info="props.comment.user"></Avatar>
    </div>
    <div class="flex-auto text-beige">
      <div class="py-2 px-4 rounded-lg space-y-1 bg-[#26272a]">
        <div class="flex gap-x-2 items-center">
          <a href="#">
            {{ getFullName(props.comment.user) }}
          </a>
          <div class="w-1 h-1 rounded-full bg-beige"></div>
          <div class="text-xs">
            {{ calculateDurationBetweenTwoDays(new Date(), props.comment.createdAt) }}
          </div>
          <div class="ml-auto" v-if="props.comment.userId === (userStore.userInfo || {}).id">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton>
                  <VueFontAwesome icon="fa-light fa-ellipsis-vertical" class="h-4 fill-beige" />
                </MenuButton>
              </div>

              <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                  class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#262b34] shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                      active ? 'bg-violet-500 text-white' : 'text-beige',
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]" @click="emits('delete', props.comment.id)">
                      <VueFontAwesome icon="fa-light fa-trash" class="h-4 fill-beige mr-2" />
                      Delete
                    </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <p>
          {{ props.comment.comment }}
        </p>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserInfoStore } from '@/stores/user';
import Avatar from '../User/Avatar/Avatar.vue';
import { Prisma } from '~/prisma/generated/mysql';
import { calculateDurationBetweenTwoDays, getFullName } from '@/utils/common';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

type ItemType = Prisma.CommentGetPayload<{
  include: {
    user: true,
  },
}>

const emits = defineEmits(['delete'])

const props = defineProps<{
  comment: ItemType,
}>()
const userStore = useUserInfoStore()
</script>