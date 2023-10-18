'use client';

import { noop } from 'lodash';
import { createContext } from 'react';

export type QueryParameterContextType = {
  _addSubscriber: (subscriberID: string, subscriptionKey: string) => void;
  _removeSubscriber: (subscriberID: string, subscriptionKey: string) => void;
  _clear: (subscriptionKey: string) => void;
  _remove: (subscriptionKey: string, key: string) => void;
  _set: (subscriptionKey: string, key: string, value: any) => void;
  _get: (subscriptionKey: string) => void;
  _isInitializing: boolean;
};

export const QueryParameterContext = createContext<QueryParameterContextType>({
  _addSubscriber: noop,
  _clear: noop,
  _remove: noop,
  _removeSubscriber: noop,
  _set: noop,
  _get: noop,
  _isInitializing: true,
});
