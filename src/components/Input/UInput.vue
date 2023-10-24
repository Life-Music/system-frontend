<template>
  <input
    v-bind="attrs"
    :value="modelValue"
    @input="
      $emit(
        'update:modelValue',
        ($event.currentTarget as HTMLInputElement).value
      )
    "
    :id="id"
    class="border p-2 border-primary outline-none rounded bg-transparent"
  />
</template>
<script lang="ts" setup>
import { useAttrs } from "vue";
const props = withDefaults(
  defineProps<{
    modelValue: any;
    id?: string;
  }>(),
  {
    id: () => `input_${crypto.randomUUID()}`,
  }
);

defineEmits(["update:modelValue"]);

const attrs = useAttrs();
</script>
