import styled from 'styled-components';

export const Button = styled.button`
  padding: 7px 20px;
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ theme }) => theme.colors.LightPurple};
  border-radius: 20px;
  border: none;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.DarkPurple};
  margin: 15px 15px 15px 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.DarkPurple};
    color: ${({ theme }) => theme.colors.LightPurple};
  }
`;
