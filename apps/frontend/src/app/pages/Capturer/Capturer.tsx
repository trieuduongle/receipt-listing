import { useRef, useState } from 'react';

export const Capturer = () => {
  const [capturedImage, setCapturedImage] = useState('');

  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const previewFile = () => {
    const preview = imgRef.current;
    if (!preview) {
      return;
    }

    const file = fileRef.current?.files?.[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      setCapturedImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setCapturedImage('');
    }
  };

  const handleCancelPreviewImage = () => {
    setCapturedImage('');
  };

  return (
    <>
      <input ref={fileRef} type="file" onChange={previewFile} />
      <br />
      <img ref={imgRef} src="" height="200" alt="preview..." />

      {/* {openCamera ? (
        <Camera onCapture={onImageCaptured} />
      ) : (
        <Button onClick={handleOpenCamera}>Open Camera</Button>
      )}
      <PreviewImage
        imageUrl={imageUrl}
        onSubmit={console.log}
        onCancel={handleCancelPreviewImage}
      /> */}
    </>
  );
};
