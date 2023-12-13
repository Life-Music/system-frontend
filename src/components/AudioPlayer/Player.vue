<template>
  <div class="relative z-20 flex flex-col" :class="{ 'h-screen': isShowDetail }" v-if="mediaStore.currentMedia">
    <PlayerDetail v-if="isShowDetail" class="bg-[#070c14] flex-auto overflow-auto"></PlayerDetail>
    <div class="flex items-center py-4 px-8 bg-[#010d20] justify-between">
      <div class="flex items-center gap-x-4 w-1/4">
        <div class="w-14 aspect-square rounded-md bg-no-repeat bg-center bg-cover"
          :style="`background-image: url('${getThumbnailUrlPrimary(mediaStore.currentMedia.thumbnails)}')`">
        </div>
        <div class="space-y-2 max-w-[220px]">
          <div class="text-base line-clamp-1 ">{{ mediaStore.currentMedia.title }}</div>
          <div class="text-xs text-beige">{{ getFullName(mediaStore.currentMedia.owner) }}</div>
        </div>
        <div></div>
      </div>
      <div class="w-1/2">
        <div class="w-max mx-auto space-y-2">
          <div class="flex gap-x-6 items-center fill-white mx-auto w-max">
            <VueFontAwesome icon="fa-solid fa-backward-step" class="h-5 cursor-pointer" />
            <VueFontAwesome v-if="mediaStore.audioLoading" icon="fa-regular fa-spinner-third" class="h-5 animate-spin" />
            <VueFontAwesome v-else :icon="`fa-solid ${mediaStore.isPlaying ? 'fa-pause' : 'fa-play'}`"
              class="h-7 cursor-pointer" @click="mediaStore.togglePlay()" />
            <VueFontAwesome icon="fa-solid fa-forward-step" class="h-5 cursor-pointer" />
          </div>
          <div class="flex gap-x-4 items-center text-sm">
            <div>
              {{ convertDuration(mediaStore.currentAudio.currentTime) }}
            </div>
            <div class="w-[320px]">
              <div class="w-full h-3 cursor-pointer flex items-center" @click="timeTooltip.seek"
                @mousemove="timeTooltip.handlerHoverUp" @mouseleave="timeTooltip.isShow = false">
                <div class="w-full relative bg-slate-500 rounded-lg h-1">
                  <div class="h-full rounded-lg bg-white w-0" :style="{
                    width: `${(mediaStore.currentAudio.currentTime / mediaStore.currentAudio.duration) * 100}%`
                  }"></div>
                  <div v-if="timeTooltip.isShow" class="absolute -top-5 text-xs"
                    :style="{ left: `${timeTooltip.offsetX}px` }">{{
                      timeTooltip.text }}</div>
                </div>
              </div>
            </div>
            <div>
              {{ convertDuration(mediaStore.currentAudio.duration) }}
            </div>
          </div>
        </div>
      </div>
      <div class="fill-white w-1/4">
        <div class="flex items-center gap-x-4 ml-auto w-max">
          <div class="space-y-2" v-if="mediaStore.infoCurrentMedia">
            <div class="flex gap-x-2 items-center">
              <VueFontAwesome v-if="mediaStore.infoCurrentMedia.reaction.current?.isLike" icon="fa-solid fa-thumbs-up"
                class="h-5 fill-red-400 cursor-pointer" @click="toggleLike()" />
              <VueFontAwesome v-else icon="fa-regular fa-thumbs-up" class="h-5 fill-beige cursor-pointer"
                @click="toggleLike()" />
              <div>{{ formatNumber(mediaStore.infoCurrentMedia.reaction.total) }}</div>
            </div>
            <div class="flex gap-x-2 items-center">
              <VueFontAwesome v-if="mediaStore.infoCurrentMedia.reaction.current?.isLike === false"
                icon="fa-solid fa-thumbs-down" class="h-5 fill-red-400 cursor-pointer" @click="toggleDisLike()" />
              <VueFontAwesome v-else icon="fa-regular fa-thumbs-down" class="h-5 fill-beige cursor-pointer"
                @click="toggleDisLike()" />
              <div>{{ formatNumber(mediaStore.infoCurrentMedia.media._count.mediaReaction -
                mediaStore.infoCurrentMedia.reaction.total) }}</div>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-x-2">
              <VueFontAwesome icon="fa-solid fa-volume-high" class="h-4" />
              <div class="w-16">
                <div class="w-full h-3 cursor-pointer flex items-center" @click="volumeTooltip.seek"
                  @mousemove="volumeTooltip.handlerHoverUp" @mouseleave="volumeTooltip.isShow = false">
                  <div class="w-full relative bg-slate-500 rounded-lg h-1">
                    <div class="h-full rounded-lg bg-white w-0" :style="{
                      width: `${mediaStore.currentAudio.volume * 100}%`
                    }"></div>
                    <div v-if="volumeTooltip.isShow" class="absolute -top-5 text-xs"
                      :style="{ left: `${volumeTooltip.offsetX}px` }">
                      {{ volumeTooltip.text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="mediaStore.infoCurrentMedia">
              <SelectQualityAudio v-model="currentQuality"
                :audio-resources="mediaStore.infoCurrentMedia.media.audioResources" />
            </template>
          </div>
          <div class="p-3 rounded-full bg-white/10 fill-slate-500 w-max cursor-pointer" @click="toggleShowDetail">
            <VueFontAwesome icon="fa-solid fa-chevron-down" class="h-4" v-if="isShowDetail" />
            <VueFontAwesome icon="fa-solid fa-chevron-up" class="h-4" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMediaStore } from '@/stores/media';
import { convertDuration, getFullName, getThumbnailUrlPrimary, formatNumber } from '@/utils/common';
import { reactive, ref, watch } from 'vue';
import PlayerDetail from './PlayerDetail.vue';
import requestInstance from '@/utils/axios';
import { MediaReaction } from '~/prisma/generated/mysql';
import SelectQualityAudio from '../Select/SelectQualityAudio.vue';

const mediaStore = useMediaStore()
const isShowDetail = ref(false)
const timeTooltip = reactive({
  text: '',
  offsetX: 0,
  isShow: false,
  getNextTime(event: MouseEvent) {
    const x = event.offsetX
    const target = event.currentTarget as HTMLDivElement
    const width = target.offsetWidth
    const percent = (x / width)
    const nextTime = mediaStore.currentAudio.duration * percent
    return {
      nextTime,
      x
    }
  },
  handlerHoverUp(event: MouseEvent) {
    const { nextTime, x } = this.getNextTime(event)
    this.text = convertDuration(nextTime)
    this.offsetX = x
    this.isShow = true
  },
  seek(event: MouseEvent) {
    const { nextTime } = this.getNextTime(event)
    mediaStore.seek(nextTime)
  }
})
const volumeTooltip = reactive({
  text: '',
  offsetX: 0,
  isShow: false,
  getNextVolume(event: MouseEvent) {
    const x = event.offsetX
    const target = event.currentTarget as HTMLDivElement
    const width = target.offsetWidth
    const percent = (x / width)
    return {
      percent,
      x
    }
  },
  handlerHoverUp(event: MouseEvent) {
    const { percent, x } = this.getNextVolume(event)
    this.text = percent.toFixed(2)
    this.offsetX = x
    this.isShow = true
  },
  seek(event: MouseEvent) {
    const { percent } = this.getNextVolume(event)
    mediaStore.changeVolume(percent)
  }
})

const currentQuality = ref(mediaStore.currentAudio.currentQuality)

const toggleShowDetail = () => {
  isShowDetail.value = !isShowDetail.value
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

watch(() => mediaStore.currentAudio.currentQuality, () => {
  currentQuality.value = mediaStore.currentAudio.currentQuality
})

watch(() => currentQuality.value, () => {
  mediaStore.changeQuality(currentQuality.value)
})

</script>