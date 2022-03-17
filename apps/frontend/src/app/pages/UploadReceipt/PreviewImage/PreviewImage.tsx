import { CloseCircleTwoTone } from '@ant-design/icons';
import { Image } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CenteringContent = styled.div`
  display: flex;
  justify-content: center;
`;

const PreviewImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const CloseIcon = styled(CloseCircleTwoTone)`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 30px;
  transform: translate(50%, -50%);
  z-index: 1;
  cursor: pointer;

  &:hover {
    font-size: 32px;
  }
`;

interface PreviewImageProps {
  value?: File;
  onRemove: () => void;
}

export const PreviewImage: React.FC<PreviewImageProps> = ({
  value,
  onRemove,
}) => {
  const readerRef = useRef(new FileReader());
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    console.log(dataUrl);
  }, [dataUrl]);

  useEffect(() => {
    if (!value) {
      setDataUrl('');
      return;
    }
    const reader = readerRef.current;

    reader.onloadend = function (e) {
      setDataUrl((e.target?.result as string) || '');
      console.log(new Date().getTime());
    };
    reader.readAsDataURL(value);
  }, [value]);

  return value ? (
    <CenteringContent>
      <PreviewImageWrapper>
        <Image src={dataUrl} />
        <CloseIcon onClick={onRemove} />
      </PreviewImageWrapper>
    </CenteringContent>
  ) : null;
};
