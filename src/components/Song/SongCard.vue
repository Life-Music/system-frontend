<template>
  <div class="cursor-pointer w-full group relative">
    <div class="absolute right-1 top-1">
      <MediaDropDown :media="props.media" />
    </div>
    <div class="w-full aspect-square rounded-xl bg-no-repeat bg-cover bg-center mb-2" @click="playMedia(props.media)"
      :style="[`background-image: url('${getThumbnailUrlPrimary(props.media.thumbnails)}')`]">
      <div class="ease-in duration-150 bg-black/50 group-hover:opacity-100 opacity-0 w-full h-full relative rounded-xl">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <VueFontAwesome icon="fa-light fa-circle-play" class="w-10 fill-orange-500" />
        </div>
      </div>
    </div>
    <div class="flex gap-x-2 mt-2">
      <div class="mt-1">
        <Avatar size="sm" :user-info="props.media.owner" />
      </div>
      <div class="space-y-1">
        <div class="text-white font-sans line-clamp-2 font-medium">
          {{ props.media.title }}
        </div>
        <RouterLink :to="{
          name: routerNames.ARTIST_DETAIL,
          params: { artistId: props.media.owner.id }
        }" class="font-sans text-xs text-slate-400" @click.stop="">
          {{ getFullName(props.media.owner) }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getFullName, getThumbnailUrlPrimary } from '@/utils/common';
import { Prisma } from '~/prisma/generated/mysql';
import { playMedia } from '@/utils/common';
import Avatar from '../User/Avatar/Avatar.vue';
import routerNames from '@/router/routerNames';
import MediaDropDown from '../Dropdown/MediaDropDown.vue';

const props = defineProps<{
  media: Prisma.MediaGetPayload<{
    include: {
      owner: true;
      thumbnails: true;
    };
  }>
}>();
</script>
