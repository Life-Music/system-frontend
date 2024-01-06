import requestInstance from "@/utils/axios";
import { getAudioSource } from "@/utils/common";
import { defineStore } from "pinia";
import { AudioQuality, MediaReaction, Prisma, AudioResource } from "~/prisma/generated/mysql";

type MediaType = Prisma.MediaGetPayload<{
  include: {
    owner: true;
    thumbnails: true;
  }
}>

type MediaInfoType = {
  media: Prisma.MediaGetPayload<{
    include: {
      audioResources: true;
      owner: true;
      thumbnails: true;
      detail: true;
      _count: {
        select: {
          mediaReaction: true,
        },
      },
    }
  }>
  reaction: {
    total: number
    current: MediaReaction | null
  }
}
export const useMediaStore = defineStore('media', {
  state(): {
    currentMedia: MediaType | null
    audioLoading: boolean
    infoCurrentMedia: MediaInfoType | null
    currentAudio: {
      player: HTMLAudioElement | null,
      currentTime: number,
      duration: number,
      volume: number,
      currentQuality: AudioQuality
    }
    isPlaying: boolean
  } {
    return {
      currentMedia: null,
      audioLoading: false,
      infoCurrentMedia: null,
      currentAudio: {
        currentTime: 0,
        duration: 0,
        player: null,
        volume: 1,
        currentQuality: "LOSSLESS",
      },
      isPlaying: false
    }
  },
  actions: {
    setCurrentMedia(media: MediaType) {
      this.currentMedia = media
    },
    removeCurrentMedia() {
      this.currentMedia = null
    },
    async loadCurrentMedia() {
      if (!this.currentMedia) return;
      this.audioLoading = true;
      const res = await requestInstance.get<ResponseSuccess<MediaInfoType>>(`/media/${this.currentMedia.id}`)
      this.infoCurrentMedia = res.data.data
    },
    async playMedia(media: MediaType) {
      const currentMediaId = this.currentMedia?.id;
      if (media.id === currentMediaId) return;
      this.isPlaying = true;
      this.audioLoading = true;
      this.setCurrentMedia(media)
      await this.loadCurrentMedia()
      if (currentMediaId) {
        const resource = this.infoCurrentMedia?.media.audioResources.find((resource) => resource.label === this.currentAudio.currentQuality) ?? this.infoCurrentMedia?.media.audioResources[0]
        if (resource)
          this.loadAudio(resource)
        return
      }
      this.playAudio();
    },
    loadAudio(audioResource: AudioResource) {
      if (!this.currentAudio.player) return
      this.currentAudio.player.pause()
      this.currentAudio.player.setAttribute('src', getAudioSource(audioResource.id))
      this.currentAudio.currentQuality = audioResource.label
      this.audioLoading = true
      this.currentAudio.player.load();
      this.playAudio()
    },
    playAudio() {
      if (!this.infoCurrentMedia) return;
      if (!this.currentAudio.player) {
        const resource = this.infoCurrentMedia?.media.audioResources.find((resource) => resource.label === this.currentAudio.currentQuality) ?? this.infoCurrentMedia?.media.audioResources[0]
        this.currentAudio.duration = this.currentMedia?.duration ?? 0
        const audio = new Audio(getAudioSource(resource.id));
        audio.addEventListener("stalled", () => {
          this.audioLoading = true;
        });
        audio.addEventListener("playing", () => {
          this.audioLoading = false;
          this.isPlaying = true;
        });
        audio.addEventListener("pause", () => {
          this.isPlaying = false;
        });
        audio.addEventListener("timeupdate", () => {
          this.currentAudio.currentTime = audio.currentTime
        });
        audio.addEventListener("volumechange", () => {
          this.currentAudio.volume = audio.volume
        });
        audio.addEventListener("canplay", () => {
          this.currentAudio.duration = audio.duration
          this.currentAudio.volume = audio.volume
        })
        this.currentAudio.player = audio
      }
      this.currentAudio.player.play().catch(() => {
        this.audioLoading = false;
        this.isPlaying = false;
      });
    },
    pauseAudio() {
      if (!this.currentAudio.player) return;
      this.currentAudio.player.pause();
    },
    togglePlay() {
      if (this.isPlaying) {
        this.pauseAudio()
        return
      }
      this.playAudio()
    },
    seek(time: number) {
      if (!this.currentAudio.player) return;
      this.currentAudio.player.currentTime = time
    },
    changeVolume(volume: number) {
      if (!this.currentAudio.player) return;
      this.currentAudio.player.volume = volume
    },
    setReaction(reaction: MediaReaction, total: number, like: number) {
      if (!this.infoCurrentMedia) return;
      this.infoCurrentMedia.reaction.total = like;
      this.infoCurrentMedia.media._count.mediaReaction = total;
      this.infoCurrentMedia.reaction.current = reaction
    },
    changeQuality(quality: AudioQuality) {
      if (!this.infoCurrentMedia) return
      const resource = this.infoCurrentMedia.media.audioResources.find((resource) => resource.label === quality)
      if (!resource) return
      this.loadAudio(resource)
    },
  }
})