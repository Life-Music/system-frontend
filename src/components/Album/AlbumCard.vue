<template>
  <div class="cursor-pointer w-full">
    <div
      class="w-full aspect-square rounded-xl bg-no-repeat bg-cover bg-center mb-2"
      :style="[`background-image: url('${props.image}')`]"
    ></div>
    <div class="text-slate-400 font-sans text-lg">
      {{ props.name }}
    </div>
    <div class="font-sans">
      {{ props.artist.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  image: string;
  name: string;
  artist: {
    name: string;
  };
}>();
</script>
