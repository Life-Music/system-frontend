<template>
  <Suspense>
    <div>
      <slot />
      <Handler :handler="props.handler" />
    </div>
    <template #fallback>
      <div class="animate-pulse flex" :class="classLoader">
        <div class="w-full bg-slate-700 rounded-lg h-full"></div>
      </div>
    </template>
  </Suspense>
</template>
<script setup lang="ts">
import Handler from "./_Handler.vue";
const props = defineProps<{
  handler: Promise<any> | null;
  classLoader: string;
}>();
</script>
