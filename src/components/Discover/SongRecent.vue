<template>
  <LazyPulse :handler="handler">
    <template v-if="userStore.userInfo">
      <div class="space-y-8">
        <RouterLink :to="{
          name: routerNames.RECENT_PLAY,
        }" class="text-left font-medium  py-3 text-2xl text-inherit">Vừa phát gần đây</RouterLink>
        <div class="flex gap-x-4 gap-y-4 flex-wrap">
          <div v-for="(music, i) in recent" class="w-1/6">
            <SongCard :media="music.media" />
          </div>
        </div>
      </div>
    </template>
    <template #loading>
      <div class="space-y-4">
        <div class="animate-pulse flex h-10 w-32">
          <div class="w-full bg-slate-700 rounded-lg h-full"></div>
        </div>
        <div class="flex gap-x-4 gap-y-4">
          <PulseAlbumTemplate v-for="j in 5" :key="j" />
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
import PulseAlbumTemplate from "../Lazy/PulseAlbumTemplate.vue";
import SongCard from "../Song/SongCard.vue";
import routerNames from "@/router/routerNames";
import { useUserInfoStore } from "@/stores/user";

type ItemResource = Prisma.HistoryGetPayload<{
  include: {
    media: {
      include: {
        owner: true,
        thumbnails: true,
      }
    },
  },
}>

const userStore = useUserInfoStore()
const recent = ref<ItemResource[]>([]);

const getHistory = async () => {
  const user = await userStore.init()
  if (!user) return
  const res = await requestInstance.get<ResponseSuccessPagination<ItemResource[]>>(`/history/media`, {
    params: {
      page: 1,
      take: 9999
    }
  })
  recent.value = res.data.data
}

const handler = getHistory()
</script>
