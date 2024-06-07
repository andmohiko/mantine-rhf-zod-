import { LoadingOverlay, Image, Box, CloseButton, Overlay } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
// eslint-disable-next-line import/no-named-as-default
import ReactCrop from 'react-image-crop'

import styles from './style.module.scss'
import { useCropImageInput, type FileObject } from './useCropImageInput'

import { FlexBox } from '~/components/Base/FlexBox'
import { ActionModal } from '~/components/Modals/ActionModal'

type Props = {
  defaultValue: FileObject
  setFile: (file: FileObject | undefined) => void
  error: string | undefined
}

export const FileInputWithCropper = ({
  defaultValue,
  setFile,
  error,
}: Props): React.ReactElement => {
  const [
    { file, uncroppedImageUrl, crop },
    { onSelectImage, remove, onCrop, onChangeCrop, closeCropper },
    { isOpenCropper, isDisabled, isLoading },
  ] = useCropImageInput(defaultValue, setFile)

  return (
    <div>
      {file ? (
        <ImagePreview file={file} onRemove={remove} />
      ) : (
        <>
          <Dropzone
            onDrop={onSelectImage}
            onReject={() => {
              notifications.show({
                title: 'ファイルのアップロードに失敗しました',
                message: '',
                icon: <BiErrorCircle />,
                withCloseButton: true,
                autoClose: 8000,
                color: 'red',
              })
            }}
            maxSize={100 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className={styles.dropzone}
            disabled={isDisabled || isLoading}
          >
            <FlexBox gap={16} justify="center">
              <Dropzone.Accept>
                <AiOutlineUpload color="#777" size={50} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <RxCross1 color="#777" size={50} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <MdOutlineAddPhotoAlternate color="#777" size={50} />
              </Dropzone.Idle>
              {isLoading && <LoadingOverlay visible />}
            </FlexBox>
            {isDisabled && <Overlay color="#fff" opacity={0.7} />}
          </Dropzone>

          {uncroppedImageUrl && (
            <ActionModal
              isOpen={isOpenCropper}
              onClose={closeCropper}
              onSave={onCrop}
              title="画像を編集"
            >
              <ReactCrop
                crop={crop}
                onChange={(c) => onChangeCrop(c)}
                aspect={1}
                circularCrop={true}
                keepSelection={true}
              >
                <img src={uncroppedImageUrl} alt="" style={{ width: '100%' }} />
              </ReactCrop>
            </ActionModal>
          )}
        </>
      )}
    </div>
  )
}

type ImagePreviewProps = {
  file: FileObject
  onRemove: () => void
}

export const ImagePreview = ({
  file,
  onRemove,
}: ImagePreviewProps): React.ReactElement => (
  <div className={styles.imagePreview}>
    <Image src={file} alt="" className={styles.image} />
    <CloseButton
      size="sm"
      variant="light"
      pos="absolute"
      top={-4}
      right={-4}
      color="gray"
      onClick={onRemove}
    />
  </div>
)
