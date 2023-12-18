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

import { styles as uqpdStyles } from './style';
import { useStyles } from '../../../hooks/useStyles';

type UseQueryParametersDemoRouteProps = {
  params: {
    routeName: string;
  };
};

type QueryParams = {
  param1: string;
  param2: Array<string>;
};

const UseQueryParameterDemoRoute = ({
  params,
}: UseQueryParametersDemoRouteProps) => {
  const styles = useStyles(uqpdStyles);
  const { queryParameters, set } = useQueryParameters<QueryParams>(
    params.routeName
  );

  const param1 = queryParameters?.param1 || '';
  const param2 = queryParameters?.param2 || [];

  return (
    <div style={styles.static?.container}>
      <Typography style={styles.static?.text}>
        Change the following fields and watch the url keep up with the new data
        you entered. Then feel free to navigate away from this page and come
        back or even hit refresh while on this page, and then see that your data
        has been preserved!
      </Typography>
      <TextField
        style={styles.static?.inputContainer}
        variant="filled"
        value={param1}
        onChange={(event) => {
          set('param1', event.target.value);
        }}
        label="[param1] - Write any string"
      />

      <FormControl variant="filled" style={styles.static?.inputContainer}>
        <InputLabel>[param2] - Select some options</InputLabel>
        <Select
          multiple
          label="[param2] - Select some options"
          variant="filled"
          style={styles.static?.select}
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
