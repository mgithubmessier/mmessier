import {
  Box,
  FormHelperText,
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
  SxProps,
  Theme,
} from '@mui/material';
import { Control, useController } from 'react-hook-form';

import { styles } from './styles';
import { CSSProperties } from 'react';

type TextFieldProps = MUITextFieldProps & {
  helperText?: string;
  containerSX?: SxProps<Theme>;
  containerStyle?: CSSProperties;
};

export const TextField = ({
  helperText,
  error,
  containerSX,
  containerStyle,
  sx,
  ...rest
}: TextFieldProps) => {
  return (
    <Box
      style={containerStyle}
      sx={{ ...styles.static?.container, ...containerSX }}
    >
      <MUITextField
        {...rest}
        error={error}
        sx={{
          input: { ...styles.static?.input },
          '.MuiInputBase-inputMultiline': { ...styles.static?.input },
          ...sx,
        }}
      />
      <FormHelperText error={error}>{helperText}</FormHelperText>
    </Box>
  );
};

type RHFTextFieldProps = TextFieldProps & {
  control: Control<any>;
  name: string;
};

export const RHFTextField = ({ control, name, ...rest }: RHFTextFieldProps) => {
  const { field, fieldState } = useController({ control, name });

  return (
    <TextField
      {...rest}
      onChange={field.onChange}
      error={Boolean(fieldState.error)}
      helperText={fieldState.error?.message}
      value={field.value}
    />
  );
};
