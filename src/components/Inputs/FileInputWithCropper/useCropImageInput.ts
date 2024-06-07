import { useState, useCallback, useEffect } from 'react'

import { useDisclosure } from '@mantine/hooks'
import { type Crop } from 'react-image-crop'

export type FileWithPath = File & {
  path?: string
}

type FileUrl = string
export type FileObject = FileUrl

export const useCropImageInput = (
  file: FileObject | undefined,
  setFile: (file: FileObject | undefined) => void,
): [
  {
    file: FileObject | undefined
    objectUrl: string | undefined
    crop: Crop
  },
  {
    onSelectImage: (files: Array<File>) => void
    remove: () => void
    onChangeCrop: (crop: Crop) => void
    onCrop: () => void
    closeCropper: () => void
  },
  {
    isOpenCropper: boolean
    isDisabled: boolean
    isLoading: boolean
  },
] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isDisabled = Boolean(file)
  const [isOpen, handlers] = useDisclosure()
  const [fileData, setFileData] = useState<File | undefined>()
  const [objectUrl, setObjectUrl] = useState<string | undefined>()
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  })

  // canvasで画像を扱うため、アップロードした画像のObjectUrlをもとに、imgのHTMLElementを作る
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img: HTMLImageElement = document.createElement('img')
      img.src = src
      img.onload = () => resolve(img)
    })
  }

  // 切り取った画像のObjectUrlを作成し、ステイトに保存する
  const makeProfileImgObjectUrl = async () => {
    if (objectUrl) {
      const canvas = document.createElement('canvas')
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      ctx.beginPath()
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        2 * Math.PI,
        false,
      )
      ctx.clip()

      const img = await loadImage(objectUrl)
      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
      )

      canvas.toBlob((result) => {
        if (result instanceof Blob) {
          setFile(URL.createObjectURL(result))
        }
      })
    }
  }

  const onCrop = () => {
    setIsLoading(true)
    makeProfileImgObjectUrl()
    handlers.close()
    setIsLoading(false)
  }

  useEffect(() => {
    if (fileData instanceof File) {
      objectUrl && URL.revokeObjectURL(objectUrl)
      setObjectUrl(URL.createObjectURL(fileData))
      handlers.open()
    } else {
      setObjectUrl(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData])

  const remove = useCallback(() => {
    setFile(undefined)
  }, [setFile])

  const onSelectImage = useCallback((inputFiles: Array<FileWithPath>): void => {
    if (!inputFiles || inputFiles.length === 0) {
      return
    }
    const file = inputFiles[0]
    setFileData(file)
  }, [])

  return [
    {
      file,
      objectUrl,
      crop,
    },
    {
      onSelectImage,
      onChangeCrop: setCrop,
      remove,
      closeCropper: handlers.close,
      onCrop,
    },
    {
      isDisabled,
      isLoading,
      isOpenCropper: isOpen,
    },
  ]
}
