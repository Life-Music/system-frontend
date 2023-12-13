<template>
  <Pulse :handler="handler">
    <div>
      <div class="font-medium uppercase text-sm text-beige mb-4">
        Bài hát
      </div>
      <template v-if="dataSource.length">
        <div class="flex gap-x-4 flex-wrap">
          <div class="w-1/6">
            <SongCard v-for="media in dataSource" :media="media" :key="media.id" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="text-xl text-center text-beige">Rất tiếc, không có nội dung phù hợp với từ khóa này.</div>
      </template>
    </div>
    <template #loading>
      <div class="mt-4 flex gap-4">
        <div v-for="i in 5">
          <PulseCardTemplate />
        </div>
      </div>
    </template>
  </Pulse>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import Pulse from '../Lazy/Pulse.vue';
import PulseCardTemplate from '../Lazy/PulseCardTemplate.vue';
import requestInstance from '@/utils/axios';
import { Prisma } from '~/prisma/generated/mysql';
import SongCard from '../Song/SongCard.vue';

type ResourceType = Prisma.MediaGetPayload<{
  include: {
    detail: true,
    thumbnails: true,
    audioResources: true,
    videoResources: true,
    owner: true,
    _count: {
      select: {
        comment: true,
        mediaReaction: {
          where: {
            isLike: true,
          },
        },
      },
    },
    mediaOnAlbum: {
      select: {
        album: true,
      },
    },
    mediaOnCategory: {
      select: {
        category: true,
      },
    },
  }
}>
const props = defineProps<{
  q: string,
}>()

const dataSource = ref<ResourceType[]>([])

const search = async () => {
  const res = await requestInstance.get<ResponseSuccess<ResourceType[]>>('/media', {
    params: {
      q: props.q,
    }
  })

  dataSource.value = res.data.data
}

const handler = ref(search())

watch(() => props.q, () => handler.value = search())

</script>