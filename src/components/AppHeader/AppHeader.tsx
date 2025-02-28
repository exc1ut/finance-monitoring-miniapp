import { useCallback, useState } from 'react';
import { IconChartBar, IconFilter, IconWallet } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Title } from '@mantine/core';
import { useTransactionsContext } from '../../contexts/TransactionsContext';
import { TransactionFilters } from '../../hooks/useTransactions';
import { FilterDrawer } from '../FilterDrawer/FilterDrawer';

export function AppHeader() {
  const [filterDrawerOpened, setFilterDrawerOpened] = useState(false);
  const { filters, setFilters, filterOptions } = useTransactionsContext();

  // Handle applying filters from the drawer
  const handleApplyFilters = useCallback(
    (newFilters: TransactionFilters) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  return (
    <>
      <Container size="xl" px="xs">
        <Group justify="space-between" h={60} wrap="nowrap">
          <Group>
            <IconWallet size={30} stroke={1.5} />
            <Title order={2} size="h4">
              Finance Tracker
            </Title>
          </Group>

          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              size="lg"
              radius="xl"
              aria-label="Filter"
              onClick={() => setFilterDrawerOpened(true)}
            >
              <IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" size="lg" radius="xl" aria-label="Analytics">
              <IconChartBar style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Container>

      <FilterDrawer
        opened={filterDrawerOpened}
        onClose={() => setFilterDrawerOpened(false)}
        initialFilters={filters}
        filterOptions={filterOptions}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}
