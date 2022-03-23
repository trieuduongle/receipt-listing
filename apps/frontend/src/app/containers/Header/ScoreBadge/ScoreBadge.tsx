import { CrownTwoTone } from '@ant-design/icons';
import { Tag } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.span`
  position: relative;
  padding-top: 8px;
  margin-right: 52px;
`;

const ScoreTag = styled(Tag)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, -50%);
`;

const StyledCrownTwoTone = styled(CrownTwoTone)`
  font-size: 1rem;
`;

interface ScoreBadgeProps {
  count?: number;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({ children, count }) => {
  return (
    <Wrapper>
      {children}

      <ScoreTag color="green">
        <StyledCrownTwoTone />: {count || 0}
      </ScoreTag>
    </Wrapper>
  );
};
