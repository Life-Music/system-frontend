<template>
  <div class="flex aspect-square rounded-full items-center justify-center bg-cover bg-center bg-no-repeat"
    :class="size[props.size]" :style="`background-image: url('${userInfo.avatar}')`"   v-if="props.userInfo.avatar">
  </div>
  <div class="flex aspect-square rounded-full items-center justify-center bg-slate-500" :class="size[props.size]"
    v-else>
    {{ props.userInfo.firstName[0].toUpperCase() }}
  </div>
</template>
<script setup lang="ts">
import type { User } from "~/prisma/generated/mysql"

type sizeType = "sm" | "base" | "md" | "lg" | "xl"
const size: Record<sizeType, string> = {
  "sm": "w-8 text-xs",
  "base": "w-10 text-sm",
  "md": "w-16 text-base",
  "lg": "w-28 text-3xl",
  "xl": "w-32 text-5xl",
}

const props = withDefaults(defineProps<{
  userInfo: User,
  size?: sizeType
}>(), {
  size: 'base',
})

</script>