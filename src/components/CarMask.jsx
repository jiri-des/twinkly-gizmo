// Car mask overlay using traced SVG from Vectorizer.io.
// filter:invert(1) flips black→white, white→black.
// mix-blend-mode:screen makes black transparent → result: white car lines over camera.
export default function CarMask() {
  // SVG viewBox is 568×442 (aspect 1.284:1, landscape)
  const style = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 5,
    pointerEvents: 'none',
  };

  const overlayStyle = {
    ...style,
    background: 'rgba(0,0,0,0.42)',
  };

  const imgStyle = {
    position: 'absolute',
    // Keep SVG aspect ratio, fit within the camera view with padding
    width: '90%',
    maxHeight: '65%',
    objectFit: 'contain',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 6,
    pointerEvents: 'none',
    filter: 'invert(1)',
    mixBlendMode: 'screen',
    opacity: 0.92,
  };

  return (
    <>
      <div style={overlayStyle} />
      <img src="/car-mask.svg" alt="" style={imgStyle} />
    </>
  );
}
