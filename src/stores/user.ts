import { defineStore } from "pinia";
import { User } from "~/prisma/generated/mysql";

export const useUserInfoStore = defineStore('user', {
  state(): {
    userInfo: User | null,
  } {
    return {
      userInfo: null
    }
  },
  actions: {
    setCurrentAudio(audio: any) {
      this.userInfo = audio
    },
    removeCurrentAudio() {
      this.userInfo = null
    }
  }
})