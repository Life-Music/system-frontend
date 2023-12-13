<template>
  <div class="px-10 main-wrapper">
    <div class="pt-2 mb-8">
      <h1 class="text-4xl font-bold tracking-wider">
        {{ $t("sidebar.explore") }}
      </h1>
    </div>
    <div class="flex gap-x-8 w-full">
      <div class="space-y-8 flex-auto w-full">
        <div class="w-full">
          <USlide :per-page="4">
            <template #title>
              <div>
                {{ $t("sidebar.playlist") }}
              </div>
            </template>
            <PlayListCard v-for="(playlist, i) in playlists" :key="i" :name="playlist.name" :image="playlist.image" />
          </USlide>
        </div>
        <div>
          <SongInAlbums />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import PlayListCard from "@/components/Playlist/PlaylistCard.vue";
import AlbumCard from "@/components/Album/AlbumCard.vue";
import ArtistCard from "@/components/Artist/ArtistCard.vue";
import MiniAudioPlayer from "@/components/AudioPlayer/MiniAudioPlayer.vue";
import USlide from "@/components/Slideshow/USlide.vue";
import NewSong from "@/components/Discover/NewSong.vue";
import SongInAlbums from "@/components/Discover/SongInAlbums.vue";

const playlists = ref(
  new Array(5).fill({
    image: new URL("/tmp-image/summer-beach.avif", import.meta.url).href,
    name: "Mùa hè sôi động",
  })
);

</script>
