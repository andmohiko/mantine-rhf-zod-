import { Title } from '@mantine/core'

import { FlexBox } from '~/components/Base/FlexBox'
import { SignUpForm } from '~/components/Forms/SignUpForm'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const SignUpPage = () => {
  return (
    <DefaultLayout>
      <FlexBox width={500} gap={40} align="stretch">
        <Title order={1}>ユーザー登録</Title>
        <SignUpForm />
      </FlexBox>
    </DefaultLayout>
  )
}

export default SignUpPage
