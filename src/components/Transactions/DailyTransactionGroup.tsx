import { Box, Card, Divider, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { DailyTransactionGroup as DailyTransactionGroupType } from '../../types/transaction';
import { formatDate } from '../../utils/transactionUtils';
import { TransactionItem } from './TransactionItem';

interface DailyTransactionGroupProps {
  group: DailyTransactionGroupType;
}

export function DailyTransactionGroup({ group }: DailyTransactionGroupProps) {
  const theme = useMantineTheme();
  const { date, transactions, totalOutcome, totalIncome } = group;
  const hasIncome = totalIncome > 0;

  return (
    <Card mb="xl" p={0} radius="md" withBorder>
      <Box p="md" style={{ backgroundColor: theme.other.dayHeaderBg }}>
        <Group justify="space-between">
          <Group gap="sm">
            <Text fw={600} size="sm">
              {formatDate(date)}
            </Text>
            {hasIncome && (
              <Text size="xs" c={theme.other.colors.incomeGreen} fw={500}>
                +${totalIncome.toFixed(2)} income
              </Text>
            )}
          </Group>
          <Text fw={600} c={theme.other.colors.expenseRed} size="sm">
            -${totalOutcome.toFixed(2)}
          </Text>
        </Group>
      </Box>

      <Divider />

      <Stack p="xs" gap="xs">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </Stack>
    </Card>
  );
}
