import { useCallback } from 'react';
import { ResolverResult } from 'react-hook-form';
import * as yup from 'yup';

export const useYupResolver = (
  validationSchema: yup.ObjectSchema<object, yup.AnyObject, object, ''>
): ((data: object) => Promise<ResolverResult<any>>) =>
  useCallback(
    async (data: object) => {
      let result: ResolverResult<any> = {
        values: {},
        errors: {},
      };
      try {
        result.values = await validationSchema.validate(data, {
          abortEarly: false,
        });
      } catch (errors) {
        if (errors instanceof yup.ValidationError) {
          result = {
            values: {},
            errors: errors.inner.reduce((allErrors, currentError) => {
              if (currentError.path) {
                return {
                  ...allErrors,
                  [currentError.path]: {
                    type: currentError.type ?? 'validation',
                    message: currentError.message,
                  },
                };
              }
              return allErrors;
            }, {}),
          };
        }
      }
      return result;
    },
    [validationSchema]
  );
