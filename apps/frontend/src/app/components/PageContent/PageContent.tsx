import { Layout } from 'antd';
import styled from 'styled-components';

const StyledContent = styled(Layout.Content)`
  background: #fff;

  margin: 24px 16px;
  padding: 12px;
`;

export const PageContent: React.FC = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};
