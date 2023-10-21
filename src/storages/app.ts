import { Storage } from '@ionic/storage';

const appStorage = new Storage()
await appStorage.create()

export {
  appStorage
}