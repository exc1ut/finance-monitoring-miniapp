import {
  Card,
  Center,
  Grid,
  Group,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';

interface TransactionSummaryProps {
  totalIncome: number;
  totalOutcome: number;
  balance: number;
}

export function TransactionSummary({
  totalIncome,
  totalOutcome,
  balance,
}: TransactionSummaryProps) {
  const theme = useMantineTheme();
  const incomeColor = theme.other.colors.incomeGreen;
  const expenseColor = theme.other.colors.expenseRed;

  const totalFlow = totalIncome + totalOutcome;
  const incomePercentage = totalFlow > 0 ? (totalIncome / totalFlow) * 100 : 0;
  const outcomePercentage = totalFlow > 0 ? (totalOutcome / totalFlow) * 100 : 0;

  return (
    <Card p="lg" radius="md" withBorder mb="xl" shadow="sm">
      <Stack>
        <Text size="lg" fw={600} ta="center" mb="md">
          Financial Summary
        </Text>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 5 }}>
            <Center>
              <RingProgress
                size={160}
                thickness={16}
                roundCaps
                sections={[
                  { value: incomePercentage, color: incomeColor },
                  { value: outcomePercentage, color: expenseColor },
                ]}
                label={
                  <Stack align="center" gap={0}>
                    <Text fw={700} size="xl" c={balance >= 0 ? incomeColor : expenseColor}>
                      ${Math.abs(balance).toFixed(2)}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {balance >= 0 ? 'Net Positive' : 'Net Negative'}
                    </Text>
                  </Stack>
                }
              />
            </Center>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 7 }}>
            <Stack gap="md" justify="center" h="100%">
              <Card p="md" radius="md" withBorder>
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text fw={500} size="sm" c="dimmed">
                      Income
                    </Text>
                    <Text fw={600} size="lg" c={incomeColor}>
                      +${totalIncome.toFixed(2)}
                    </Text>
                  </Stack>
                  <Text size="xs" c="dimmed" style={{ marginTop: 'auto' }}>
                    {incomePercentage.toFixed(0)}% of total
                  </Text>
                </Group>
              </Card>

              <Card p="md" radius="md" withBorder>
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text fw={500} size="sm" c="dimmed">
                      Expenses
                    </Text>
                    <Text fw={600} size="lg" c={expenseColor}>
                      -${totalOutcome.toFixed(2)}
                    </Text>
                  </Stack>
                  <Text size="xs" c="dimmed" style={{ marginTop: 'auto' }}>
                    {outcomePercentage.toFixed(0)}% of total
                  </Text>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
}
