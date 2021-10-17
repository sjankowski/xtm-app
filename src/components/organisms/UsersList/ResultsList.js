import React, { useState, useEffect } from 'react';
import { replaceOne, replaceAll } from 'helpers/ReplaceFunctions';
import { useDebounce } from 'use-debounce';
import ResultsItem from 'components/molecules/ResultsItem/ResultsItem';
import { StyledList, Wrapper, StyledTitle, FormRow } from './ResultsList.styles';
import FormField from 'components/molecules/FormField/FormField';
import { Button } from 'components/atoms/Button/Button';

const initialFormState = {
  search: '',
  replaceWith: '',
};

const ResultsList = () => {
  const [results, setResults] = useState([]);
  const [formValues, setFormValues] = useState(initialFormState);
  const [formDebouncedValues] = useDebounce(formValues, 500);
  const [isLoading, setIsLoading] = useState(false);
  const WikiSearch = (term) => {
    setIsLoading(true);
    if (!term) {
      return;
    }
    var myInit = {
      method: 'GET',
    };
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=%22${term}%22&srlimit=10`, myInit)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setResults([...data.query.search]);
        setIsLoading(false);
      });
  };

  const isReplaceEnabled = formValues.replaceWith.length > 0 && formValues.search.length > 0 && results.length > 0;

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    WikiSearch(formDebouncedValues.search);
  }, [formDebouncedValues.search]);

  const resetInputs = () => {
    setFormValues(initialFormState);
    setResults([]);
  };

  const handleSearch = () => {
    WikiSearch(formValues.search);
  };

  const handleReplaceOne = () => {
    setResults(replaceOne(results, formValues.replaceWith));
  };

  const handleReplaceAll = () => {
    setResults(replaceAll(results, formValues.replaceWith));
  };

  return (
    <>
      <Wrapper as="form" onSubmit={handleSearch}>
        <StyledTitle>Search & replace</StyledTitle>
        <FormRow>
          <FormField label="Search" name="search" id="search" value={formValues.search} onChange={handleInputChange} />
          <FormField label="Replace with" name="replaceWith" id="replaceWith" value={formValues.replaceWith} onChange={handleInputChange} />
        </FormRow>
        <FormRow>
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>
          <Button type="button" onClick={handleReplaceOne} disabled={!isReplaceEnabled}>
            Replace
          </Button>
          <Button type="button" onClick={handleReplaceAll} disabled={!isReplaceEnabled}>
            Replace All
          </Button>
          <Button type="button" onClick={resetInputs}>
            Reset
          </Button>
        </FormRow>
      </Wrapper>
      {isLoading === true && formValues.search.length > 0 && (
        <Wrapper>
          <StyledTitle>Trwa szukanie...</StyledTitle>
        </Wrapper>
      )}
      {results.length > 0 && (
        <Wrapper>
          <StyledTitle>Search results</StyledTitle>
          <StyledList>
            {results.map((resultData) => (
              <ResultsItem key={resultData.pageid} resultData={resultData} />
            ))}
          </StyledList>
        </Wrapper>
      )}
    </>
  );
};

export default ResultsList;
