import requestInstance from "@/utils/axios";
import { defineStore } from "pinia";
import { User } from "~/prisma/generated/mysql";

export const useUserInfoStore = defineStore('user', {
  state(): {
    handler: Promise<User | false> | null,
    userInfo: User | false | null,
  } {
    return {
      handler: null,
      userInfo: null
    }
  },
  actions: {
    init() {
      this.handler ??= requestInstance.get<AxiosResponse<User | false>>("/me").then(({ data }) => {
        if (data.data && data.data.firstName) return data.data
        return false
      }).then((data) => {
        this.userInfo = data
        return data
      });

      return this.handler
    },
    setUserInfo(userInfo: User) {
      this.userInfo = userInfo
    },
    removeUserInfo() {
      this.userInfo = null
    }
  },
  getters: {
  }
})