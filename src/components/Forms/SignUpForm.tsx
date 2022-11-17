import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const SignUpSchema = z.object({
  username: z.string().min(1, { message: 'ユーザー名を入力してください' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上にしてください' })
})

type SignUpInputType = z.infer<typeof SignUpSchema>

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpInputType>({ resolver: zodResolver(SignUpSchema) })

  const [birthday, setBirthday] = useState<Date | null>()
  const [gender, setGender] = useState<string | null>()
  const [checked, setChecked] = useState<boolean>(false)

  const onSubmit: SubmitHandler<SignUpInputType> = (data) => {
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
      <Title order={1}>ユーザー登録</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Stack spacing="md">
            <TextInput
              label="ユーザー名"
              required
              error={errors.username?.message}
              {...register('username')}
            />
            <DatePicker
              label="生年月日"
              placeholder="日付を選択してください"
              required
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
              required
              value={gender}
              onChange={setGender}
            />
            <TextInput
              label="メールアドレス"
              placeholder="email@example.com"
              required
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              label="パスワード"
              required
              error={errors.password?.message}
              {...register('password')}
            />
            <Checkbox
              label="利用規約に同意しました"
              required
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          </Stack>

          <Text size="xs">
            <Link href="#">パスワードを忘れた場合はこちら</Link>
          </Text>

          <Button type="submit" disabled={!checked} loading={isSubmitting}>
            登録する
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
