<template>
  <div class="text-center cursor-pointer w-max">
    <div
      class="w-32 aspect-square rounded-xl bg-no-repeat bg-cover bg-center mb-4"
      :style="[`background-image: url('${props.image}')`]"
    ></div>
    <div class="text-slate-400 font-sans mb-2">
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
