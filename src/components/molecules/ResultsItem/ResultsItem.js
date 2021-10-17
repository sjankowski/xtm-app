import React from 'react';
import PropTypes from 'prop-types';
import { StyledInfo, Wrapper } from './ResultsItem.styles';
import Parser from 'html-react-parser';

const ResultsItem = ({ resultData: { title, snippet } }) => {
  let url = `https://en.wikipedia.org/wiki/${title}`;
  return (
    <Wrapper>
      <StyledInfo>
        <a href={url} target="_blank" rel="noreferrer" className="link">
          <p>{title}</p>
          <p>{Parser(snippet)}</p>
        </a>
      </StyledInfo>
    </Wrapper>
  );
};

ResultsItem.propTypes = {
  userData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    snippet: PropTypes.string,
  }),
};

export default ResultsItem;
