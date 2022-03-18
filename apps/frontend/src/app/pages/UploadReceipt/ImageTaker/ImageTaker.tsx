import { CloseCircleTwoTone } from '@ant-design/icons';
import { Image } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SelectImage } from '~/components';

const CenteringContent = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledSelectImage = styled(SelectImage)`
  height: 64px;

  > button {
    min-height: 64px;
  }
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

interface ImageTakerProps {
  title: string;
  value?: File;
  onImageChanged: (file?: File) => void;
}

export const ImageTaker: React.FC<ImageTakerProps> = ({
  value,
  title,
  onImageChanged,
}) => {
  const readerRef = useRef(new FileReader());
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    if (!value) {
      setDataUrl('');
      return;
    }
    const reader = readerRef.current;

    reader.onloadend = function (e) {
      setDataUrl((e.target?.result as string) || '');
    };
    reader.readAsDataURL(value);
  }, [value]);

  return (
    <>
      <StyledSelectImage
        title={title}
        hasBorder
        onImageChanged={onImageChanged}
      />

      {value ? (
        <CenteringContent>
          <PreviewImageWrapper>
            <Image src={dataUrl} />
            <CloseIcon onClick={() => onImageChanged()} />
          </PreviewImageWrapper>
        </CenteringContent>
      ) : null}
    </>
  );
};
