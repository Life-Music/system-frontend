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
            <div class="flex w-full items-center" @click.stop="handleEditPlaylist">
              <VueFontAwesome icon="fa-light fa-pencil" class="h-4 fill-beige mr-2" />
              Sửa playlist
            </div>
          </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
          <button :class="[
            active ? 'bg-violet-500 text-white' : 'text-beige',
            'group rounded-md px-2 py-2 text-sm w-full',
          ]">
            <div class="flex w-full items-center" @click.stop="handleDeletePlaylist">
              <VueFontAwesome icon="fa-light fa-trash" class="h-4 fill-beige mr-2" />
              Xóa playlist
            </div>
          </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
  <ModalEditPlaylist v-model:open="isOpenModalPlaylist" :playlist-id="props.playlist.id" :name="props.playlist.title"
    @onOk="handleEditPlaylistOk" />
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ref } from "vue";
import { Prisma } from "~/prisma/generated/mysql";
import ModalEditPlaylist from "../Modal/ModalEditPlaylist.vue";
import requestInstance from "@/utils/axios";
import { usePlaylistStore } from "@/stores/playlist";
import { useToast } from "vue-toastification";
const props = defineProps<{
  playlist: Prisma.PlaylistGetPayload<{
  }>,
}>()

const playlistStore = usePlaylistStore()
const toast = useToast()

const emits = defineEmits(['click', 'edit-title', 'delete'])

const isOpenModalPlaylist = ref(false);

const handleEditPlaylist = () => {
  isOpenModalPlaylist.value = true
}

const handleEditPlaylistOk = (name: string) => {
  emits('edit-title', name)
}

const handleDeletePlaylist = (e: Event) => {
  requestInstance.delete(`/playlist/${props.playlist.id}`)
    .then(() => {
      playlistStore.removePlaylist()
      playlistStore.init()

      toast.success('Xóa playlist thành công')
      emits('delete')
    })

  return e
}
</script>