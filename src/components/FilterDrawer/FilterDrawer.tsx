import { useEffect, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Drawer,
  Group,
  MultiSelect,
  SegmentedControl,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { defaultFilters, TransactionFilters } from '../../hooks/useTransactions';

interface FilterDrawerProps {
  opened: boolean;
  onClose: () => void;
  initialFilters: TransactionFilters;
  filterOptions: {
    categories: { value: string; label: string }[];
    merchants: { value: string; label: string }[];
    cards: { value: string; label: string }[];
  };
  onApplyFilters: (filters: TransactionFilters) => void;
}

export function FilterDrawer({
  opened,
  onClose,
  initialFilters = defaultFilters,
  filterOptions = { categories: [], merchants: [], cards: [] },
  onApplyFilters,
}: FilterDrawerProps) {
  // Local state for filter values
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(initialFilters.dateRange);
  const [quickFilter, setQuickFilter] = useState<string>(initialFilters.quickFilter);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories);
  const [selectedCards, setSelectedCards] = useState<string[]>(initialFilters.cards);
  const [merchantSearch, setMerchantSearch] = useState('');
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>(initialFilters.merchants);
  const [transactionType, setTransactionType] = useState(initialFilters.transactionType);

  // Update local state when initialFilters change
  useEffect(() => {
    setDateRange(initialFilters.dateRange);
    setQuickFilter(initialFilters.quickFilter);
    setSelectedCategories(initialFilters.categories);
    setSelectedCards(initialFilters.cards);
    setSelectedMerchants(initialFilters.merchants);
    setTransactionType(initialFilters.transactionType);
  }, [initialFilters]);

  // Handle filter reset
  const handleReset = () => {
    setDateRange([null, null]);
    setQuickFilter('month');
    setSelectedCategories([]);
    setSelectedCards([]);
    setMerchantSearch('');
    setSelectedMerchants([]);
    setTransactionType('all');
  };

  // Handle filter apply
  const handleApply = () => {
    const newFilters: TransactionFilters = {
      dateRange,
      quickFilter,
      categories: selectedCategories,
      cards: selectedCards,
      merchants: selectedMerchants,
      amountRange: [null, null], // Not implemented in UI yet
      transactionType,
    };

    onApplyFilters(newFilters);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="85%"
      title={
        <Group justify="space-between" style={{ width: '100%' }}>
          <Title order={3}>Filters</Title>
          <ActionIcon onClick={onClose} variant="subtle" color="gray">
            <IconX size={18} />
          </ActionIcon>
        </Group>
      }
      styles={{
        body: {
          padding: '0 16px 16px',
        },
      }}
    >
      <Stack gap="md">
        {/* Date Range filter */}
        <Box>
          <Title order={5} mb="xs">
            Date Range
          </Title>
          <DatePickerInput
            type="range"
            placeholder="Pick dates range"
            value={dateRange}
            onChange={setDateRange}
            clearable
            mb="sm"
          />
        </Box>

        {/* Quick filters */}
        <Box>
          <Title order={5} mb="xs">
            Quick Filter
          </Title>
          <SegmentedControl
            value={quickFilter}
            onChange={setQuickFilter}
            data={[
              { label: 'Today', value: 'today' },
              { label: 'This Week', value: 'week' },
              { label: 'This Month', value: 'month' },
              { label: 'This Year', value: 'year' },
              { label: 'All', value: 'all' },
            ]}
            fullWidth
          />
        </Box>

        {/* Category filter */}
        <Box>
          <Title order={5} mb="xs">
            Categories
          </Title>
          <MultiSelect
            data={filterOptions.categories}
            placeholder="Select categories"
            value={selectedCategories}
            onChange={setSelectedCategories}
            searchable
            clearable
          />
        </Box>

        {/* Payment methods / Cards */}
        <Box>
          <Title order={5} mb="xs">
            Payment Methods
          </Title>
          <MultiSelect
            data={filterOptions.cards}
            placeholder="Select payment methods"
            value={selectedCards}
            onChange={setSelectedCards}
            searchable
            clearable
          />
        </Box>

        {/* Merchant search */}
        <Box>
          <Title order={5} mb="xs">
            Merchants
          </Title>
          <TextInput
            placeholder="Search merchants"
            value={merchantSearch}
            onChange={(e) => setMerchantSearch(e.target.value)}
            mb="xs"
          />
          <MultiSelect
            data={filterOptions.merchants.filter((m) =>
              m.label.toLowerCase().includes(merchantSearch.toLowerCase())
            )}
            placeholder="Select merchants"
            value={selectedMerchants}
            onChange={setSelectedMerchants}
            searchable
            clearable
          />
        </Box>

        {/* Transaction type filter */}
        <Box>
          <Title order={5} mb="xs">
            Transaction Type
          </Title>
          <SegmentedControl
            value={transactionType}
            onChange={(value) => setTransactionType(value as 'all' | 'income' | 'outcome')}
            data={[
              { label: 'All', value: 'all' },
              { label: 'Income', value: 'income' },
              { label: 'Expenses', value: 'outcome' },
            ]}
            fullWidth
          />
        </Box>

        <Divider my="md" />

        {/* Action buttons */}
        <Group justify="space-between">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </Group>
      </Stack>
    </Drawer>
  );
}
