import requestInstance from "@/utils/axios";
import { defineStore } from "pinia";
import { Prisma } from "~/prisma/generated/mysql";

type PlayListResource = Prisma.PlaylistGetPayload<{
  include: {
    MediaOnPlaylist: {
      take: 1,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        media: {
          select: {
            thumbnails: {
              where: {
                isPrimary: true,
              },
              take: 1,
            }
          }
        }
      }
    }
  }
}>
export const usePlaylistStore = defineStore('playlist', {

  state(): {
    handler: Promise<PlayListResource[]> | null,
    playlists: PlayListResource[] | null,
  } {
    return {
      handler: null,
      playlists: null
    }
  },
  actions: {
    init() {
      this.handler ??= requestInstance.get<AxiosResponse<PlayListResource[]>>("/playlist").then(({ data }) => {
        return data.data
      }).then((data) => {
        this.playlists = data
        return data
      });
      return this.handler
    },
    setPlaylist(playlists: PlayListResource[]) {
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