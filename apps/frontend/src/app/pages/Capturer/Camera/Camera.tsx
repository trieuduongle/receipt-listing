import { Button } from 'antd';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import './Camera.scss';

const Video = styled.video``;

const VideoContainer = styled.div`
  position: relative;
`;

interface CameraProps {
  onCapture: (objectUrl: string) => void;
}
const constraints = { video: true };

export const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const localMediaStreamRef = useRef<MediaStream>();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(handleSuccess)
      .catch(handleError);
  }, []);

  useEffect(() => {
    const localMediaStream = localMediaStreamRef.current;

    return () => {
      if (localMediaStream) {
        localMediaStream.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.stop();
          }
        });
      }
    };
  }, [localMediaStreamRef]);

  const handleError = (error: any) => {
    console.error('navigator.getUserMedia error: ', error);
  };

  const handleSuccess = (stream: MediaStream) => {
    if (!videoRef.current) {
      return;
    }
    localMediaStreamRef.current = stream;

    videoRef.current.srcObject = stream;
  };

  const handleCaptureImage = () => {
    if (!canvasRef.current || !videoRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const video = videoRef.current;
    console.log(localMediaStreamRef);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    // Other browsers will fall back to image/png
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const objectUrl = URL.createObjectURL(blob);
      onCapture(objectUrl);
    }, 'image/webp');
  };
  return (
    <>
      <VideoContainer>
        <Video autoPlay ref={videoRef}></Video>
      </VideoContainer>
      <canvas style={{ display: 'none' }} ref={canvasRef}></canvas>

      {/* <button onClick={handleOpenCamera}>Start</button> */}
      <Button onClick={handleCaptureImage}>Take</Button>

      <input type="file" accept="image/*" capture="environment" />
    </>
  );
};

// <video autoplay></video>
//     <img src="" />
//     <canvas style="display: none"></canvas>

//     <script>
//       const captureVideoButton = document.querySelector(
//         '#screenshot .capture-button'
//       );
//       const screenshotButton = document.querySelector('#screenshot-button');
//       const img = document.querySelector('#screenshot img');
//       const video = document.querySelector('#screenshot video');

//       const canvas = document.createElement('canvas');

//       captureVideoButton.onclick = function () {
//         navigator.mediaDevices
//           .getUserMedia(constraints)
//           .then(handleSuccess)
//           .catch(handleError);
//       };

//       screenshotButton.onclick = video.onclick = function () {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         canvas.getContext('2d').drawImage(video, 0, 0);
//         // Other browsers will fall back to image/png
//         img.src = canvas.toDataURL('image/webp');
//       };

//       function handleSuccess(stream) {
//         screenshotButton.disabled = false;
//         video.srcObject = stream;
//       }
//     </script>

// function handleError(error) {
//   console.error('navigator.getUserMedia error: ', error);
// }
// const constraints = { video: true };

// (function () {
//   const video = document.querySelector('#basic video');
//   const captureVideoButton = document.querySelector('#basic .capture-button');
//   let localMediaStream;

//   function handleSuccess(stream) {
//     localMediaStream = stream;
//     video.srcObject = stream;
//   }

//   captureVideoButton.onclick = function () {
//     navigator.mediaDevices
//       .getUserMedia(constraints)
//       .then(handleSuccess)
//       .catch(handleError);
//   };

//   document.querySelector('#stop-button').onclick = function () {
//     video.pause();
//     localMediaStream.stop();
//   };
// })();
