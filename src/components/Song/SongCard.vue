<template>
  <div class="cursor-pointer w-full group" @click="playMedia(props.media)">
    <div class="w-full aspect-square rounded-xl bg-no-repeat bg-cover bg-center mb-2"
      :style="[`background-image: url('${getThumbnailUrlPrimary(props.media.thumbnails)}')`]">
      <div class="ease-in duration-150 bg-black/50 group-hover:opacity-100 opacity-0 w-full h-full relative rounded-xl">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <VueFontAwesome icon="fa-light fa-circle-play" class="w-10 fill-orange-500" />
        </div>
      </div>
    </div>
    <div class="text-slate-400 font-sans line-clamp-2">
      {{ props.media.title }}
    </div>
    <div class="font-sans text-sm">
      {{ getFullName(props.media.owner) }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { getFullName, getThumbnailUrlPrimary } from '@/utils/common';
import { Prisma } from '~/prisma/generated/mysql';
import { playMedia } from '@/utils/common';

const props = defineProps<{
  media: Prisma.MediaGetPayload<{
    include: {
      owner: true;
      thumbnails: true;
    };
  }>
}>();
</script>
