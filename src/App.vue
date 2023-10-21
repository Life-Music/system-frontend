<template>
  <ion-app>
    <transition
      leave-to-class="opacity-0 transition-all absolute inset-0 duration-[0ms]"
      enter-from-class="opacity-0 transition-all absolute inset-0 duration-[300ms]"
      enter-to-class="opacity-1 transition-all duration-[300ms]"
    >
      <component :is="layout">
        <router-view v-slot="{ Component }">
          <transition
            leave-to-class="opacity-0 transition-all absolute inset-0 duration-[0ms]"
            enter-from-class="opacity-0 transition-all absolute inset-0 duration-[300ms]"
            enter-to-class="opacity-1 transition-all duration-[300ms]"
            :duration="500"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </component>
    </transition>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useRoute } from "vue-router";
import AuthLayout from "./layouts/AuthLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { computed } from "vue";

const route = useRoute();

const layouts: Record<layout, any> = {
  AuthLayout,
  DefaultLayout,
};
const layout = computed(() => layouts[route.meta.layout ?? "DefaultLayout"]);
</script>
