<template>
  <div class="shadow-md w-full">
    <div class="w-full flex">
      <div
        class="w-80 relative poster bg-no-repeat bg-cover bg-center opacity-70 border-t-2 border-primary"
      >
        <div class="absolute bottom-4 left-4 text-xl w-32 rounded-l-md">
          {{ $t("discover_new_music") }}
        </div>
      </div>
      <div class="p-8 w-[430px] bg-[#050b17] rounded-r-md">
        <div class="text-xl mb-2 text-center text-slate-300">
          {{ $t("welcome_back") }}
        </div>
        <div class="text-base mb-8 text-center text-slate-300">
          {{ $t("welcome_back_msg") }}
        </div>
        <form @submit.prevent="submit">
          <div class="space-y-8">
            <MakodaInput
              :custom-placeholder="$t('email_or_username')"
              v-model="formData.username"
              :errors="validate.username.$errors"
            />
            <MakodaInput
              type="password"
              :custom-placeholder="$t('password')"
              v-model="formData.password"
              :errors="validate.password.$errors"
            />
            <div class="flex justify-between items-center">
              <router-link
                :to="{
                  name: routerNames['AUTH.REGISTER'],
                }"
                >{{ $t("no_account") }}</router-link
              >
              <button
                class="btn-base bg-primary disabled:bg-green-200/60 fill-white float-right flex items-center gap-x-2 transition-all"
                :disabled="isLoading"
              >
                <VueFontAwesome
                  icon="fa-regular fa-spinner-third"
                  class="w-4 animate-spin fill-inherit"
                  v-if="isLoading"
                />
                {{ $t("done") }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MakodaInput from "@/components/Input/MakodaInput.vue";
import Poster from "@/assets/images/poster.jpg";
import { ref } from "vue";
const cssPoster = `url('${Poster}')`;
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import routerNames from "@/router/routerNames";
import requestInstance from "@/utils/axios";
import { useRouter } from "vue-router";

const formData = ref({
  username: "",
  password: "",
});
const isLoading = ref(false);
const router = useRouter();

const validate = useVuelidate(
  {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  formData
);

const submit = async (e: Event) => {
  const result = await validate.value.$validate();
  if (!result) {
    return;
  }

  isLoading.value = true;
  const res = await requestInstance
    .post<
      AxiosResponse<{
        token: string;
        user: any;
      }>
    >("/auth/login", formData.value)
    .finally(() => {
      isLoading.value = false;
    });

  if (res.data.success) {
    localStorage.setItem("access_token", res.data.data.token);
    router.push({
      name: routerNames.HOME,
    });
  }
};
</script>
<style scoped>
.poster {
  background-image: v-bind(cssPoster);
}
</style>
