import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Centering: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
