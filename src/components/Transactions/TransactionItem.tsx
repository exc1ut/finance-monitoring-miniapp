import { Badge, Group, Paper, Text, useMantineTheme } from '@mantine/core';
import { Transaction } from '../../types/transaction';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const theme = useMantineTheme();
  const { merchantName, category, amount, type, description } = transaction;

  const isIncome = type === 'income';
  // Use theme colors for consistency
  const textColor = isIncome ? theme.other.colors.incomeGreen : theme.other.colors.expenseRed;
  const badgeColor = isIncome ? 'teal' : 'pink';
  const amountPrefix = isIncome ? '+' : '-';

  return (
    <Paper p="md" mb="sm" radius="md" withBorder={false} shadow="xs">
      <Group justify="space-between" wrap="nowrap">
        <div style={{ flex: 1 }}>
          <Text fw={600} size="sm" mb={4}>
            {merchantName}
          </Text>
          <Group gap="xs" align="center">
            <Badge size="sm" variant="light" color={badgeColor} radius="sm">
              {category}
            </Badge>
            {description && (
              <Text size="xs" c="dimmed" lineClamp={1}>
                {description}
              </Text>
            )}
          </Group>
        </div>

        <Text fw={600} size="sm" style={{ color: textColor }}>
          {amountPrefix}${amount.toFixed(2)}
        </Text>
      </Group>
    </Paper>
  );
}
