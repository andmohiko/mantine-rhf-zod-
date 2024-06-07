import { Modal, UnstyledButton } from '@mantine/core'
import { IoMdArrowRoundBack } from "react-icons/io";

import styles from './style.module.scss'

import { BasicButton } from '~/components/Buttons/BasicButton';
import { IconButton } from '~/components/Buttons/IconButton'


type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  size?: '95%' | 'auto'
}

export const CropModal = ({
  children,
  isOpen,
  onClose,
  onSave,
  size = '95%',
}: Props): React.ReactNode => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size={size}
      closeOnEscape={false}
      overlayProps={{
        blur: 2,
        opacity: 0.9,
      }}
      classNames={{
        inner: styles.mantineModalInner,
        header: styles.mantineModalHeader,
      }}
    >
      <div className={styles.header}>
        <div className={styles.close}>
          <IconButton icon={<IoMdArrowRoundBack size={24} />} onClick={onClose} importance='tertiary' />
        </div>
        <p className={styles.title}>画像を編集</p>
        <div className={styles.action}>
          <BasicButton onClick={onSave}>
            <span className={styles.save}>適用</span>
          </BasicButton>
        </div>
      </div>
      <div className={styles.body}>{children}</div>
    </Modal>
  )
}
