import { CameraOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  input[type='file'] {
    display: none;
  }
`;

const StyledCameraOutlined = styled(CameraOutlined)`
  font-size: 20px;
  vertical-align: middle;
`;

const StyledButton = styled(Button)`
  width: 100%;
  text-align: left;
`;

interface SelectImageProps {
  title: string;
  hasBorder?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onImageChanged: (file: File) => void;
}

export const SelectImage: React.FC<SelectImageProps> = ({
  title,
  hasBorder,
  icon,
  className,
  onImageChanged,
}) => {
  const fileElementRef = useRef<HTMLInputElement>(null);

  const previewFile = () => {
    if (!fileElementRef.current) {
      return;
    }
    const file = fileElementRef.current.files?.[0];

    if (file) {
      onImageChanged(file);
    }

    fileElementRef.current.value = '';
  };

  return (
    <Wrapper className={className}>
      <StyledButton
        type={hasBorder ? 'default' : 'text'}
        icon={icon || <StyledCameraOutlined />}
        onClick={() => fileElementRef.current?.click()}
      >
        {title}
      </StyledButton>
      <input
        ref={fileElementRef}
        type="file"
        accept="image/*"
        onChange={previewFile}
      />
    </Wrapper>
  );
};
