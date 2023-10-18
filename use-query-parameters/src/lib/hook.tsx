import { useContext, useEffect, useRef } from 'react';

import { v4 } from 'uuid';
import { QueryParameterContext } from './context';

export type QueryParameterHookSet = (key: string, value: object) => void;
export type QueryParameterHookRemove = (key: string) => void;
export type QueryParameterHookClear = () => void;

export type QueryParameterHook = {
  set: QueryParameterHookSet;
  remove: QueryParameterHookRemove;
  clear: QueryParameterHookClear;
  queryParameters: object;
};

/*
Any component in the app can use this hook to read from 
*/
// TODO - we may want to make subscription key something that cannot change or add the logic to detect when it changes and remove the old subscription key when it does
export const useQueryParameters = (
  subscriptionKey: string
): QueryParameterHook => {
  const subscriberID = useRef<string>(v4());
  const { _addSubscriber, _removeSubscriber, _set, _clear, _remove, _get } =
    useContext(QueryParameterContext);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _addSubscriber(subscriberID.current, subscriptionKey);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      _removeSubscriber(subscriberID.current, subscriptionKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionKey]);

  return {
    set: (key: string, value: object) => {
      _set(subscriptionKey, key, value);
    },
    clear: () => {
      _clear(subscriptionKey);
    },
    remove: (key: string) => {
      _remove(subscriptionKey, key);
    },
    queryParameters: _get(subscriptionKey),
  };
};
