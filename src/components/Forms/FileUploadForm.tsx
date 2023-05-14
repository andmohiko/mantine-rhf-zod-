import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { z } from 'zod'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { FileInput } from '~/components/Inputs/FileInput'

const FileUploadSchema = z.object({
  files: z.array(
    z.object({
      file_name: z.string(),
      file_base64: z.string(),
      object_url: z.string(),
    }),
  ),
})

type FileUploadInputType = z.infer<typeof FileUploadSchema>

export const FileUploadForm = (): React.ReactElement => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FileUploadInputType>({
    resolver: zodResolver(FileUploadSchema),
    mode: 'all',
    defaultValues: {
      files: [],
    },
  })

  const onSubmit: SubmitHandler<FileUploadInputType> = (data) => {
    console.log('submit', {
      ...data,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexBox gap={40}>
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <FileInput
              defaultValue={field.value}
              setFiles={field.onChange}
              error={errors.files?.message}
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
