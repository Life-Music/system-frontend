import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import routerNames from './routerNames';
import IndexVue from '@/views/Index.vue';
import PlaylistView from '@/views/playlist/PlaylistView.vue';
import HistoryView from '@/views/history/HistoryView.vue';
import LikeView from '@/views/like/LikeView.vue';
import ArtistView from '@/views/artist/ArtistView.vue';
import ArtistDetailView from '@/views/artist/ArtistDetailView.vue';
import SearchViewVue from '@/views/search/SearchView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: routerNames.HOME,
    component: IndexVue,
  },
  {
    path: '/playlist',
    children: [
      {
        path: ':playlistId',
        name: routerNames.PLAYLIST_DETAIL,
        component: PlaylistView,
      }
    ]
  },
  {
    path: '/recent',
    children: [
      {
        path: '',
        name: routerNames.RECENT_PLAY,
        component: HistoryView,
      }
    ]
  },
  {
    path: '/liked',
    children: [
      {
        path: '',
        name: routerNames.LIKED,
        component: LikeView,
      }
    ]
  },
  {
    path: '/artist',
    children: [
      {
        path: '',
        name: routerNames.ARTIST,
        component: ArtistView,
      },
      {
        path: ':artistId',
        name: routerNames.ARTIST_DETAIL,
        component: ArtistDetailView,
      }
    ]
  },
  {
    path: '/search',
    children: [
      {
        path: '',
        name: routerNames.SEARCH,
        component: SearchViewVue,
      }
    ]
  },
  {
    path: '/auth',
    children: [
      {
        path: '/login',
        component: () => import('@/views/auth/Login.vue'),
        name: routerNames['AUTH.LOGIN'],
        meta: {
          layout: 'AuthLayout',
        }
      },
      {
        path: '/register',
        component: () => import('@/views/auth/Register.vue'),
        name: routerNames['AUTH.REGISTER'],
        meta: {
          layout: 'AuthLayout',
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
