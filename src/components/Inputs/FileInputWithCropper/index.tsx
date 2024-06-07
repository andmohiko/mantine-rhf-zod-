import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { LoadingOverlay, Image, Box, CloseButton, Overlay } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import ReactCrop from "react-image-crop";
import { Crop } from "react-image-crop/dist/types";

import styles from './style.module.scss'
import { useFileInput, FileObject } from './useFileInputByBase64'

import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  defaultValue: Array<FileObject>
  setFiles: (files: Array<FileObject>) => void
  maxFiles?: number
  error: string | undefined
}

export const FileInputWithCropper = ({
  defaultValue,
  setFiles,
  maxFiles = 1,
  error,
}: Props): React.ReactElement => {
  // const [files, handlers, states] = useFileInput(
  //   defaultValue,
  //   setFiles,
  //   maxFiles,
  // )

  const [fileData, setFileData] = useState<File | undefined>();
  const [objectUrl, setObjectUrl] = useState<string | undefined>();

  //プロフィールイメージ
  const [profileImg, setProfileImg] = useState<string>("");

  //Crop
  const [crop, setCrop] = useState<Crop>({
    unit: "px", // 'px' または '%' にすることができます
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });

  useEffect(() => {
    if (fileData instanceof File) {
      objectUrl && URL.revokeObjectURL(objectUrl);
      setObjectUrl(URL.createObjectURL(fileData));
    } else {
      setObjectUrl(undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileData]);

  // canvasで画像を扱うため
  // アップロードした画像のObjectUrlをもとに、imgのHTMLElementを作る
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      // const img: HTMLImageElement = new Image() as HTMLImageElement
      const img: HTMLImageElement = document.createElement("img");
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  //切り取った画像のObjectUrlを作成し、ステイトに保存する
  const makeProfileImgObjectUrl = async () => {
    if (objectUrl) {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        2 * Math.PI,
        false
      );
      ctx.clip();

      const img = await loadImage(objectUrl);
      console.log(img.width, img.naturalWidth);
      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((result) => {
        if (result instanceof Blob) setProfileImg(URL.createObjectURL(result));
      });
    }
  };


  return (
    <div>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          makeProfileImgObjectUrl();
        }}
      >
        {/* <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            e.target.files && setFileData(e.target.files[0]);
          }}
        /> */}
        <Dropzone
          // onDrop={handlers.add}
          onDrop={(fileWithPath) => setFileData(fileWithPath[0])}
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
          multiple
          className={styles.dropzone}
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
            <span className={styles.label}>
              クリックしてファイルを選択、
              <br />
              もしくはドラッグ＆ドロップしてください
            </span>
          </FlexBox>
        </Dropzone>
        <button>切り取り</button>
      </form>
      <div>
        {objectUrl && (
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={1}
            circularCrop={true}
            keepSelection={true}
          >
            <img src={objectUrl} alt="" style={{ width: "100%" }} />
          </ReactCrop>
        )}
      </div>
      <div>
        {profileImg ? <img src={profileImg} alt="プロフィール画像" /> : ""}
      </div>
    </div>
  )
}

type ImagePreviewProps = {
  file: FileObject
  index: number
  onRemove: (index: number) => void
}

export const ImagePreview = ({
  file,
  index,
  onRemove,
}: ImagePreviewProps): React.ReactElement => (
  <Box pos="relative">
    <Image src={file.object_url} alt={file.file_name} />
    <CloseButton
      size="sm"
      variant="light"
      pos="absolute"
      top={4}
      right={4}
      color="gray"
      onClick={() => onRemove(index)}
    />
  </Box>
)
