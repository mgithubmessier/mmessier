import React, { CSSProperties } from 'react';
import { useController, Control } from 'react-hook-form';
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectProps,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';
import { uniqueId } from 'lodash';

import { styles as selectFieldStyles } from './styles';
import { useStyles } from '../../../hooks/useStyles';

type Option = {
  label: string;
  value: any;
};

type SelectFieldProps = SelectProps & {
  name: string;
  label?: string;
  control: Control<any>;
  options: Option[];
  containerStyle?: CSSProperties;
  isBoolean?: boolean;
  helperText?: string;
  transform?: {
    optionToValue: (values: Array<any> | any) => any;
    valueToOption: (value: SelectChangeEvent<any>) => Array<any> | any;
  };
};

export const RHFSelectField: React.FC<SelectFieldProps> = ({
  label,
  control,
  name,
  options,
  containerStyle,
  isBoolean,
  transform,
  helperText,
  multiple,
  ...props
}) => {
  const { fieldState, field } = useController({ name, control });
  const styles = useStyles(selectFieldStyles);

  return (
    <FormControl style={containerStyle}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select
        onChange={(change) => {
          field.onChange(transform?.valueToOption(change) || change);
        }}
        value={
          transform?.optionToValue(isBoolean ? field.value : field.value) ||
          field.value ||
          ''
        }
        name={name}
        error={Boolean(fieldState.error)}
        label={label}
        multiple={multiple}
        sx={styles.sx?.selectField}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            value={option.value}
            key={uniqueId()}
            sx={styles.sx?.selectField}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {fieldState.error?.message ? (
        <FormHelperText error sx={styles.sx?.errorText}>
          {fieldState.error.message}
        </FormHelperText>
      ) : null}
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};
