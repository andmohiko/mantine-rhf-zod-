import { Title } from '@mantine/core'

import { FlexBox } from '~/components/Base/FlexBox'
import { FileUploadForm } from '~/components/Forms/FileUploadForm'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const FileInputPage = () => {
  return (
    <DefaultLayout>
      <FlexBox px={16} gap={48} width={500} align="stretch">
        <Title order={1}>ファイルアップロード</Title>
        <FileUploadForm />
      </FlexBox>
    </DefaultLayout>
  )
}

export default FileInputPage
