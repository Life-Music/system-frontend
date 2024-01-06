<template>
  <Pulse :handler="handler">
    <div>
      <div class="font-medium uppercase text-sm text-beige mb-4">
        Album
      </div>
      <template v-if="dataSource.length">
        <div class="flex gap-4 flex-wrap w-full">
          <div class="w-1/6" v-for="album in dataSource" :key="album.id">
            <AlbumCard :album="album" :artist="album.mediaOnAlbum[0].media.owner" />
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
import ArtistCard from '../Artist/ArtistCard.vue';
import AlbumCard from '../Album/AlbumCard.vue';

type ResourceType = Prisma.AlbumGetPayload<{
  include: {
    mediaOnAlbum: {
      select: {
        media: {
          include: {
            owner: true,
            thumbnails: {
              where: {
                isPrimary: true,
              }
            },
          },
        },
      },
    },
  },
}>
const props = defineProps<{
  q: string,
}>()

const dataSource = ref<ResourceType[]>([])

const search = async () => {
  const res = await requestInstance.get<ResponseSuccess<ResourceType[]>>('/album', {
    params: {
      q: props.q,
    }
  })

  dataSource.value = res.data.data
}

const handler = ref(search())

watch(() => props.q, () => handler.value = search())

</script>