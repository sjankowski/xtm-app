import { GlobalStyle } from 'assets/styles/globalStyle';
import ResultsList from 'components/organisms/UsersList/ResultsList';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme.js';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGrey};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: min(90vw, 1200px);
`;

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Wrapper>
          <ResultsList />
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default Root;
