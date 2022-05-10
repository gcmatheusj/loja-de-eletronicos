import styled from 'styled-components';

export const ActionButton = styled.button`
  font-size: 18px;
  color: #fff;
  background-color: #4062bb;
  border: 0;
  padding: 0 20px;
  border-radius: 4px;
  height: 40px;
  margin: 0 4px;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9)
  }
`