<template>
  <div class="flex gap-x-3 text-beige fill-beige w-full">
    <VueFontAwesome icon="fa-light fa-comment" class="w-12 aspect-square" />
    <div class="space-y-2">
      <slot name="title">
        <div class="text-lg">
          Không có bình luận.
        </div>
      </slot>
      <slot name="description">
        <div class="text-sm">
          Hãy là người đầu tiên viết bình luận.
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>

</script>