<template>
  <div class="cursor-pointer p-2 rounded-xl flex gap-x-4 items-center bg-[#111823] pr-6 text-sm fill-white"
    @click.self="playMedia(props.media)">
    <div class="bg-no-repeat bg-cover bg-center rounded-lg w-14 aspect-square flex-shrink-0" :style="`background-image: url('${getThumbnailUrlPrimary(
      props.media.thumbnails
    )}')`"></div>
    <div class="space-y-1 mr-auto overflow-hidden flex-auto" @click="playMedia(props.media)">
      <div class="line-clamp-2">{{ props.media.title }}</div>
      <div class="text-xs">{{ getFullName(props.media.owner) }}</div>
    </div>
    <div class="flex-shrink-0 ml-auto p-4">
      <MediaDropDown :media="media" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  playMedia,
  getThumbnailUrlPrimary,
  getFullName,
} from "@/utils/common";
import MediaDropDown from "../Dropdown/MediaDropDown.vue";
import { Prisma } from "~/prisma/generated/mysql";
const props = defineProps<{
  media: Prisma.MediaGetPayload<{
    include: {
      thumbnails: true;
      owner: true;
    };
  }>;
}>();


</script>
