import {
  Button,
  Checkbox,
  PasswordInput,
  Stack,
  Select,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import Link from 'next/link'

export const SignUpForm = () => {
  return (
    <Stack
      spacing="xl"
      style={{
        width: '480px'
      }}
    >
      <Title order={1}>ログイン</Title>

      <form onSubmit={() => {}}>
        <Stack>
          <Stack spacing="md">
            <TextInput label="ユーザー名" placeholder="" />
            <DatePicker label="生年月日" />
            <Select
              label="性別"
              placeholder="ひとつ選んでください"
              data={[
                { value: 'female', label: '女性' },
                { value: 'male', label: '男性' },
                { value: 'unknown', label: 'その他' }
              ]}
            />
            <TextInput label="メールアドレス" placeholder="email@example.com" />
            <PasswordInput label="パスワード" />
            <Checkbox label="利用規約に同意しました" />
          </Stack>

          <Text size="xs">
            <Link href="#">パスワードを忘れた場合はこちら</Link>
          </Text>

          <Button type="submit">ログイン</Button>
        </Stack>
      </form>
    </Stack>
  )
}
