<template>
  <div class="px-2 pb-32">
    <Pulse :handler="handler">
      <div v-if="dataSource">
        <div class="pt-2 mb-8">
          <div class="w-full h-96 bg-slate-800 rounded-lg flex items-end py-8 px-8 relative">
            <div :style="`background-image: url('${dataSource.artist.cover}')`"
              class="bg-cover bg-center bg-no-repeat absolute inset-0 opacity-50" v-if="dataSource.artist.cover">
            </div>
            <div class="flex justify-between items-end w-full z-10 relative">
              <div class="space-y-8">
                <h1 class="text-6xl font-bold tracking-wider ">
                  {{ getFullName(dataSource.artist) }}
                </h1>
                <div class="text-beige">
                  <p><span class="text-xl font-bold">{{ dataSource.artist._count.channel }}</span> người đăng ký</p>
                  <p><span class="text-xl font-bold">{{ dataSource.artist._count.media }}</span> tác phẩm</p>
                </div>
              </div>
              <button class="btn-save py-3" @click="subscribe">
                <VueFontAwesome icon="fa-light fa-bell" class="h-5 mr-3" />
                {{ isSubscribed ? "Đã đăng ký" : "Đăng ký" }}
              </button>
            </div>
          </div>
        </div>
        <div class="px-2 mb-8">
          <div class="text-3xl text-beige font-semibold mb-4">
            Top ca khúc nổi bật
          </div>
          <TableListMedia :data-source="mediaPoplar" :show-action="true" />
        </div>

        <div>
          <div class="text-3xl text-beige font-semibold mb-4">
            Album mới nhất
          </div>
          <div class="flex flex-wrap gap-x-4">
            <div class="w-1/6" v-for="album in dataSource.artist.Album">
              <AlbumCard :artist="dataSource.artist" :album="album" />
            </div>
          </div>
        </div>
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
import AlbumCard from '@/components/Album/AlbumCard.vue';
import Pulse from '@/components/Lazy/Pulse.vue';
import PulseSongTemplate from '@/components/Lazy/PulseSongTemplate.vue';
import TableListMedia from '@/components/Table/TableListMedia.vue';
import requestInstance from '@/utils/axios';
import { getFullName } from '@/utils/common';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Prisma, Subscriber } from '~/prisma/generated/mysql';

type ResourceType = {
  artist: Prisma.UserGetPayload<{
    include: {
      _count: {
        select: {
          channel: true,
          media: true,
        },
      },
      media: {
        include: {
          thumbnails: true,
          owner: true,
        },
      },
      Album: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          mediaOnAlbum: {
            select: {
              media: {
                select: {
                  thumbnails: {
                    where: {
                      isPrimary: true,
                    },
                  },
                },
              },
            },
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      },
    }
  }>
  subscribe: Subscriber | undefined,
}
const route = useRoute()
let isSubscribed = ref<boolean>(false);

const dataSource = ref<ResourceType>()
const mediaPoplar = ref<{
  media: Prisma.MediaGetPayload<{
    include: {
      owner: true,
      thumbnails: true,
    }
  }>,
  createdAt: Date,
}[]>([])

const getArtist = async () => {
  const artistId = route.params.artistId
  if (!artistId) return
  const res = await requestInstance.get<ResponseSuccess<ResourceType>>(`/artist/${artistId}`,)
  dataSource.value = res.data.data
  mediaPoplar.value = res.data.data.artist.media.map(media => ({
    media,
    createdAt: new Date(media.createdAt),
  }))

  isSubscribed.value = res.data.data.subscribe ? true : false
}

const subscribe = async () => {
  isSubscribed.value = !isSubscribed.value
  const res = await requestInstance.post<ResponseSuccess<Subscriber>>(`/artist/${route.params.artistId}/subscribe`)
}

const handler = ref(getArtist())

watch(() => route.params.artistId, () => {
  handler.value = getArtist()
})


</script>