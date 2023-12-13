<template>
  <div class="h-full flex flex-col overflow-hidden">
    <div class="flex-auto overflow-auto">
      <CommentList :media-id="props.mediaId" ref="commentListRef"></CommentList>
    </div>
    <div>
      <CommentInput @submit="sendComment" />
    </div>
  </div>
</template>
<script setup lang="ts">
import requestInstance from '@/utils/axios';
import CommentList from '../Comment/CommentList.vue';
import CommentInput from './CommentInput.vue';
import { ref } from 'vue';
import { useUserInfoStore } from '@/stores/user';

const props = defineProps<{
  mediaId: string
}>()

const userStore = useUserInfoStore()
const commentListRef = ref<InstanceType<typeof CommentList>>()

const sendComment = async (comment: string, e: Event) => {
  const res = await requestInstance.post(`/media/${props.mediaId}/comment`, {
    content: comment,
  })
  if (commentListRef.value) {
    commentListRef.value.comments.push(res.data.data)
  }
}

</script>