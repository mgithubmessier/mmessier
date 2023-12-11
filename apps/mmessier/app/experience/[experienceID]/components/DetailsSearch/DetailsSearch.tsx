'use client';

import { Autocomplete, Chip, IconButton, TextField } from '@mui/material';
import { colors } from '../../../../styles/colors';
import { Clear } from '@mui/icons-material';
import { useStyles } from '../../../../hooks/useStyles';
import { styles as detailsSearchStyles } from './styles';

type Option = {
  label: string;
  value: string;
};

type DetailsSearchProps = {
  options: Array<Option>;
  searchTerms: Array<string>;
  onAddSearchTerm: (searchTerms: Array<string>) => void;
  onRemoveSearchTerm: (searchTerm: string) => void;
  onClearSearchTerms: () => void;
};

export const DetailsSearch = ({
  options,
  searchTerms,
  onAddSearchTerm,
  onRemoveSearchTerm,
  onClearSearchTerms,
}: DetailsSearchProps) => {
  const styles = useStyles(detailsSearchStyles);
  return (
    <Autocomplete
      multiple
      value={searchTerms}
      renderOption={(props, option) => {
        return (
          <li
            {...props}
            key={typeof option === 'string' ? option : option.label}
          >
            {option.label}
          </li>
        );
      }}
      onClose={(event: any, reason) => {
        if (
          reason.includes('createOption') &&
          typeof event.target.value === 'string'
        ) {
          onAddSearchTerm(event.target.value.split(' '));
        } else if (
          reason === 'selectOption' &&
          typeof event.target.innerText === 'string'
        ) {
          onAddSearchTerm(event.target.innerText.split(' '));
        }
      }}
      // add "common search terms" to the api, wherever the storage of the experiences themselves are being held
      options={options}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.label;
      }}
      freeSolo
      renderTags={(value: Array<string | Option>, getTagProps) =>
        value.map((option: string | Option, index: number) => {
          const label = typeof option === 'string' ? option : option.label;
          const value = typeof option === 'string' ? option : option.value;

          return (
            <Chip
              variant="outlined"
              label={label}
              {...getTagProps({ index })}
              key={label}
              sx={{
                color: colors.text.main,
              }}
              onDelete={() => {
                onRemoveSearchTerm(value);
              }}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: searchTerms.length ? (
              <IconButton onClick={onClearSearchTerms}>
                <Clear sx={{ color: colors.text.main }} />
              </IconButton>
            ) : null,
          }}
          variant="outlined"
          label="Search"
          placeholder="Type a single search term and hit enter"
          style={styles.static?.autocompleteField}
          sx={{
            input: {
              color: colors.text.main,
            },
            '& .MuiOutlinedInput-root': {
              paddingRight: '10px!important',
            },
          }}
        />
      )}
    />
  );
};
