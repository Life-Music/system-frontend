<template>
  <div class="relative">
    <component
      :is="tag"
      class="w-full px-2 py-2 outline-none on-focus bg-transparent"
      :id="id"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.currentTarget.value)"
      placeholder=" "
    />
    <label :for="id" class="absolute inset-0 bg-transparent">
      <div
        class="placeholder-custom transition-all duration-300 absolute top-1/2 -translate-y-1/2 text-sm text-[#494c51]"
      >
        {{ $attrs["custom-placeholder"] }}
      </div>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 404 77"
        preserveAspectRatio="none"
        class="stroke-primary pointer-events-none scale3d transition-[stroke-dashoffset] duration-300 stroke-[4px] absolute top-0 left-0 fill-none stroke-custom"
        :class="{ 'stroke-red-500': isError }"
      >
        <path d="m0,0l404,0l0,77l-404,0l0,-77z"></path>
      </svg>
      <div
        class="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 fill-red-500 group"
        v-if="isError"
      >
        <div class="relative">
          <VueFontAwesome icon="fa-regular fa-circle-exclamation" />
          <UTooltip class="hidden group-hover:block">
            <div
              class="text-red-500 text-sm"
              v-for="(error, i) in errors"
              :key="i"
            >
              {{ (error as Record<string, any>).$message }}
            </div>
          </UTooltip>
        </div>
      </div>
    </label>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import UTooltip from "@/components/Tooltip/UTooltip.vue";
import { ErrorObject } from "@vuelidate/core";
const props = withDefaults(defineProps<{
  errors: Array<ErrorObject>,
  tag?: string,
  modelValue: any,
  id?: string;
}>(), {
  id: () => `input_${crypto.randomUUID()}`,
  tag: "input"
});

const emits = defineEmits(["update:modelValue"])

const isError = computed(() => props.errors.length ? true : false)

</script>
<style scoped>
.scale3d {
  transform: scale3d(1, -1, 1);
}
.stroke-custom {
  stroke-dasharray: 962;
  stroke-dashoffset: 558;
}
.on-focus:focus + label > svg {
  stroke-dashoffset: 0;
}
.on-focus:focus + label > .placeholder-custom {
  top: -3px;
  font-size: 0.8rem;
  transform: translate(0px, -100%);
  color: #ffffff;
}
.on-focus:not(:placeholder-shown) + label > svg {
  stroke-dashoffset: 0;
}
.on-focus:not(:placeholder-shown) + label > .placeholder-custom {
  top: -3px;
  font-size: 0.8rem;
  transform: translate(0px, -100%);
}
</style>
