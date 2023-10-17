import { flatten, unflatten } from 'flat';
import { isEmpty, omitBy } from 'lodash';
import queryString from 'query-string';
import React, { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { QueryParameterContext } from '../context';
import { reducer } from './reducer';

enum QueryParameterActionTypes {
  ADD_SUBSCRIBER = 'ADD_SUBSCRIBER',
  REMOVE_SUBSCRIBER = 'REMOVE_SUBSCRIBER',
  SET_QUERY_PARAMETER = 'SET_QUERY_PARAMETER',
  REMOVE_QUERY_PARAMETER = 'REMOVE_QUERY_PARAMETER',
  CLEAR_QUERY_PARAMETERS = 'CLEAR_QUERY_PARAMETERS',
  INITIALIZE_QUERY_PARAEMETERS = 'INITIALIZE_QUERY_PARAEMETERS',
  FINISHED_MUTATING = 'FINISHED_MUTATING',
}

type InitialQueryParameters = {
  [subscriberKey: string]: {
    [key: string]: any;
  };
};

type Subscription = {
  subscribers: Array<string>;
  queryParameters: {
    [key: string]: any;
  };
};

type Subscriptions = {
  [subscriptionKey: string]: Subscription;
};

type QueryParameterState = {
  subscriptions: Subscriptions;
  hasMutated: boolean;
  isInitializing: boolean;
};

const INITIAL_STATE: QueryParameterState = {
  subscriptions: {},
  hasMutated: false,
  isInitializing: true,
};

const _getActiveSubscriptions = (state: QueryParameterState): Subscriptions => {
  return omitBy(state.subscriptions, (subscription: Subscription) => {
    return (
      subscription.subscribers?.length === 0 ||
      isEmpty(subscription.queryParameters)
    );
  });
};
const _mapSubscriptionsToQueryParams = (
  subscriptions: Subscriptions
): object => {
  return Object.entries(subscriptions).reduce(
    (
      acc: object,
      [subscriptionKey, subscription]: [string, Subscription]
    ): object => {
      return {
        ...acc,
        [subscriptionKey]: subscription.queryParameters,
      };
    },
    {}
  );
};

export const QueryParameterProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const location = useLocation();
  useEffect(() => {
    const parsedQuery = unflatten(
      queryString.parse(location.search)
    ) as InitialQueryParameters;
    const payload = Object.entries(parsedQuery).reduce(
      (
        acc: Subscriptions,
        [subscriptionKey, value]: [string, any]
      ): Subscriptions => {
        if (value) {
          return {
            ...acc,
            [subscriptionKey]: {
              queryParameters: value,
              subscribers: [],
            },
          };
        }
        return acc;
      },
      {} as Subscriptions
    );
    dispatch({
      type: QueryParameterActionTypes.INITIALIZE_QUERY_PARAEMETERS,
      payload,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const activeSubscriptions = _getActiveSubscriptions(state);

  useEffect(() => {
    if (state.hasMutated && !state.isInitializing) {
      const flattened = flatten(
        _mapSubscriptionsToQueryParams(activeSubscriptions)
      ) as object;

      navigate(
        `${location.pathname}?${queryString.stringify(flattened, {
          encode: true,
        })}`,
        {
          replace: true,
        }
      );
      dispatch({ type: QueryParameterActionTypes.FINISHED_MUTATING });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.hasMutated, state.isInitializing]);

  return (
    <QueryParameterContext.Provider
      value={{
        _isInitializing: state.isInitializing,
        _addSubscriber: (subscriberID: string, subscriptionKey: string) => {
          dispatch({
            type: QueryParameterActionTypes.ADD_SUBSCRIBER,
            payload: {
              subscriberID: subscriberID,
              subscriptionKey,
            },
          });
        },
        _removeSubscriber: (subscriberID: string, subscriptionKey: string) => {
          dispatch({
            type: QueryParameterActionTypes.REMOVE_SUBSCRIBER,
            payload: {
              subscriberID: subscriberID,
              subscriptionKey,
            },
          });
        },
        _clear: (subscriptionKey: string) => {
          dispatch({
            type: QueryParameterActionTypes.CLEAR_QUERY_PARAMETERS,
            payload: {
              subscriptionKey,
            },
          });
        },
        _remove: (subscriptionKey: string, key: string) => {
          dispatch({
            type: QueryParameterActionTypes.REMOVE_QUERY_PARAMETER,
            payload: {
              subscriptionKey,
              key,
            },
          });
        },
        _set: (subscriptionKey: string, key: string, value: any) => {
          dispatch({
            type: QueryParameterActionTypes.SET_QUERY_PARAMETER,
            payload: {
              subscriptionKey,
              key,
              value,
            },
          });
        },
        _get: (subscriptionKey: string): any => {
          return state.subscriptions[subscriptionKey]?.queryParameters;
        },
      }}
    >
      {state.isInitializing ? null : children}
    </QueryParameterContext.Provider>
  );
};
