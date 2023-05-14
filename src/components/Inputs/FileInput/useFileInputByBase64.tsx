import { useState } from 'react'

import { notifications } from '@mantine/notifications'
import { BiErrorCircle } from 'react-icons/bi'

export type FileObject = {
  file_base64: string
  file_name: string
  object_url: string
}

export const useFileInput = (
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

  const addFile = (file: FileObject) => {
    setFiles([...files.slice(), file])
  }

  const removeFile = (index: number) => {
    const newFiles = files.slice()
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const onChange = (files: Array<File>) => {
    if (!files || files.length === 0) {
      return ''
    }

    const file = files[0]
    try {
      setLoading(true)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const { result } = reader as { result: string }
        if (
          result.startsWith('data:image/') ||
          result.startsWith('data:video/mp4')
        ) {
          addFile({
            file_base64: result,
            file_name: file.name,
            object_url: URL.createObjectURL(file),
          })
        }
      }
    } catch {
      notifications.show({
        title: 'ファイルのアップロードに失敗しました',
        message: '',
        icon: <BiErrorCircle />,
        withCloseButton: true,
        autoClose: 8000,
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

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
