module.exports = {
  'finance-tracker': {
    input: 'https://expensebot.set.uz/api/v1/openapi.json',
    output: {
      mode: 'tags-split',
      target: 'src/api/finance-tracker',
      schemas: 'src/api/finance-tracker/entities',
      client: 'react-query',
      override: {
        query: {
          useSuspenseQuery: true,
          useMutation: true,
          useInfiniteQuery: true,
          options: {
            staleTime: 10000,
          },
        },
        mutator: {
          path: 'src/api/axios-instance.ts',
          name: 'customInstance',
        },
      },
    },
  },
};
