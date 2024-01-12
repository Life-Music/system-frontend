import { Prisma, Thumbnail, User } from "~/prisma/generated/mysql";
import { useMediaStore } from "../stores/media";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import requestInstance from "./axios";
import { useUserInfoStore } from "@/stores/user";
dayjs.extend(duration);

export const convertDuration = (durationSec: number): string => {
  const hour = Math.floor(durationSec / 60 / 60);
  const minute = Math.floor(durationSec / 60);
  const second = Math.floor(durationSec % 60);
  const hourStr = `${hour < 10 ? "0" + hour : hour}`;
  const minuteStr = `${minute < 10 ? "0" + minute : minute}`;
  const secondStr = `${second < 10 ? "0" + second : second}`;
  if (hour) {
    return `${hourStr}:${minuteStr}:${secondStr}`;
  }
  return `${minuteStr}:${secondStr}`;
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

export const formatDate = (date: string | Date) => {
  return dayjs(date).format("HH:mm DD/MM/YYYY");
};

export const getThumbnailUrlPrimary = (
  thumbnails: Thumbnail[],
  id?: string
): string => {
  const primary = thumbnails.find(
    (thumbnail) => (id && thumbnail.id === id) || (!id && thumbnail.isPrimary)
  );
  return (
    primary?.url ?? new URL("/images/audio/default.png", import.meta.url).href
  );
};

export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const getAudioSource = (fileId: string) => {
  return `${import.meta.env.VITE_API_ENDPOINT}/audio/${fileId}/stream`;
};

export const playMedia = (
  media: Prisma.MediaGetPayload<{
    include: {
      owner: true;
      thumbnails: true;
    };
  }>
) => {
  const mediaStore = useMediaStore();
  const userStore = useUserInfoStore();
  let forceAds = userStore.userInfo && userStore.userInfo.productId ? true : false;
  mediaStore.playMedia(media, forceAds);
  localStorage.setItem("last_played", media.id);
  if (userStore.userInfo) {
    requestInstance.post("/history/media", {
      mediaId: media.id,
    });
  }
};

export const calculateDurationBetweenTwoDays = (
  start: Date,
  end: Date
): string => {
  const duration = dayjs.duration(
    new Date(start).getTime() - new Date(end).getTime()
  );
  if (duration.years() > 1) {
    return `${duration.years()}y`;
  }
  if (duration.months() > 1) {
    return `${duration.months()}mo`;
  }
  if (duration.days() > 1) {
    return `${duration.days()}d`;
  }
  if (duration.hours() > 1) {
    return `${duration.hours()}h`;
  }
  if (duration.minutes() > 1) {
    return `${duration.minutes()}m`;
  }
  return "just now";
};
