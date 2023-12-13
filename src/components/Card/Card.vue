<template>
  <div class="h-full flex flex-col">
    <div class="flex justify-between gap-x-3">
      <slot name="title">
        <div class="text-left text-beige py-3 font-semibold">{{ props.title }}</div>
      </slot>
      <slot name="extra">
        <div class="text-left text-beige py-3 text-sm">{{ props.extra }}</div>
      </slot>
    </div>
    <div class="p-2 h-full" :class="{ 'overflow-auto': props.scrollable }">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  extra?: string,
  scrollable?: boolean
}>(), {
  scrollable: true,
})

</script>