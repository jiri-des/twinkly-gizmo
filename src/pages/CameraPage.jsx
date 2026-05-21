import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';
import CarMask from '../components/CarMask';

const TOTAL_SHOTS = 3;
const ANIM_MS     = 750; // must match CarMask.jsx ANIM_MS

export default function CameraPage() {
  const videoRef    = useRef(null);
  const [ready,     setReady]     = useState(false);
  const [error,     setError]     = useState(null);
  const [flash,     setFlash]     = useState(false);
  const [maskState, setMaskState] = useState(0);   // 0 = full, 1 = left, 2 = right
  const [locked,    setLocked]    = useState(false); // true while animating

  const { addPhoto } = usePhotos();
  const navigate = useNavigate();

  // ── Camera setup ────────────────────────────────────────────────────────────
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
    return () => { stream?.getTracks().forEach((t) => t.stop()); };
  }, []);

  // ── Capture ─────────────────────────────────────────────────────────────────
  function capture() {
    if (!ready || locked) return;

    const video = videoRef.current;
    if (!video) return;

    // Snapshot
    const canvas = document.createElement('canvas');
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    addPhoto(canvas.toDataURL('image/jpeg', 0.85));

    // Flash
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    const nextState = maskState + 1;

    if (nextState >= TOTAL_SHOTS) {
      // 3rd photo done → jump to gallery
      navigate('/gallery');
    } else {
      // Animate mask to next state, block button until done
      setLocked(true);
      setMaskState(nextState);
      setTimeout(() => setLocked(false), ANIM_MS + 100);
    }
  }

  // ── Error screen ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="page error-page">
        <p className="error-text">{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Zpět domů</button>
      </div>
    );
  }

  // ── Camera screen ─────────────────────────────────────────────────────────────
  return (
    <div className="page camera-page">
      <video ref={videoRef} autoPlay playsInline muted className="camera-video" />

      {flash && <div className="camera-flash" />}

      <CarMask stateIdx={maskState} />

      <div className="camera-controls">
        {/* Step counter */}
        <div className="camera-step">
          {maskState + 1}&thinsp;/&thinsp;{TOTAL_SHOTS}
        </div>

        {/* Shutter */}
        <button
          className="btn btn-capture"
          onClick={capture}
          disabled={!ready || locked}
          aria-label="Vyfotit"
        />

        {/* Progress dots */}
        <div className="camera-dots">
          {Array.from({ length: TOTAL_SHOTS }, (_, i) => (
            <span key={i} className={`camera-dot${i < maskState ? ' done' : i === maskState ? ' active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
