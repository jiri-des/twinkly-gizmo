export default function CarMask() {
  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.48)',
    zIndex: 5,
    pointerEvents: 'none',
    maskImage: "url('/car-silhouette.svg')",
    maskSize: '95% auto',
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
    WebkitMaskImage: "url('/car-silhouette.svg')",
    WebkitMaskSize: '95% auto',
    WebkitMaskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
  };

  const imgStyle = {
    position: 'absolute',
    width: '95%',
    maxHeight: '72%',
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
