<template>
  <div class="px-10">
    <div class="pt-2 mb-8">
      <h1 class="text-4xl font-bold tracking-wider">
        {{ $t("sidebar.explore") }}
      </h1>
    </div>
    <div class="flex gap-x-8 w-full">
      <div class="space-y-8 flex-auto w-full overflow-auto overflow-y-hidden">
        <div class="w-full">
          <USlide :per-page="3">
            <template #title>
              <div>
                {{ $t("sidebar.playlist") }}
              </div>
            </template>
            <PlayListCard
              v-for="(playlist, i) in playlists"
              :key="i"
              :name="playlist.name"
              :image="playlist.image"
            />
          </USlide>
        </div>
        <div class="flex gap-x-6">
          <div class="w-2/3">
            <USlide :per-page="3">
              <template #title>
                <div>
                  {{ $t("albums") }}
                </div>
              </template>
              <AlbumCard
                v-for="(album, i) in albums"
                :key="i"
                :name="album.name"
                :image="album.image"
                :artist="album.artist"
              />
            </USlide>
          </div>
          <div class="w-1/3">
            <USlide :per-page="2">
              <template #title>
                <div>
                  {{ $t("sidebar.artist") }}
                </div>
              </template>
              <div class="space-y-4" v-for="(artistGroup, i) in artists">
                <ArtistCard
                  v-for="(artist, j) in artistGroup"
                  :key="i"
                  :image="artist.image"
                >
                  <div class="space-y-2">
                    <div>{{ artist.name }}</div>
                    <button
                      class="btn-base bg-main-gradient font-sans text-slate-800 font-semibold py-1 px-3"
                    >
                      {{ $t("follow") }}
                    </button>
                  </div>
                </ArtistCard>
              </div>
            </USlide>
          </div>
        </div>
      </div>
      <div class="w-96">
        <div class="text-right text-beige py-3">{{ $t("new_discover") }}</div>
        <div class="space-y-3">
          <MiniAudioPlayer
            v-for="music in musics"
            :artist="music.artist"
            :duration="music.duration"
            :name="music.name"
            :source="music.source"
            :thumbnail="music.thumbnail"
          />
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

const playlists = ref(
  new Array(5).fill({
    image: "/tmp-image/summer-beach.avif",
    name: "Mùa hè sôi động",
  })
);

const albums = ref(
  new Array(3).fill({
    image: "/tmp-image/summer-beach.avif",
    name: "Việt Nam Ơi",
    artist: {
      name: "Minh Beta",
    },
  })
);

const artists = ref(
  new Array(5).fill([
    {
      image: "/tmp-image/summer-beach.avif",
      name: "Minh Beta",
    },
    {
      image: "/tmp-image/summer-beach.avif",
      name: "Minh Beta",
    },
  ])
);

const musics = ref(
  new Array(6).fill({
    thumbnail: "/tmp-image/summer-beach.avif",
    name: "Việt nam ơi",
    artist: {
      name: "Minh Beta",
    },
    source: "/tmp-audio/VietNamOi-MinhBeta_3bnet.mp3",
    duration: 180,
  })
);
</script>
