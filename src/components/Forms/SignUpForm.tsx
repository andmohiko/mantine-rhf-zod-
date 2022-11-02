import { useState } from 'react'

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
import { useForm } from 'react-hook-form'

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm()
  const [birthday, setBirthday] = useState<Date | null>(new Date())
  const [gender, setGender] = useState<string | null>()

  const onSubmit = (data: any) => {
    console.log('submit', {
      ...data,
      birthday,
      gender
    })
  }

  return (
    <Stack
      spacing="xl"
      style={{
        width: '480px'
      }}
    >
      <Title order={1}>ログイン</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Stack spacing="md">
            <TextInput label="ユーザー名" {...register('username')} />
            <DatePicker
              label="生年月日"
              placeholder="日付を選択してください"
              value={birthday}
              onChange={setBirthday}
            />
            <Select
              label="性別"
              placeholder="ひとつ選んでください"
              data={[
                { value: 'female', label: '女性' },
                { value: 'male', label: '男性' },
                { value: 'unknown', label: 'その他' }
              ]}
              value={gender}
              onChange={setGender}
            />
            <TextInput
              label="メールアドレス"
              placeholder="email@example.com"
              {...register('email')}
            />
            <PasswordInput label="パスワード" {...register('password')} />
            <Checkbox label="利用規約に同意しました" />
          </Stack>

          <Text size="xs">
            <Link href="#">パスワードを忘れた場合はこちら</Link>
          </Text>

          <Button type="submit" loading={isSubmitting}>
            ログイン
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
