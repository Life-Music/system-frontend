<template>
  <LazyPulse :handler="handler" class="h-full">
    <Card :title="$t('comment')" class="h-full" :extra="`${comments.length ?? 0} bình luận`">
      <template v-if="comments.length">
        <div class="space-y-4">
          <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" @delete="deleteComment" />
        </div>
        <div class="mt-2 flex justify-between">
          <div class="mt-2">
            <VueFontAwesome icon="fa-regular fa-spinner-third" class="h-4 animate-spin fill-beige" v-if="isLoading" />
          </div>
          <div class="cursor-pointer underline font-semibold text-sm text-right" v-if="params.page < meta.endPage"
            @click="loadMore">
            Tải thêm
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex h-full items-center">
          <NoComment class="justify-center" />
        </div>
      </template>
    </Card>
    <template #loading>
      <div class="animate-pulse flex h-10 w-32">
        <div class="w-full bg-slate-700 rounded-lg h-full"></div>
      </div>
      <div class="space-y-6 mt-4">
        <div v-for="i in 6">
          <PulseCommentTemplate />
        </div>
      </div>
    </template>
  </LazyPulse>
</template>
<script setup lang="ts">
import requestInstance from "@/utils/axios";
import LazyPulse from "../Lazy/Pulse.vue";
import { Prisma } from "~/prisma/generated/mysql";
import Card from "../Card/Card.vue";
import NoComment from "./_NoComment.vue";
import CommentItem from "./_CommentItem.vue";
import { reactive, ref, watch } from "vue";
import PulseCommentTemplate from "../Lazy/PulseCommentTemplate.vue";

type ItemResource = Prisma.CommentGetPayload<{
  include: {
    user: true,
  }
}>
const props = defineProps<{
  mediaId: string
}>()

const isLoading = ref(false);

const comments = ref<ItemResource[]>([])
const params = reactive({
  page: 1,
  take: 10,
})

const meta = reactive({
  endPage: 1,
})

const getComments = async () => {
  if (isLoading.value) return;
  isLoading.value = true
  return requestInstance.get<ResponseSuccessPagination<ItemResource[]>>(`/media/${props.mediaId}/comment`, {
    params: params,
  })
    .then((res) => {
      comments.value = [
        ...comments.value,
        ...res.data.data,
      ]
      meta.endPage = res.data.meta.end_page
    })
    .finally(() => {
      isLoading.value = false
    })
}

const deleteComment = async (commentId: string) => {
  return requestInstance.delete<ResponseSuccessPagination<ItemResource[]>>(`/media/${props.mediaId}/comment/${commentId}`, {
    params: params,
  })
    .then((res) => {
      const index = comments.value.findIndex((comment) => comment.id === commentId)
      comments.value.splice(index, 1)
    })
}

const loadMore = () => {
  params.page++
  getComments()
}

const handler = ref(getComments())

watch(() => props.mediaId, () => {
  comments.value = []
  handler.value = getComments()
})

defineExpose({
  comments
})

</script>