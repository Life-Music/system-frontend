<template>
  <div class="px-10 main-wrapper">
    <Pulse :handler="handler">
      <div v-if="dataRes">
        <div class="pt-2 mb-8">
          <div class="flex justify-between">
            <div>
              <h1 class="text-4xl font-bold tracking-wider">
                {{ dataRes.name }}
              </h1>
              <div v-if="dataRes.description" class="text-sm text-beige">
                {{ dataRes.description }}
              </div>
            </div>
            <RouterLink :to="{
              name: routerNames.ARTIST_DETAIL,
              params: {
                artistId: dataRes.userId,
              }
            }" class="flex items-center gap-x-2 text-inherit">
              <Avatar :user-info="dataRes.owner" />
              {{ getFullName(dataRes.owner) }}
            </RouterLink>
          </div>
        </div>
        <TableListMedia :data-source="dataSource" :show-action="true">
          <template #action="{ data }">
            <MediaDropDown :media="data.media" @click.stop="" />
          </template>
        </TableListMedia>
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
import MediaDropDown from '@/components/Dropdown/MediaDropDown.vue';
import Pulse from '@/components/Lazy/Pulse.vue';
import PulseSongTemplate from '@/components/Lazy/PulseSongTemplate.vue';
import TableListMedia from '@/components/Table/TableListMedia.vue';
import Avatar from '@/components/User/Avatar/Avatar.vue';
import routerNames from '@/router/routerNames';
import requestInstance from '@/utils/axios';
import { getFullName } from '@/utils/common';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Prisma } from '~/prisma/generated/mysql';

type ResourceType = Prisma.AlbumGetPayload<{
  include: {
    owner: true,
    mediaOnAlbum: {
      select: {
        media: {
          include: {
            owner: true,
            thumbnails: true,
          },
        },
        album: true,
        albumId: true,
      },
    },
  },
}>

const route = useRoute()

const dataSource = ref<Prisma.MediaOnPlaylistGetPayload<{
  select: {
    media: {
      include: {
        owner: true,
        thumbnails: true,
      },
    },
    createdAt: true,
  },
}>[]>([])

const dataRes = ref<ResourceType>()

const getAlbum = async () => {
  const albumId = route.params.albumId
  if (!albumId) return
  const res = await requestInstance.get<ResponseSuccess<ResourceType>>(`/album/${albumId}`, {
    params: {
      page: 1,
      take: 9999
    }
  })
  dataRes.value = res.data.data

  dataSource.value = res.data.data.mediaOnAlbum.map(item => {
    return {
      media: item.media,
      createdAt: new Date(item.media.createdAt)
    }
  })
}

const handler = ref(getAlbum())

watch(() => route.params.albumId, () => {
  handler.value = getAlbum()
})

</script>