import { ActionIcon } from '@mantine/core';

import { ButtonImportance, getButtonVariant } from '~/components/Buttons/types';

type Props = {
  icon: React.ReactNode;
  onClick?: () => void;
  importance?: ButtonImportance;
  disabled?: boolean;
  loading?: boolean;
};

export const IconButton = ({
  icon,
  onClick,
  importance = 'primary',
  disabled = false,
  loading = false,
}: Props): React.ReactElement => (
  <ActionIcon
    onClick={onClick}
    variant={getButtonVariant(importance)}
    disabled={disabled}
    loading={loading}
  >
    {icon}
  </ActionIcon>
);
