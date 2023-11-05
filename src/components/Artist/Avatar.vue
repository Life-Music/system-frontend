<template>
  <div
    class="w-8 aspect-square flex items-center justify-center uppercase text-white text-lg rounded-full bg-purple-600"
  >
    <template v-if="props.name">
      <div>{{ props.name[0] }}</div>
    </template>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<
  | {
      src: string;
      name?: string;
    }
  | {
      src?: string;
      name: string;
    }
>();
</script>
