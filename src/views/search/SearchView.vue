<template>
  <div class="px-10 main-wrapper">
    <div class="mb-8">
      <h1 class="text-xl font-bold tracking-wider">
        Tìm kiếm với: {{ q }}
      </h1>
    </div>
    <div class="space-y-8">
      <SongSearch :q="q" />
      <div class="border border-slate-700"></div>
      <ArtistSearch :q="q" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import ArtistSearch from '@/components/Search/ArtistSearch.vue';
import SongSearch from '@/components/Search/SongSearch.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const q = ref<string>(route.query.q?.toString() ?? "");

watch(() => route.query.q, () => q.value = route.query.q?.toString() ?? "")
</script>