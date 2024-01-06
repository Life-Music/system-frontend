<template>
  <RouterLink :to="{
    name: routerNames.PLAYLIST_DETAIL,
    params: {
      playlistId: playlist.id
    }
  }"
    class="w-64 aspect-[5/4] rounded-xl flex items-end justify-center bg-no-repeat bg-cover bg-center cursor-pointer text-inherit"
    :style="[`background-image: url('${getThumbnailUrlPrimary(props.playlist.MediaOnPlaylist[0]?.media.thumbnails ?? [])}')`]">
    <div class="text-2xl font-sans px-10 py-2 rounded-lg bg-black/50 backdrop-blur-md mb-4">
      {{ props.playlist.title }}
    </div>
  </RouterLink>
</template>
<script setup lang="ts">
import routerNames from '@/router/routerNames';
import { getThumbnailUrlPrimary } from '@/utils/common';
import { Prisma } from '~/prisma/generated/mysql';

const props = defineProps<{
  playlist: Prisma.PlaylistGetPayload<{
    include: {
      MediaOnPlaylist: {
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          media: {
            select: {
              thumbnails: {
                where: {
                  isPrimary: true,
                },
                take: 1,
              }
            }
          }
        }
      }
    }
  }>
}>();
</script>
