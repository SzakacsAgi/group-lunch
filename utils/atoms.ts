import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const uploadedImageTrash = atom({
  key: 'uploadedImageTrash',
  default: '',
  effects_UNSTABLE: [persistAtom],
})
