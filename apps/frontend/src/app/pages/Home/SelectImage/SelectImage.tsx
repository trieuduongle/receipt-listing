import { CameraOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';
import styled from 'styled-components';

const HiddenFileUploader = styled.input`
  display: none;
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
  onImageChanged: (file: File, extension: string) => void;
}

export const SelectImage: React.FC<SelectImageProps> = ({ onImageChanged }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const previewFile = () => {
    const file = fileRef.current?.files?.[0];
    const reader = new FileReader();

    console.log(file);

    if (file) {
      const fileName = file.name;
      const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
      onImageChanged(file, extension);
      // reader.onloadend = function () {
      //   const fileName = file.name;
      //   const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
      //   onImageChanged(reader.result as string, extension);
      //   console.log(new Date().getTime());
      // };
      // reader.readAsDataURL(file);
    } else {
      // onImageChanged(null, '');
    }
  };

  return (
    <>
      <StyledButton
        type="text"
        icon={<StyledCameraOutlined />}
        onClick={() => fileRef.current?.click()}
      >
        Scan your receipt
      </StyledButton>
      <HiddenFileUploader ref={fileRef} type="file" onChange={previewFile} />
    </>
  );
};
