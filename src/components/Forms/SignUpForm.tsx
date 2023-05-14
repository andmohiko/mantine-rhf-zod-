import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  NativeSelect,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import Link from 'next/link'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'

const SignUpSchema = z.object({
  birthday: z.date(),
  email: z.string().email(),
  gender: z.string(),
  password: z
    .string()
    .min(8, { message: 'パスワードは8文字以上にしてください' }),
  username: z.string().min(1, { message: 'ユーザー名を入力してください' }),
})

type SignUpInputType = z.infer<typeof SignUpSchema>

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputType>({
    resolver: zodResolver(SignUpSchema),
    mode: 'all',
  })

  const [checked, setChecked] = useState<boolean>(false)

  const onSubmit: SubmitHandler<SignUpInputType> = (data) => {
    console.log('submit', {
      ...data,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Stack spacing="md">
          <TextInput
            label="ユーザー名"
            required
            error={errors.username?.message}
            {...register('username')}
          />
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label="生年月日"
                placeholder="日付を選択してください"
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <NativeSelect
                label="性別"
                placeholder="ひとつ選んでください"
                data={[
                  { value: 'female', label: '女性' },
                  { value: 'male', label: '男性' },
                  { value: 'unknown', label: 'その他' },
                ]}
                required
                value={field.value}
                onChange={field.onChange}
              />
            )}
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
  )
}
