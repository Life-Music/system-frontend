import { Storage } from '@ionic/storage';

const appStorage = new Storage()
const isReady = async () => {
  if (!appStorage.driver)
    await appStorage.create()
}

export {
  appStorage,
  isReady,
}