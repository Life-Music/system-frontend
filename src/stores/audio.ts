import { defineStore } from "pinia";

export const useAudioStore = defineStore('audio', {
  state() {
    return {
      currentAudio: null
    }
  },
  actions: {
    setCurrentAudio(audio: any) {
      this.currentAudio = audio
    },
    removeCurrentAudio() {
      this.currentAudio = null
    }
  }
})