<template>
  <div :key="_key">
    <Suspense>
      <div class="h-full">
        <slot />
        <Handler :handler="props.handler" />
      </div>
      <template #fallback>
        <slot name="loading">
          <div class="animate-pulse flex" :class="classLoader">
            <div class="w-full bg-slate-700 rounded-lg h-full"></div>
          </div>
        </slot>
      </template>
    </Suspense>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Handler from "./_Handler.vue";
const props = defineProps<{
  handler: Promise<any> | null;
  classLoader?: string;
}>();

const _key = ref(new Date().getTime());

watch(() => props.handler, () => {
  _key.value = new Date().getTime();
})
</script>
