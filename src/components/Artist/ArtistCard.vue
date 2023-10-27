<template>
  <div class="flex gap-x-4 items-center">
    <div
      class="w-16 aspect-square bg-no-repeat bg-center bg-cover rounded-full"
      :style="`background-image: url('${props.image}')`"
    ></div>
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  image: string;
}>();
</script>
