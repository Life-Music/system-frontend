<template>
  <div
    class="w-64 aspect-[5/4] rounded-xl flex items-center justify-center bg-no-repeat bg-cover bg-center cursor-pointer"
    :style="[`background-image: url('${props.image}')`]"
  >
    <div class="text-2xl font-sans">
      {{ props.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  image: string;
  name: string;
}>();
</script>
