import { useCallback, useEffect, useRef } from 'react';
import { Box, Button, Center, Container, Divider, Loader, Stack, Text } from '@mantine/core';
import { DailyTransactionGroup as DailyTransactionGroupComponent } from '../components/Transactions/DailyTransactionGroup';
import { TransactionSummary } from '../components/Transactions/TransactionSummary';
import { useTransactionsContext } from '../contexts/TransactionsContext';

export function TransactionsPage() {
  const { dailyGroups, summary, loading, error, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useTransactionsContext();

  // Reference to the sentinel element for infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null);

  // Callback for intersection observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        console.log('Intersection observed, fetching next page...');
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  // Set up the intersection observer
  useEffect(() => {
    const element = observerTarget.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      // Increase rootMargin to trigger earlier before the element is in view
      rootMargin: '0px 0px 300px 0px',
      // Reduce threshold to make it more sensitive
      threshold: 0.1,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  // Manual load more handler as a fallback
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle errors
  if (error) {
    return (
      <Container size="sm" px={{ base: 'xs', sm: 'md' }}>
        <Center mt="xl">
          <Text c="red">Error loading transactions: {error.message || 'Unknown error'}</Text>
        </Center>
      </Container>
    );
  }

  // Handle initial loading state
  if (loading && dailyGroups.length === 0) {
    return (
      <Container size="sm" px={{ base: 'xs', sm: 'md' }}>
        <Center mt="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <Container size="sm" px={{ base: 'xs', sm: 'md' }}>
      <Stack gap="xl" pt="xl">
        <TransactionSummary
          totalIncome={summary.totalIncome}
          totalOutcome={summary.totalOutcome}
          balance={summary.balance}
        />

        <Box>
          <Divider
            label={<Text fw={500}>Transaction History</Text>}
            labelPosition="center"
            mb="lg"
          />

          {dailyGroups.length > 0 ? (
            <>
              {dailyGroups.map((group) => (
                <DailyTransactionGroupComponent key={group.date.toISOString()} group={group} />
              ))}

              {/* Sentinel element for infinite scroll - positioned earlier in the list */}
              <div
                ref={observerTarget}
                style={{ height: '10px', margin: '20px 0' }}
                data-testid="scroll-sentinel"
              />

              {/* Loading indicator for next page */}
              {isFetchingNextPage && (
                <Center py="md">
                  <Loader size="sm" />
                </Center>
              )}

              {/* Manual load more button as fallback */}
              {hasNextPage && !isFetchingNextPage && (
                <Center py="md">
                  <Button variant="light" onClick={handleLoadMore} size="sm">
                    Load More Transactions
                  </Button>
                </Center>
              )}

              {/* Message when all transactions are loaded */}
              {!hasNextPage && dailyGroups.length > 0 && (
                <Text ta="center" c="dimmed" fz="sm" py="md">
                  All transactions loaded
                </Text>
              )}
            </>
          ) : (
            <Text ta="center" c="dimmed" fz="md" py="xl">
              No transactions found. Try adjusting your filters.
            </Text>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
