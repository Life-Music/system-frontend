import requestInstance from "@/utils/axios";
import { defineStore } from "pinia";
import { Playlist } from "~/prisma/generated/mysql";

export const usePlaylistStore = defineStore('playlist', {
  state(): {
    handler: Promise<Playlist[]> | null,
    playlists: Playlist[] | null,
  } {
    return {
      handler: null,
      playlists: null
    }
  },
  actions: {
    init() {
      this.handler ??= requestInstance.get<AxiosResponse<Playlist[]>>("/playlist").then(({ data }) => {
        return data.data
      }).then((data) => {
        this.playlists = data
        return data
      });
      return this.handler
    },
    setPlaylist(playlists: Playlist[]) {
      this.playlists = playlists
    },
    removePlaylist() {
      this.handler = null
      this.playlists = null
    }
  },
  getters: {
  }
})