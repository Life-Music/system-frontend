<template>
  <LazyPulse :handler="handler" class="h-[250px]">
    <div class="text-right text-beige py-3">{{ $t("new_discover") }}</div>
    <div class="space-y-3">
      <MiniAudioPlayer v-for="music in musics" :media="music" />
    </div>
    <template #loading>
      <div class="space-y-4">
        <PulseSongTemplate v-for="i in 6" :key="i" />
      </div>
    </template>
  </LazyPulse>
</template>
<script setup lang="ts">
import requestInstance from "@/utils/axios";
import { ref } from "vue";
import { Prisma } from "~/prisma/generated/mysql";
import MiniAudioPlayer from "../AudioPlayer/MiniAudioPlayer.vue";
import LazyPulse from "../Lazy/Pulse.vue";
import PulseSongTemplate from "../Lazy/PulseSongTemplate.vue";

type ItemResource = Prisma.MediaGetPayload<{
  include: {
    owner: true;
    thumbnails: true;
    audioResources: true;
  };
}>;

const musics = ref<ItemResource[]>([]);

const handler = requestInstance
  .get<ResponseSuccess<ItemResource[]>>("/recommendation/media/newest")
  .then(({ data: { data } }) => {
    musics.value = data;
  });
</script>
