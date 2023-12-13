<template>
  <div v-if="mediaStore.currentMedia">
    <div class="flex w-full h-full p-4">
      <div class="w-1/4">
        <Pulse :handler="handleRelated">
          <Card title="Liên quan">
            <div class="space-y-4">
              <Card v-for="related in mediaRelated" :key="related.id" :scrollable="false">
                <template #title>
                  <div class="uppercase text-beige text-xs">
                    {{ related.name }}
                  </div>
                </template>
                <div class="space-y-2">
                  <MiniAudioPlayer v-for="relation in related.categoryOnMedia" :media="relation.media" />
                </div>
              </Card>
            </div>
          </Card>
          <template #loading>
            <div class="animate-pulse flex h-10 w-32">
              <div class="w-full bg-slate-700 rounded-lg h-full"></div>
            </div>
            <div class="space-y-6 mt-4">
              <div v-for="i in 6">
                <PulseCommentTemplate />
              </div>
            </div>
          </template>
        </Pulse>
      </div>
      <div class="w-1/2 flex flex-col justify-between gap-x-4 items-center">
        <div class="flex flex-auto items-center">
          <div class="w-[300px] aspect-square rounded-full bg-center relative" :style="{
            backgroundImage: 'url(' + getThumbnailUrlPrimary(mediaStore.currentMedia.thumbnails) + ')'
          }" :class="[mediaStore.isPlaying ? 'animate-[spin_5000ms_linear_0ms_infinite]' : '']">
            <!-- <div
              class="w-12 aspect-square rounded-full bg-[#070c14] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            </div> -->
          </div>
        </div>
        <div v-if="mediaStore.infoCurrentMedia" class="flex items-center gap-x-4">
          <div class="inline-flex items-center gap-x-2 py-2 px-4 bg-slate-800 rounded-lg">
            <VueFontAwesome icon="fa-light fa-eye" class="fill-beige h-5" />
            <span>{{ mediaStore.infoCurrentMedia.media.plays }}</span>
            <span>lượt phát</span>
          </div>
          <div class="flex items-center divide-x">
            <div class="flex gap-x-2 items-center py-2 px-4 hover:bg-slate-900 rounded-l-lg bg-slate-800 cursor-pointer"
              @click="toggleLike()">
              <VueFontAwesome v-if="mediaStore.infoCurrentMedia.reaction.current?.isLike" icon="fa-solid fa-thumbs-up"
                class="h-5 fill-white" />
              <VueFontAwesome v-else icon="fa-regular fa-thumbs-up" class="h-5 fill-beige" />
              <div>{{ formatNumber(mediaStore.infoCurrentMedia.reaction.total) }}</div>
            </div>
            <div class="flex gap-x-2 items-center py-2 px-4 hover:bg-slate-900 rounded-r-lg bg-slate-800 cursor-pointer"
              @click="toggleDisLike()">
              <VueFontAwesome v-if="mediaStore.infoCurrentMedia.reaction.current?.isLike === false"
                icon="fa-solid fa-thumbs-down" class="h-5 fill-white" />
              <VueFontAwesome v-else icon="fa-regular fa-thumbs-down" class="h-5 fill-beige" />
              <div>{{ formatNumber(mediaStore.infoCurrentMedia.media._count.mediaReaction -
                mediaStore.infoCurrentMedia.reaction.total) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/4 h-full">
        <Comment :media-id="mediaStore.currentMedia.id" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMediaStore } from '@/stores/media';
import { formatNumber, getThumbnailUrlPrimary } from '@/utils/common';
import Comment from '../Comment/Comment.vue';
import Card from '../Card/Card.vue';
import requestInstance from '@/utils/axios';
import { MediaReaction, Prisma } from '~/prisma/generated/mysql';
import { ref, watch } from 'vue';
import Pulse from '../Lazy/Pulse.vue';
import PulseCommentTemplate from '../Lazy/PulseCommentTemplate.vue';
import MiniAudioPlayer from './MiniAudioPlayer.vue';

type MediaRelatedItemType = Prisma.CategoryGetPayload<{
  include: {
    categoryOnMedia: {
      select: {
        media: {
          include: {
            owner: true,
            thumbnails: true,
          },
        },
      },
      take: 10,
    },
  }
}>
const mediaStore = useMediaStore()
const mediaRelated = ref<MediaRelatedItemType[]>([])

const getMediaRelated = async () => {
  if (!mediaStore.currentMedia) return;
  const res = requestInstance.get<ResponseSuccess<MediaRelatedItemType[]>>(`/recommendation/media/${mediaStore.currentMedia.id}`)
  res.then(res => {
    mediaRelated.value = res.data.data
  })
  return res
}

const sendReaction = async (reaction: string) => {
  if (!mediaStore.currentMedia) return
  const res = await requestInstance.post<ResponseSuccess<{
    current: MediaReaction,
    total: number,
    like: number,
  }>>(`/media/${mediaStore.currentMedia.id}/reaction`, {
    type: reaction
  })

  mediaStore.setReaction(res.data.data.current, res.data.data.total, res.data.data.like)

}

const toggleLike = () => {
  sendReaction('like')
}

const toggleDisLike = () => {
  sendReaction('dislike')
}

const handleRelated = ref(getMediaRelated())

watch(() => mediaStore.currentMedia?.id, () => {
  handleRelated.value = getMediaRelated()
})
</script>