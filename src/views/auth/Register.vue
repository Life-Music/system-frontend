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
        <div class="text-2xl mb-8 text-center text-slate-300">
          {{ $t("sign_up") }}
        </div>
        <form @submit.prevent="submit">
          <div class="space-y-8">
            <MakodaInput
              :custom-placeholder="$t('email')"
              v-model="formData.email"
              :errors="validate.email.$errors"
            />
            <MakodaInput
              :custom-placeholder="$t('username')"
              v-model="formData.username"
              :errors="validate.username.$errors"
            />
            <div class="flex gap-x-4">
              <MakodaInput
                type="password"
                :custom-placeholder="$t('password')"
                v-model="formData.password"
                :errors="validate.password.$errors"
              />
              <MakodaInput
                type="password"
                v-model="formData.re_password"
                :custom-placeholder="$t('re_password')"
                :errors="validate.re_password.$errors"
              />
            </div>
            <div class="flex justify-between items-center">
              <router-link
                :to="{
                  name: routerNames['AUTH.LOGIN'],
                }"
                >{{ $t("has_account") }}</router-link
              >
              <button class="btn-base bg-primary float-right">
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
import { ref, computed } from "vue";
const cssPoster = `url('${Poster}')`;
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import routerNames from "@/router/routerNames";
const formData = ref({
  email: "",
  username: "",
  password: "",
  re_password: "",
});

const validate = useVuelidate(
  computed(() => ({
    email: {
      required,
      email,
    },
    username: {
      required,
    },
    password: {
      required,
    },
    re_password: {
      required,
      sameAsPassword: sameAs(formData.value.password),
    },
  })),
  formData
);

const submit = async (e: Event) => {
  console.log(validate);
  const result = await validate.value.$validate();
  if (!result) {
    return;
  }
  // Call API here
};
</script>
<style scoped>
.poster {
  background-image: v-bind(cssPoster);
}
</style>
