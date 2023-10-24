<template>
  <input
    v-bind="attrs"
    :value="modelValue"
    v-model="model"
    :id="id"
    class="border p-2 border-primary outline-none rounded bg-transparent"
  />
</template>
<script lang="ts" setup>
import { useAttrs, defineModel } from "vue";
const props = withDefaults(
  defineProps<{
    id?: string;
  }>(),
  {
    id: `input_${Math.round((new Date().getTime() / 1000) * Math.random())}`,
  }
);

const attrs = useAttrs();

const model = defineModel();
</script>
