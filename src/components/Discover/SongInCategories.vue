<template>
  <LazyPulse :handler="handler">
    <div class="space-y-14">
      <div v-for="category in categories" class="space-y-2">
        <RouterLink :to="{
          name: routerNames.CATEGORY_DETAIL,
          params: {
            categoryId: category.id,
          }
        }" class="text-left font-medium text-lg text-beige py-3">{{ category.name }}</RouterLink>
        <div class="flex gap-x-4 gap-y-4">
          <div v-for="(music, i) in category.categoryOnMedia" class="w-1/6">
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
import PulseAlbumTemplate from "../Lazy/PulseAlbumTemplate.vue";
import SongCard from "../Song/SongCard.vue";
import routerNames from "@/router/routerNames";

type ItemResource = Prisma.CategoryGetPayload<{
  select: {
    name: true,
    id: true,
    categoryOnMedia: {
      select: {
        media: {
          include: {
            owner: true,
            thumbnails: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        media: {
          createdAt: 'desc',
        },
      },
      take: 10,
    },
  },
}>;

const categories = ref<ItemResource[]>([]);

const handler = requestInstance
  .get<ResponseSuccess<ItemResource[]>>("/recommendation/category/media")
  .then(({ data: { data } }) => {
    categories.value = data;
  });
</script>
