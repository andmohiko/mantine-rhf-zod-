import { useCallback, useState } from 'react'

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
  maxFiles: number,
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
  const disabled = files.length >= maxFiles

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.slice()
      newFiles.splice(index, 1)
      setFiles(newFiles)
    },
    [files, setFiles],
  )

  const onChange = useCallback(
    async (inputFiles: Array<File>) => {
      if (!inputFiles || inputFiles.length === 0) {
        return ''
      }

      try {
        setLoading(true)
        const newFiles: Array<FileObject> = []
        for (let i = 0; i < inputFiles.length; i++) {
          const file = inputFiles[i]
          const reader = new FileReader()
          reader.readAsDataURL(file)
          await new Promise<void>(
            (resolve) =>
              (reader.onloadend = () => {
                const { result } = reader as { result: string }
                if (result.startsWith('data:image/')) {
                  newFiles.push({
                    file_base64: result,
                    file_name: file.name,
                    object_url: URL.createObjectURL(file),
                  })
                }
                resolve()
              }),
          )
        }
        setFiles([...files, ...newFiles])
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
    },
    [files, setFiles],
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
