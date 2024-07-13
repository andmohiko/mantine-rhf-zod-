import type { ChangeEvent, ChangeEventHandler, ReactNode } from 'react'
import { useState } from 'react'

import classNames from 'classnames'

import styles from './style.module.css'

import type { UseFormRegisterReturn } from 'react-hook-form'

export type InputTypes = 'text' | 'number'

export type TextInputProps = {
  type?: InputTypes
  name: string
  label: string
  placeholder: string
  defaultValue?: string
  invalid?: boolean
  errorMessage?: string
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onFocus?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  formRegister?: UseFormRegisterReturn
}

export const TextInput = ({
  type = 'text',
  placeholder,
  label,
  name,
  defaultValue = '',
  invalid = false,
  errorMessage,
  disabled,
  onChange,
  onFocus,
  formRegister,
}: TextInputProps): ReactNode => {
  const [localValue, setLocalValue] = useState(defaultValue)

  const inputClass = classNames(styles.input, {
    [styles._filled]: localValue,
    [styles._error]: invalid,
    [styles._disabled]: disabled,
  })

  const inputProps = {
    id: name,
    className: inputClass,
    type,
    'data-testid': 'text-input',
    placeholder,
    defaultValue,
    value: formRegister ? undefined : localValue,
    disabled,
    onFocus,
    ...formRegister,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      void formRegister?.onChange(e)
      setLocalValue(e.target.value)
      if (onChange) {
        onChange(e)
      }
    },
  }

  return (
    <div className={styles.textInput}>
      <div className={styles.inputArea}>
        <input {...inputProps} />
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      </div>
      {errorMessage && <span className={styles.message}>{errorMessage}</span>}
    </div>
  )
}
