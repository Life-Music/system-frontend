<template>
  <RouterLink :to="{
    name: routerNames['ALBUM_DETAIL'],
    params: {
      albumId: album.id,
    }
  }" class="cursor-pointer w-full text-center">
    <div class="w-full aspect-square rounded-xl bg-no-repeat bg-cover bg-center mb-2"
      :style="[`background-image: url('${getThumbnailUrlPrimary(props.album.mediaOnAlbum[0].media.thumbnails)}')`]"></div>
    <div class="text-white font-medium font-sans text-lg">
      {{ album.name }}
    </div>
    <div class="font-sans text-sm text-slate-400">
      {{ getFullName(props.artist) }}
    </div>
  </RouterLink>
</template>
<script setup lang="ts">
import routerNames from '@/router/routerNames';
import { getFullName, getThumbnailUrlPrimary } from '@/utils/common';
import { Prisma, User } from '~/prisma/generated/mysql';

const props = defineProps<{
  album: Prisma.AlbumGetPayload<{
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
      },
    },
  }>,
  artist: User,
}>();
</script>
