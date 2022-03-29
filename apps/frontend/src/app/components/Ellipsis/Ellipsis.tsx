import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  overflow: auto;
`;

const StartBlock = styled.div`
  flex: 0 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`;

const EndBlock = styled.div`
  flex: 1 0 auto;
  overflow: hidden;
  white-space: pre;
`;

interface TextInfo {
  fullText: string;
  leftText: string;
  rightText: string;
}

interface EllipsisProps {
  text: string;
  className?: string;
}
export const Ellipsis: React.FC<EllipsisProps> = ({ className, text }) => {
  const [textInfo, setTextInfo] = useState<TextInfo>({
    fullText: '',
    leftText: '',
    rightText: '',
  });
  useEffect(() => {
    const splitIndex = Math.round(text.length * 0.75);

    setTextInfo({
      fullText: text,
      leftText: text.slice(0, splitIndex),
      rightText: text.slice(splitIndex),
    });
  }, [text]);

  return (
    <Wrapper className={className}>
      <StartBlock>{textInfo.leftText}</StartBlock>
      <EndBlock>{textInfo.rightText}</EndBlock>
    </Wrapper>
  );
};
