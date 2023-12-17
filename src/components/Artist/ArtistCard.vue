<template>
  <div class="flex items-center flex-col gap-4 bg-gray-800 p-4 rounded-xl hover:bg-slate-950 cursor-pointer">
    <div>
      <Avatar :user-info="props.artist" size="lg" />
    </div>
    <div class="space-y-2  text-center">
      <div class="w-full line-clamp-1 text-lg">{{ getFullName(artist) }}</div>
      <div class="text-sm text-beige">
        {{ formatNumber(artist._count.channel) }} người theo dõi
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Prisma } from '~/prisma/generated/mysql';
import Avatar from '../User/Avatar/Avatar.vue';
import { formatNumber, getFullName } from '@/utils/common';

const props = defineProps<{
  artist: Prisma.UserGetPayload<{
    include: {
      _count: {
        select: {
          channel: true,
        }
      }
    }
  }>;
}>();
</script>
