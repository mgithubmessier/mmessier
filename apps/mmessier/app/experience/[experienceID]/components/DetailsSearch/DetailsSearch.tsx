'use client';

import { Autocomplete, Chip, IconButton, TextField } from '@mui/material';
import { colors } from '../../../../styles/colors';
import { Clear } from '@mui/icons-material';
import { useStyles } from '../../../../hooks/useStyles';
import { styles as detailsSearchStyles } from './styles';

type DetailsSearchProps = {
  options: Array<string>;
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
          <li {...props} key={option}>
            {option}
          </li>
        );
      }}
      onChange={(_, value: Array<string>) => {
        onAddSearchTerm(value);
      }}
      // add "common search terms" to the api, wherever the storage of the experiences themselves are being held
      options={options}
      freeSolo
      renderTags={(value: Array<string>, getTagProps) =>
        value.map((option: string, index: number) => {
          return (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={option}
              sx={{
                color: colors.text.main,
              }}
              onDelete={() => {
                onRemoveSearchTerm(option);
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
          placeholder="Add a whole word search term and hit enter"
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
