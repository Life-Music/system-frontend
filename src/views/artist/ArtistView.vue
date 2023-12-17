<template>
  <div class="px-10 main-wrapper space-y-8">
    <Pulse :handler="handlerFollowing">
      <div v-if="dataSource">
        <div class="pt-2 mb-8">
          <h1 class="text-4xl font-bold tracking-wider">
            Đang theo dõi
          </h1>
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-4">
          <div v-for="artist in dataSourceFollowing" :key="artist.id" class="w-1/6">
            <ArtistCard :artist="artist" @click="gotoDetail(artist.id)" />
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
    <Pulse :handler="handler">
      <div v-if="dataSource">
        <div class="pt-2 mb-8">
          <h1 class="text-4xl font-bold tracking-wider">
            Nghệ sỹ nổi bật
          </h1>
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-4">
          <div v-for="artist in dataSource" :key="artist.id" class="w-1/6">
            <ArtistCard :artist="artist" @click="gotoDetail(artist.id)" />
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
import ArtistCard from '@/components/Artist/ArtistCard.vue';
import Pulse from '@/components/Lazy/Pulse.vue';
import PulseSongTemplate from '@/components/Lazy/PulseSongTemplate.vue';
import routerNames from '@/router/routerNames';
import requestInstance from '@/utils/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Prisma } from '~/prisma/generated/mysql';

type ResourceType = Prisma.UserGetPayload<{
  include: {
    _count: {
      select: {
        channel: true,
        media: true,
      },
    },
  },
}>

const dataSourceFollowing = ref<ResourceType[]>()
const dataSource = ref<ResourceType[]>()
const router = useRouter()

const getArtists = async () => {
  const res = await requestInstance.get<ResponseSuccessPagination<ResourceType[]>>(`/artist`, {
    params: {
      page: 1,
      take: 9999
    }
  })
  dataSource.value = res.data.data
}

const getArtistsFollowing = async () => {
  const res = await requestInstance.get<ResponseSuccessPagination<ResourceType[]>>(`/artist`, {
    params: {
      page: 1,
      take: 9999,
      isSubscribed: 1,
    }
  })
  dataSourceFollowing.value = res.data.data
}

const handler = ref(getArtists())
const handlerFollowing = ref(getArtistsFollowing())

const gotoDetail = (artistId: string) => {
  router.push({
    name: routerNames.ARTIST_DETAIL,
    params: {
      artistId,
    }
  })
}

</script>