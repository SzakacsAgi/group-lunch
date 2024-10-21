'use client'

import axios from 'axios'
import { useRecoilState } from 'recoil'
import { uploadedImageTrash } from '../../utils/atoms'

const useFileOperations = () => {
  const [, setUploadedImageId] = useRecoilState(uploadedImageTrash)

  const uploadFile = async (fileToUpload: File) => {
    const form = new FormData()
    form.append('files', fileToUpload)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, form)
      setUploadedImageId(response.data[0].id)
      return response.data[0]
    } catch (error) {
      console.error(error)
    }
  }

  const deleteFile = async (fileId: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${fileId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    uploadFile,
    deleteFile,
  }
}

export { useFileOperations }
