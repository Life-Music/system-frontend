<template>
  <Table :columns="columns" :data-source="dataSource" @click="rowClicked">
    <template #customRender="{ column, i, row }">
      <template v-if="column.dataIndex === 'no'">
        <div class="font-semibold">
          {{ i + 1 }}
        </div>
      </template>
      <template v-if="column.dataIndex === 'name'">
        <div class="flex items-center gap-x-4">
          <div class="bg-no-repeat bg-cover bg-center rounded-lg w-12 aspect-square flex-shrink-0" :style="`background-image: url('${getThumbnailUrlPrimary(
            row.media.thumbnails
          )}')`"></div>
          <div class="space-y-1">
            <div class="font-semibold max-w-xs line-clamp-1">{{ row.media.title }}</div>
            <div class="text-sm">{{ getFullName(row.media.owner) }}</div>
          </div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'duration'">
        <div>
          {{ convertDuration(row.media.duration) }}
        </div>
      </template>
      <template v-if="column.dataIndex === 'createdAt'">
        <div>
          {{ formatDate(row.createdAt) }}
        </div>
      </template>
    </template>
  </Table>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Table from './Table.vue';
import { convertDuration, formatDate, getFullName, getThumbnailUrlPrimary, playMedia } from '@/utils/common';
import { Prisma } from '~/prisma/generated/mysql';

const columns = ref<Array<{
  dataIndex: string,
  key: string,
  title: string,
}>>([
  {
    dataIndex: 'no',
    key: 'no',
    title: '#',
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Tên',
  },
  {
    dataIndex: 'duration',
    key: 'duration',
    title: 'Thời lượng',
  },
  {
    dataIndex: 'createdAt',
    key: 'createdAt',
    title: 'Ngày thêm',
  }
])

const props = defineProps<{
  dataSource: Prisma.MediaOnPlaylistGetPayload<{
    select: {
      media: {
        include: {
          owner: true,
          thumbnails: true,
        },
      },
      createdAt: true,
    },
  }>[]
}>()

const rowClicked = (row: any) => {
  playMedia(row.media)
}
</script>