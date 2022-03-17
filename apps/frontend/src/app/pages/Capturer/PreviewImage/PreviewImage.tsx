import { Button, Drawer } from 'antd';
import styled from 'styled-components';

const Image = styled.img`
  display: block;
  margin: 0 auto;
  height: 100%;
`;

interface PreviewImageProps {
  imageUrl: string;
  onCancel: () => void;
  onSubmit: () => void;
}

export const PreviewImage: React.FC<PreviewImageProps> = ({
  imageUrl,
  onCancel,
  onSubmit,
}) => {
  console.log(imageUrl);
  return (
    <Drawer
      title="Preview Image"
      placement="right"
      onClose={onCancel}
      visible={!!imageUrl}
      footer={
        <>
          <Button danger onClick={onCancel}>
            Re-take
          </Button>
          <Button onClick={onSubmit}>Ok</Button>
        </>
      }
      width="100vw"
    >
      <Image src={imageUrl} alt="preview" />
    </Drawer>
  );
};
