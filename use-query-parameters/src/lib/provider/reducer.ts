import { get, isEmpty, set, omit } from 'lodash';

export enum QueryParameterActionTypes {
  ADD_SUBSCRIBER = 'ADD_SUBSCRIBER',
  REMOVE_SUBSCRIBER = 'REMOVE_SUBSCRIBER',
  SET_QUERY_PARAMETER = 'SET_QUERY_PARAMETER',
  REMOVE_QUERY_PARAMETER = 'REMOVE_QUERY_PARAMETER',
  CLEAR_QUERY_PARAMETERS = 'CLEAR_QUERY_PARAMETERS',
  INITIALIZE_QUERY_PARAEMETERS = 'INITIALIZE_QUERY_PARAEMETERS',
  FINISHED_MUTATING = 'FINISHED_MUTATING',
}

type QueryParameterAction =
  | {
      type:
        | QueryParameterActionTypes.ADD_SUBSCRIBER
        | QueryParameterActionTypes.REMOVE_SUBSCRIBER;
      payload: {
        subscriberID: string;
        subscriptionKey: string;
      };
    }
  | {
      type: QueryParameterActionTypes.SET_QUERY_PARAMETER;
      payload: {
        subscriptionKey: string;
        key: string;
        value: any;
      };
    }
  | {
      type: QueryParameterActionTypes.REMOVE_QUERY_PARAMETER;
      payload: {
        subscriptionKey: string;
        key: string;
      };
    }
  | {
      type: QueryParameterActionTypes.CLEAR_QUERY_PARAMETERS;
      payload: {
        subscriptionKey: string;
      };
    }
  | {
      type: QueryParameterActionTypes.INITIALIZE_QUERY_PARAEMETERS;
      payload: Subscriptions;
    }
  | {
      type: QueryParameterActionTypes.FINISHED_MUTATING;
    };

export type Subscription = {
  subscribers: Array<string>;
  queryParameters: {
    [key: string]: any;
  };
};

export type Subscriptions = {
  [subscriptionKey: string]: Subscription;
};

export type QueryParameterState = {
  subscriptions: Subscriptions;
  hasMutated: boolean;
  isInitializing: boolean;
};

export const reducer = (
  state: QueryParameterState,
  action: QueryParameterAction
): QueryParameterState => {
  const stateCopy: QueryParameterState = { ...state };

  switch (action.type) {
    case QueryParameterActionTypes.ADD_SUBSCRIBER: {
      const subcribersToAddTo = get(
        stateCopy,
        `subscriptions[${action.payload.subscriptionKey}].subscribers`,
        [] as string[]
      );
      set(
        stateCopy,
        `subscriptions[${action.payload.subscriptionKey}].subscribers`,
        [...subcribersToAddTo, action.payload.subscriberID]
      );
      return {
        ...stateCopy,
        hasMutated: true,
      };
    }
    case QueryParameterActionTypes.REMOVE_SUBSCRIBER: {
      const subscribersToRemoveFrom = get(
        stateCopy,
        `subscriptions[${action.payload.subscriptionKey}].subscribers`,
        [] as string[]
      );
      const indexToRemove = subscribersToRemoveFrom.indexOf(
        action.payload.subscriberID
      );
      if (indexToRemove > -1) {
        subscribersToRemoveFrom.splice(indexToRemove, 1);
      }
      return {
        ...stateCopy,
        hasMutated: true,
      };
    }
    case QueryParameterActionTypes.CLEAR_QUERY_PARAMETERS: {
      return omit(
        stateCopy,
        `subscriptions[${action.payload.subscriptionKey}]`
      );
    }
    case QueryParameterActionTypes.SET_QUERY_PARAMETER: {
      const queryParametersToAddTo = get(
        stateCopy,
        `subscriptions[${action.payload.subscriptionKey}].queryParameters`,
        {}
      );
      if (isEmpty(action.payload.value)) {
        return {
          ...omit(
            stateCopy,
            `subscriptions[${action.payload.subscriptionKey}]`
          ),
          hasMutated: true,
        };
      } else {
        set(
          stateCopy,
          `subscriptions[${action.payload.subscriptionKey}].queryParameters`,
          {
            ...queryParametersToAddTo,
            [action.payload.key]: action.payload.value,
          }
        );
      }

      return {
        ...stateCopy,
        hasMutated: true,
      };
    }
    case QueryParameterActionTypes.REMOVE_QUERY_PARAMETER: {
      const queryParametersToRemoveFrom = get(
        stateCopy,
        `subscriptions[${action.payload.subscriptionKey}].queryParameters`,
        {}
      );
      set(
        stateCopy,
        `subscriptions[${action.payload.subscriptionKey}].queryParameters`,
        omit(queryParametersToRemoveFrom, action.payload.key)
      );
      return {
        ...stateCopy,
        hasMutated: true,
      };
    }
    case QueryParameterActionTypes.INITIALIZE_QUERY_PARAEMETERS:
      Object.entries(action.payload).forEach(
        ([subscriptiptionKey, subscription]: [string, Subscription]) => {
          stateCopy.subscriptions[subscriptiptionKey] = {
            ...stateCopy.subscriptions[subscriptiptionKey],
            queryParameters: subscription.queryParameters,
          };
        }
      );
      return {
        ...stateCopy,
        hasMutated: true,
        isInitializing: false,
      };
    case QueryParameterActionTypes.FINISHED_MUTATING:
      return {
        ...stateCopy,
        hasMutated: false,
      };
    default:
      return state;
  }
};
