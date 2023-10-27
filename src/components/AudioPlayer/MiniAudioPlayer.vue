<template>
  <div
    class="p-2 rounded-xl flex gap-x-4 items-center bg-music-gradient pr-6 text-sm fill-white"
  >
    <div
      class="bg-no-repeat bg-cover bg-center rounded-lg w-14 aspect-square"
      :style="`background-image: url('${props.thumbnail}')`"
    ></div>
    <div class="space-y-1 mr-auto">
      <div>{{ props.name }}</div>
      <div>{{ props.artist.name }}</div>
    </div>
    <div>
      {{ convertDuration(props.duration) }}
    </div>
    <VueFontAwesome
      :icon="`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`"
      class="h-4 cursor-pointer"
      @click="togglePlay()"
    />
  </div>
</template>
<script setup lang="ts">
import { useAudioStore } from "@/stores/audio";
import { convertDuration } from "@/utils/common";
import { ref } from "vue";
const props = defineProps<{
  thumbnail: string;
  name: string;
  artist: {
    name: string;
  };
  source: string;
  duration: number;
}>();

const isPlaying = ref(false);

let audio = ref<HTMLAudioElement | null>(null);

const togglePlay = () => {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    if (!audio.value) audio.value = new Audio(props.source);
    audio.value.play();
  } else {
    if (audio.value) audio.value.pause();
  }
};
</script>
