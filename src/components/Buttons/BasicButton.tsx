import { Button, DefaultMantineColor } from '@mantine/core';

import { ButtonImportance, getButtonVariant } from '~/components/Buttons/types';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  color?: DefaultMantineColor;
  importance?: ButtonImportance;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit';
};

export const BasicButton = ({
  children,
  onClick,
  importance = 'primary',
  color = 'blue',
  disabled = false,
  loading = false,
  type = 'button',
}: Props): React.ReactElement => (
  <Button
    color={color}
    onClick={onClick}
    variant={getButtonVariant(importance)}
    disabled={disabled}
    loading={loading}
    type={type}
  >
    {children}
  </Button>
);
