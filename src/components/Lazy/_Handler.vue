<template></template>

<script setup lang="ts">
const props = defineProps<{
  handler: Promise<any> | null;
}>();

await props.handler;
</script>
