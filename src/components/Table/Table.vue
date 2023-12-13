<template>
  <div class="w-full">
    <table class="w-full">
      <thead class="text-beige text-sm text-left border-b border-slate-700">
        <th v-for="column in columns" :key="column.key" class="py-4 px-4">
          {{ column.title }}
        </th>
      </thead>
      <tbody class="text-beige">
        <tr v-for="(row, i) in dataSource" :key="i" @click="emits('click', row)"
          class="hover:bg-slate-900 cursor-pointer">
          <td v-for="column in columns" :key="column.key" class="py-3 px-4">
            <slot name="customRender" :column="column" :row="row" :i="i">
              {{ row[column.dataIndex] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup generic="T extends Record<string, any>">

const props = defineProps<{
  columns: Array<{
    dataIndex: string,
    key: string,
    title: string,
  }>
  dataSource: T[]
}>()

const emits = defineEmits(['click'])

</script>