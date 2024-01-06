<template>
  <div class="px-10 main-wrapper">
    <Pulse :handler="handler">
      <div v-if="dataSource">
        <div class="pt-2 mb-8">
          <div class="flex justify-between">
            <h1 class="text-4xl font-bold tracking-wider">
              {{ dataSource.title }}
            </h1>
            <div>
              <PlaylistDropDown :playlist="dataSource" @edit-title="updateTitle" @delete="deletePlaylist" />
            </div>
          </div>
        </div>
        <TableListMedia :data-source="dataSource.MediaOnPlaylist" :show-action="true">
          <template #action="{ data }">
            <MediaDropDown :media="data.media" @click.stop="">
              <template #playlist>
                <div class="flex w-full items-center" @click.stop="handlePlayList(data.media.id)">
                  <VueFontAwesome icon="fa-light fa-list-music" class="h-4 fill-beige mr-2" />
                  Xóa khỏi playlist
                </div>
              </template>
            </MediaDropDown>
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
import requestInstance from '@/utils/axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from '@/utils/vue-toastification';
import { Prisma } from '~/prisma/generated/mysql';
import PlaylistDropDown from '@/components/Dropdown/PlaylistDropDown.vue';
import { useRouter } from 'vue-router';
import routerNames from '@/router/routerNames';

type ResourceType = Prisma.PlaylistGetPayload<{
  include: {
    MediaOnPlaylist: {
      select: {
        media: {
          include: {
            audioResources: true,
            owner: true,
            thumbnails: true,
          },
        },
        createdAt: true,
      },
    },
  },
}>
const route = useRoute()
const router = useRouter()
const toast = useToast()

const dataSource = ref<ResourceType>()

const handlePlayList = async (mediaId: string) => {
  const playlistId = route.params.playlistId
  await requestInstance.delete(`playlist/${playlistId}/${mediaId}`)
  toast.success('Xóa khỏi thành công')
  const index = dataSource.value?.MediaOnPlaylist.findIndex((item) => item.media.id)
  if (index === undefined) return
  dataSource.value?.MediaOnPlaylist.splice(index, 1)
}

const getPlaylist = async () => {
  const playlistId = route.params.playlistId
  const res = await requestInstance.get<ResponseSuccess<ResourceType>>(`/playlist/${playlistId}`, {
    params: {
      page: 1,
      take: 9999
    }
  })
  dataSource.value = res.data.data
}

const updateTitle = (title: string) => {
  if (!dataSource.value) return
  dataSource.value.title = title
}

const deletePlaylist = async () => {
  router.push({
    name: routerNames.HOME
  })
}

const handler = ref(getPlaylist())

watch(() => route.params.playlistId, () => {
  handler.value = getPlaylist()
})

</script>