import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { FileInputWithCropper } from '~/components/Inputs/FileInputWithCropper'

const FileUploadSchema = z.object({
  file: z.string().min(1, 'ファイルを選択してください'),
})

type FileUploadInputType = z.infer<typeof FileUploadSchema>

export const ImageCropForm = (): React.ReactNode => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FileUploadInputType>({
    resolver: zodResolver(FileUploadSchema),
    mode: 'all',
    defaultValues: {
      file: undefined,
    },
  })

  const onSubmit = (data: FileUploadInputType) => {
    console.log('submit', {
      ...data,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexBox gap={40} align="stretch">
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <FileInputWithCropper
              defaultValue={field.value}
              setFile={field.onChange}
              error={errors.file?.message}
            />
          )}
        />
        <BasicButton type="submit" loading={isSubmitting} disabled={!isValid}>
          保存する
        </BasicButton>
      </FlexBox>
    </form>
  )
}
