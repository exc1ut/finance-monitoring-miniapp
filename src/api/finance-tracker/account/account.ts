/**
 * Generated by orval v7.6.0 🍺
 * Do not edit manually.
 * My Expenses
 * OpenAPI spec version: 1.0
 */
import {
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query';
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query';

import type {
  AppApiAccountAccountListChildrenParams,
  AppApiAccountAccountListParams,
  PagedAccountListSchemaOut
} from '.././entities';

import { customInstance } from '../../axios-instance';
import type { ErrorType } from '../../axios-instance';


type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];



/**
 * @summary Account List
 */
export const appApiAccountAccountList = (
    params?: AppApiAccountAccountListParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PagedAccountListSchemaOut>(
      {url: `/api/v1/account/list`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getAppApiAccountAccountListQueryKey = (params?: AppApiAccountAccountListParams,) => {
    return [`/api/v1/account/list`, ...(params ? [params]: [])] as const;
    }

    
export const getAppApiAccountAccountListQueryOptions = <TData = Awaited<ReturnType<typeof appApiAccountAccountList>>, TError = ErrorType<unknown>>(params?: AppApiAccountAccountListParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountList>>, TError, TData>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAppApiAccountAccountListQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof appApiAccountAccountList>>> = ({ signal }) => appApiAccountAccountList(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountList>>, TError, TData> & { queryKey: QueryKey }
}

export type AppApiAccountAccountListQueryResult = NonNullable<Awaited<ReturnType<typeof appApiAccountAccountList>>>
export type AppApiAccountAccountListQueryError = ErrorType<unknown>


/**
 * @summary Account List
 */

export function useAppApiAccountAccountList<TData = Awaited<ReturnType<typeof appApiAccountAccountList>>, TError = ErrorType<unknown>>(
 params?: AppApiAccountAccountListParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountList>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getAppApiAccountAccountListQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getAppApiAccountAccountListSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof appApiAccountAccountList>>, TError = ErrorType<unknown>>(params?: AppApiAccountAccountListParams, options?: { query?:UseSuspenseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountList>>, TError, TData>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAppApiAccountAccountListQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof appApiAccountAccountList>>> = ({ signal }) => appApiAccountAccountList(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountList>>, TError, TData> & { queryKey: QueryKey }
}

export type AppApiAccountAccountListSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof appApiAccountAccountList>>>
export type AppApiAccountAccountListSuspenseQueryError = ErrorType<unknown>


/**
 * @summary Account List
 */

export function useAppApiAccountAccountListSuspense<TData = Awaited<ReturnType<typeof appApiAccountAccountList>>, TError = ErrorType<unknown>>(
 params?: AppApiAccountAccountListParams, options?: { query?:UseSuspenseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountList>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getAppApiAccountAccountListSuspenseQueryOptions(params,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * @summary Account List Children
 */
export const appApiAccountAccountListChildren = (
    params?: AppApiAccountAccountListChildrenParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<PagedAccountListSchemaOut>(
      {url: `/api/v1/account/list-children`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getAppApiAccountAccountListChildrenQueryKey = (params?: AppApiAccountAccountListChildrenParams,) => {
    return [`/api/v1/account/list-children`, ...(params ? [params]: [])] as const;
    }

    
export const getAppApiAccountAccountListChildrenQueryOptions = <TData = Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError = ErrorType<unknown>>(params?: AppApiAccountAccountListChildrenParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError, TData>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAppApiAccountAccountListChildrenQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>> = ({ signal }) => appApiAccountAccountListChildren(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError, TData> & { queryKey: QueryKey }
}

export type AppApiAccountAccountListChildrenQueryResult = NonNullable<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>>
export type AppApiAccountAccountListChildrenQueryError = ErrorType<unknown>


/**
 * @summary Account List Children
 */

export function useAppApiAccountAccountListChildren<TData = Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError = ErrorType<unknown>>(
 params?: AppApiAccountAccountListChildrenParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getAppApiAccountAccountListChildrenQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getAppApiAccountAccountListChildrenSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError = ErrorType<unknown>>(params?: AppApiAccountAccountListChildrenParams, options?: { query?:UseSuspenseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError, TData>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getAppApiAccountAccountListChildrenQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>> = ({ signal }) => appApiAccountAccountListChildren(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn,   staleTime: 10000,  ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError, TData> & { queryKey: QueryKey }
}

export type AppApiAccountAccountListChildrenSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>>
export type AppApiAccountAccountListChildrenSuspenseQueryError = ErrorType<unknown>


/**
 * @summary Account List Children
 */

export function useAppApiAccountAccountListChildrenSuspense<TData = Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError = ErrorType<unknown>>(
 params?: AppApiAccountAccountListChildrenParams, options?: { query?:UseSuspenseQueryOptions<Awaited<ReturnType<typeof appApiAccountAccountListChildren>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey } {

  const queryOptions = getAppApiAccountAccountListChildrenSuspenseQueryOptions(params,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



