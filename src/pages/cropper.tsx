import { Title } from '@mantine/core'

import { FlexBox } from '~/components/Base/FlexBox'
import { ImageCropForm } from '~/components/Forms/ImageCropForm'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const FileInputPage = () => {
  return (
    <DefaultLayout>
      <FlexBox px={16} gap={48} width={600} align="stretch">
        <Title order={1}>画像をアップロードして切り取る</Title>
        <ImageCropForm />
      </FlexBox>
    </DefaultLayout>
  )
}

export default FileInputPage
