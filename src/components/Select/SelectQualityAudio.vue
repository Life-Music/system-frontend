<template>
  <Listbox v-model="selectedQuality">
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded-lg bg-[#111823] py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span class="block truncate">{{ qualityShow[selectedQuality] ?? "Chọn chất lượng" }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <VueFontAwesome icon="fa-solid fa-chevron-down" class="h-4 fill-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute top-0 mt-1 -translate-y-full max-h-60 w-full overflow-auto rounded-md bg-[#111823] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          <ListboxOption v-slot="{ active, selected }" v-for="audioResource in props.audioResources"
            :key="audioResource.id" :value="audioResource.label" as="template">
            <li :class="[active ? 'bg-[#1a222d]' : 'text-beige',
              'relative select-none py-2 pl-7 pr-4 cursor-pointer',
            ]">
              <span :class="[
                selected ? 'font-medium' : 'font-normal',
                'block truncate',
              ]">{{ qualityShow[audioResource.label] }}</span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-1 fill-amber-600">
                <VueFontAwesome icon="fa-regular fa-check" class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { defineModel } from 'vue';
import type { AudioQuality, AudioResource } from '~/prisma/generated/mysql';

const selectedQuality = defineModel<AudioQuality>({
  required: true,
});

const qualityShow = {
  "LOSSLESS": "Lossless",
  "HIGH": "320kbps",
  "NORMAL": "128kbps"
}

const props = defineProps<{
  audioResources: AudioResource[],
}>()
</script>