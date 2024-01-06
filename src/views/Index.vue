<template>
  <div class="px-10 main-wrapper">
    <div class="pt-2 mb-8">
      <h1 class="text-4xl font-bold tracking-wider">
        {{ $t("sidebar.explore") }}
      </h1>
    </div>
    <div class="flex gap-x-8 w-full">
      <div class="space-y-8 flex-auto w-full">
        <div class="w-full" v-if="playlists?.length">
          <USlide :per-page="4">
            <template #title>
              <div>
                {{ $t("sidebar.playlist") }}
              </div>
            </template>
            <PlayListCard v-for="(playlist, i) in playlists" :key="i" :playlist="playlist" />
          </USlide>
        </div>
        <div>
          <SongRecent />
        </div>
        <div>
          <h3 class="text-2xl font-bold tracking-wide my-8">
            Album mới ra mắt
          </h3>
          <SongInAlbums />
        </div>
        <div>
          <h3 class="text-2xl font-bold tracking-wide my-8">
            Thể loại nhạc nổi bật
          </h3>
          <SongInCategories />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import PlayListCard from "@/components/Playlist/PlaylistCard.vue";
import AlbumCard from "@/components/Album/AlbumCard.vue";
import ArtistCard from "@/components/Artist/ArtistCard.vue";
import MiniAudioPlayer from "@/components/AudioPlayer/MiniAudioPlayer.vue";
import USlide from "@/components/Slideshow/USlide.vue";
import NewSong from "@/components/Discover/NewSong.vue";
import SongInAlbums from "@/components/Discover/SongInAlbums.vue";
import { usePlaylistStore } from "@/stores/playlist";
import SongInCategories from "@/components/Discover/SongInCategories.vue";
import SongRecent from "@/components/Discover/SongRecent.vue";

const playlistStore = usePlaylistStore()
const playlists = computed(() => playlistStore.playlists)

</script>
