<template>
  <LazyPulse :handler="handler">
    <div class="space-y-14">
      <div v-for="album in albums" class="space-y-2">
        <div class="text-left text-beige py-3">{{ album.name }}</div>
        <div class="flex gap-x-4 gap-y-4">
          <div v-for="(music, i) in album.mediaOnAlbum" class="w-1/6">
            <SongCard :media="music.media" />
          </div>
        </div>
      </div>
    </div>
    <template #loading>
      <div class="space-y-14">
        <div v-for="i in 6" class="space-y-4">
          <div class="animate-pulse flex h-10 w-32">
            <div class="w-full bg-slate-700 rounded-lg h-full"></div>
          </div>
          <div class="flex gap-x-4 gap-y-4">
            <PulseAlbumTemplate v-for="j in 5" :key="j" />
          </div>
        </div>
      </div>
    </template>
  </LazyPulse>
</template>
<script setup lang="ts">
import requestInstance from "@/utils/axios";
import { ref } from "vue";
import { Prisma } from "~/prisma/generated/mysql";
import LazyPulse from "../Lazy/Pulse.vue";
import PulseSongTemplate from "../Lazy/PulseSongTemplate.vue";
import AlbumCard from "../Album/AlbumCard.vue";
import PulseAlbumTemplate from "../Lazy/PulseAlbumTemplate.vue";
import { getFullName, getThumbnailUrlPrimary } from "@/utils/common";
import SongCard from "../Song/SongCard.vue";

type ItemResource = Prisma.AlbumGetPayload<{
  select: {
    name: true;
    mediaOnAlbum: {
      select: {
        media: {
          include: {
            owner: true;
            thumbnails: true;
          };
        };
      };
    };
  };
}>;

const albums = ref<ItemResource[]>([]);

const handler = requestInstance
  .get<ResponseSuccess<ItemResource[]>>("/recommendation/album/media")
  .then(({ data: { data } }) => {
    albums.value = data;
  });
</script>
