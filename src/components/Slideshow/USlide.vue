<template>
  <div
    class="flex justify-end w-full py-3 space-x-6 text-beige fill-beige items-center"
  >
    <slot name="title" />
    <div class="flex space-x-3 items-center">
      <VueFontAwesome
        icon="fa-regular fa-chevron-left"
        class="h-3 cursor-pointer"
        @click="prev()"
      />
      <VueFontAwesome
        icon="fa-regular fa-chevron-right"
        class="h-3 cursor-pointer"
        @click="next()"
      />
    </div>
  </div>
  <div class="h-full w-full overflow-hidden snap-x" ref="slideWrapper">
    <div
      class="flex flex-nowrap slide-container transition-transform duration-300"
      ref="container"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

const slideWrapper = ref<HTMLElement | null>(null);
const container = ref<HTMLElement | null>(null);
const perWidth = ref<number | null>(null);

const props = defineProps<{
  perPage: number;
}>();

const currentPage = ref(props.perPage);

const emits = defineEmits<{
  (e: "next"): void;
  (e: "prev"): void;
}>();

const next = () => {
  if (container.value) {
    const childLen = container.value.children.length;
    if (currentPage.value === childLen) return;
    currentPage.value++;
    emits("next");
    update();
  }
};

const prev = () => {
  if (currentPage.value === props.perPage) return;
  currentPage.value--;
  emits("prev");
  update();
};

const update = () => {
  if (container.value && perWidth.value) {
    const pos = (currentPage.value - props.perPage) * perWidth.value;
    container.value.style.transform = `translateX(-${pos}px)`;
  }
};

onMounted(() => {
  if (slideWrapper.value) {
    const width = slideWrapper.value.clientWidth;
    perWidth.value = width / props.perPage;
    const items = slideWrapper.value.querySelectorAll(".slide-container>*");
    items.forEach((item) => {
      const width = item.clientWidth;
      const margin = (perWidth.value as number) - width;
      item.setAttribute(
        "style",
        `${item.getAttribute("style")}; margin-right: ${
          margin / 2
        }px; margin-left: ${margin / 2}px`
      );
    });
  }
});
</script>
<style scoped>
.slide-container::v-deep > * {
  flex: 0 0 auto;
}
</style>
