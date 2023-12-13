<template>
  <form v-if="userInfo" @submit="onSubmit">
    <div class="flex items-center justify-center gap-x-2">
      <div>
        <Avatar :user-info="userInfo" />
      </div>
      <div class="flex-auto">
        <input placeholder="Nhập bình luận" v-model="message"
          class="w-full rounded-2xl py-2 px-4 border-slate-600 border" />
      </div>
      <div>
        <button class="bg-transparent border-none p-2 fill-beige">
          <VueFontAwesome icon="fa-light fa-paper-plane-top" class="w-6" />
        </button>
      </div>
    </div>
  </form>
  <div v-else class="text-beige">
    Vui lòng <RouterLink :to="{
      name: routerNames['AUTH.LOGIN'],
    }">
      đăng nhập
    </RouterLink> để sử dụng tính năng này
  </div>
</template>
<script setup lang="ts">
import routerNames from '@/router/routerNames';
import { useUserInfoStore } from '@/stores/user';
import Avatar from '../User/Avatar/Avatar.vue';
import { ref } from 'vue';

const emits = defineEmits(['submit'])
const userStore = useUserInfoStore()
const userInfo = userStore.userInfo
const message = ref('')

const onSubmit = (e: Event) => {
  emits('submit', message.value, e)
  message.value = ''
  e.preventDefault()
}

</script>