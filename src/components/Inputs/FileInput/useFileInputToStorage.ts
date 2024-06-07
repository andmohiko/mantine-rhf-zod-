import { useState, useCallback } from 'react'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

import type { FileWithPath } from '@mantine/dropzone'

import { storage } from '~/lib/firebase'

type FileUrl = string
export type FileObject = FileUrl

export const useFileInput = (
  storagePath: string,
  files: Array<FileObject>,
  setFiles: (files: Array<FileObject>) => void,
  max: number,
): [
  Array<FileObject>,
  {
    add: (files: Array<File>) => void
    remove: (index: number) => void
  },
  {
    disabled: boolean
    loading: boolean
  },
] => {
  const [loading, setLoading] = useState<boolean>(false)
  const disabled = files.length >= max

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.slice()
      newFiles.splice(index, 1)
      setFiles(newFiles)
    },
    [files, setFiles],
  )

  const onChange = useCallback(
    async (inputFiles: Array<FileWithPath>): Promise<string> => {
      if (!inputFiles || inputFiles.length === 0) {
        return ''
      }

      try {
        setLoading(true)
        const newFiles: Array<FileObject> = []
        for (let i = 0; i < inputFiles.length; i++) {
          const file = inputFiles[i]
          const filename = uuid()
          const fileURL = await uploadImage(`${storagePath}/${filename}`, file)
          newFiles.concat(fileURL)
        }
        setFiles([...files, ...newFiles])
      } catch {
        console.log('error upload file')
      } finally {
        setLoading(false)
      }
      return ''
    },
    [files, setFiles, storagePath],
  )

  return [
    files,
    {
      add: onChange,
      remove: removeFile,
    },
    {
      disabled,
      loading,
    },
  ]
}

const uploadImage = async (path: string, blob: Blob): Promise<string> => {
  const imageRef = ref(storage, path)
  const snapShot = await uploadBytesResumable(imageRef, blob)
  return getDownloadURL(snapShot.ref)
}
