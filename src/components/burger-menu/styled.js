import styled from 'styled-components';
import { breakPoints } from '@styles/themes';

export const BurgerStyled = styled.div`
  display: none;
  z-index: 20;
  width: ${({ theme }) => theme.spacer * 3}px;
  height: ${({ theme }) => theme.spacer * 3}px;

  @media (max-width: ${breakPoints.laptop}) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: ${({ theme }) => theme.spacer * 3}px;
    height: ${({ theme }) => theme.spacer * 0.36}px;
    background-color: ${({ theme }) => theme.headerTextColor};
    border-radius: ${({ theme }) => theme.spacer * 1.25}px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ isOpen }) => isOpen ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ isOpen }) => isOpen ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;