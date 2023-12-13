<template>
  <div class="px-10 main-wrapper">
    <Pulse :handler="handler">
      <div v-if="dataSource">
        <div class="pt-2 mb-8">
          <h1 class="text-4xl font-bold tracking-wider">
            Top 10 thịnh hành
          </h1>
        </div>
        <TableListMedia :data-source="dataSource" />
      </div>
      <template #loading>
        <div class="animate-pulse flex h-12 w-44 my-10">
          <div class="w-full bg-slate-700 rounded-lg h-full"></div>
        </div>
        <div class="space-y-6 mt-4">
          <div v-for="i in 5">
            <PulseSongTemplate />
          </div>
        </div>
      </template>
    </Pulse>
  </div>
</template>
<script setup lang="ts">
import Pulse from '@/components/Lazy/Pulse.vue';
import PulseSongTemplate from '@/components/Lazy/PulseSongTemplate.vue';
import TableListMedia from '@/components/Table/TableListMedia.vue';
import requestInstance from '@/utils/axios';
import { ref } from 'vue';
import { Prisma } from '~/prisma/generated/mysql';

type ResourceType = {
  media: Prisma.MediaGetPayload<{
    include: {
      owner: true,
      thumbnails: true,
    }
  }>,
  score: number
}

const dataSource = ref<Array<{
  media: ResourceType['media'],
  createdAt: Date,
}>>()

const getTrending = async () => {
  const res = await requestInstance.get<ResponseSuccessPagination<ResourceType[]>>(`/trending`)
  dataSource.value = res.data.data.map(({ media }) => {
    return {
      media: media,
      createdAt: new Date(media.createdAt),
    }
  })
}

const handler = ref(getTrending())

</script>