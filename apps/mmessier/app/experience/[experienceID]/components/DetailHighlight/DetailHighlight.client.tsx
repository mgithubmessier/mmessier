import { Typography } from '@mui/material';

type DetailHighlightProps = {
  detail: string;
  searchTerms: Array<string>;
};

export const DetailHighlight = ({
  detail,
  searchTerms,
}: DetailHighlightProps) => {
  if (!searchTerms.length) {
    return <Typography>{detail}</Typography>;
  }
  const highlightStyle = {
    color: 'gold',
  };
  const elements = [];
  const words = detail.split(' ');

  let nextPhrase = '';
  let isCurrentlyHighlighted = false;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (!searchTerms.find((t) => t.toLowerCase() === word.toLowerCase())) {
      if (!isCurrentlyHighlighted) {
        nextPhrase += nextPhrase ? ` ${word}` : word;
      } else {
        elements.push(
          <span style={highlightStyle} key={`${nextPhrase + i}`}>
            {' '}
            {nextPhrase}{' '}
          </span>
        );
        isCurrentlyHighlighted = false;
        nextPhrase = word;
      }
    } else {
      if (isCurrentlyHighlighted) {
        nextPhrase += nextPhrase ? ` ${word}` : word;
      } else {
        elements.push(<span key={`${nextPhrase + i}`}> {nextPhrase} </span>);
        isCurrentlyHighlighted = true;
        nextPhrase = word;
      }
    }
    if (i === words.length - 1) {
      if (isCurrentlyHighlighted) {
        elements.push(
          <span style={highlightStyle} key={`${nextPhrase + i}`}>
            {' '}
            {nextPhrase}{' '}
          </span>
        );
      } else {
        elements.push(<span key={`${nextPhrase + i}`}> {nextPhrase} </span>);
      }
    }
  }
  return <Typography>{elements}</Typography>;
};
