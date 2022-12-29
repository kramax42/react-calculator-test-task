import styled from 'styled-components';
import { fontSizes, headerHeight, spacer } from '@styles/sizes';

export const HeaderStyled = styled.div`
  display: flex;
  height: ${headerHeight}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.header.backgroundColor};
  color: ${({ theme }) => theme.header.textColor};
  padding: ${spacer * 4}px;
`;

export const HeaderLogo = styled.p`
  font-size: ${fontSizes.xl}px;
`;
