<template>
  <Teleport to="body">
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
                class="w-full max-w-md transform rounded-2xl bg-[#070c14] p-6 text-left align-middle shadow-xl transition-all">
                <div class="flex justify-between items-center">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-beige">
                    Chọn playlist
                  </DialogTitle>
                  <button class="border bg-sky-600 px-4 py-2 rounded-lg text-center text-sm text-slate-200"
                    @click="openModalCreatePlaylist">Tạo
                    playlist</button>
                </div>
                <div class="mt-4">
                  <SelectPlaylist v-model:selected="playListSelected" />
                </div>

                <div class="mt-4 flex justify-between">
                  <button type="button" @click="isOpen = false" class="btn-cancel">
                    Huỷ
                  </button>
                  <button type="button" @click="addPlaylist" class="btn-save">
                    <VueFontAwesome v-if="isLoading" icon="fa-regular fa-spinner-third"
                      class="h-4 animate-spin mr-2 fill-inherit" />
                    Add
                  </button>
                </div>
                <ModalAddPlaylist v-model:open="isOpenModalCreatePlaylist" />

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>
<script setup lang="ts">
import { defineModel, ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import SelectPlaylist from '../Select/SelectPlaylist.vue';
import requestInstance from '@/utils/axios';
import { Playlist } from '~/prisma/generated/mysql';
import { useToast } from '@/utils/vue-toastification';
import ModalAddPlaylist from './ModalAddPlaylist.vue';

const isOpen = defineModel<boolean>('open', {
  default: false,
})

const props = defineProps<{
  mediaId: string,
}>()


const isOpenModalCreatePlaylist = ref(false)
const isLoading = ref(false)
const toast = useToast()
const playListSelected = ref<Playlist>()

const addPlaylist = async () => {
  if (!playListSelected.value) return
  isLoading.value = true
  const res = await requestInstance.post(`/playlist/${playListSelected.value.id}/${props.mediaId}`)
    .finally(() => {
      isLoading.value = false
    })

  toast.success('Thêm vào playlist thành công')
  isOpen.value = false
}

const openModalCreatePlaylist = () => {
  isOpenModalCreatePlaylist.value = true
}
</script>