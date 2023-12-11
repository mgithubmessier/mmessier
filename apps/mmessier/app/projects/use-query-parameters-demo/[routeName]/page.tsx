'use client';
import { useQueryParameters } from '@mmessier/use-query-parameters';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { basicStyles } from './style';

type UseQueryParametersDemoRouteProps = {
  params: {
    routeName: string;
  };
};

type QueryParams = {
  param1: string;
  param2: Array<string>;
};

export const UseQueryParameterDemoRoute = ({
  params,
}: UseQueryParametersDemoRouteProps) => {
  const { queryParameters, set } = useQueryParameters<QueryParams>(
    params.routeName
  );

  const param1 = queryParameters?.param1 || '';
  const param2 = queryParameters?.param2 || [];

  return (
    <div style={basicStyles.static?.container}>
      <Typography variant="h2">Demo Form</Typography>
      <Typography variant="h3">Current route: {params.routeName}</Typography>
      <TextField
        variant="filled"
        value={param1}
        onChange={(event) => {
          set('param1', event.target.value);
        }}
        label="Write any string"
      />

      <FormControl style={basicStyles.static?.selectContainer}>
        <InputLabel style={{ color: 'white' }}>Select some options</InputLabel>
        <Select
          multiple
          variant="filled"
          style={basicStyles.static?.select}
          value={queryParameters?.param2 || []}
          onChange={(_, arg2: any) => {
            const value: string = arg2.props.value;
            const index = param2.indexOf(value);
            if (index > -1) {
              param2.splice(index, 1);
              set('param2', param2);
            } else {
              set('param2', [...param2, value]);
            }
          }}
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default UseQueryParameterDemoRoute;