import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';

export default function CameraPage() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [flash, setFlash] = useState(false);
  const { addPhoto } = usePhotos();
  const navigate = useNavigate();

  useEffect(() => {
    let stream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setReady(true);
        }
      } catch (err) {
        setError(err.name === 'NotAllowedError'
          ? 'Přístup ke kameře byl zamítnut. Povol přístup v nastavení prohlížeče.'
          : 'Nepodařilo se spustit kameru: ' + err.message);
      }
    }

    startCamera();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  function capture() {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    addPhoto(canvas.toDataURL('image/jpeg', 0.85));
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  }

  if (error) {
    return (
      <div className="page error-page">
        <p className="error-text">{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Zpět domů</button>
      </div>
    );
  }

  return (
    <div className="page camera-page">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="camera-video"
      />

      {flash && <div className="camera-flash" />}

      <div className="mask-overlay">
        <div className="mask-rect" />
      </div>

      <div className="camera-controls">
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/gallery')}
        >
          Galerie
        </button>
        <button
          className="btn btn-capture"
          onClick={capture}
          disabled={!ready}
          aria-label="Vyfotit"
        />
      </div>
    </div>
  );
}
