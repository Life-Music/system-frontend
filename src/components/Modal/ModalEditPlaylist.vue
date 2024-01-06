<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="isOpen = false" class="relative z-40">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/70" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#070c14] p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-beige">
                Chỉnh sửa playlist
              </DialogTitle>
              <div class="mt-4">
                <label class="block text-sm font-medium text-beige">
                  Tên playlist
                </label>
                <div class="mt-2">
                  <input v-model="playListName"
                    class="border-slate-700 shadow appearance-none border rounded w-full py-2 px-3 text-beige leading-tight focus:outline-none focus:shadow-outline" />
                </div>
              </div>

              <div class="mt-4 flex justify-between">
                <button type="button" @click="isOpen = false" class="btn-cancel">
                  Huỷ
                </button>
                <button type="button" @click="createPlaylist" class="btn-save">
                  <VueFontAwesome v-if="isLoading" icon="fa-regular fa-spinner-third"
                    class="h-4 animate-spin mr-2 fill-inherit" />
                  Cập nhật
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup lang="ts">
import { defineModel, ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import requestInstance from '@/utils/axios';
import { useToast } from '@/utils/vue-toastification';
import { usePlaylistStore } from '@/stores/playlist';

const playlistStore = usePlaylistStore()
const isOpen = defineModel<boolean>('open', {
  default: false,
})

const emits = defineEmits(['onOk'])

const props = defineProps<{
  playlistId: string,
  name: string,
}>()

const playListName = ref(props.name);
const isLoading = ref(false)

const toast = useToast()

const createPlaylist = async () => {
  if (!playListName.value) return
  isLoading.value = true
  const res = await requestInstance.patch(`/playlist/${props.playlistId}`, {
    title: playListName.value
  })
    .finally(() => {
      isLoading.value = false
    })

  playlistStore.removePlaylist()
  playlistStore.init()

  toast.success('Cập nhật playlist thành công')
  isOpen.value = false
  emits('onOk', playListName.value)
  playListName.value = ''
}
</script>