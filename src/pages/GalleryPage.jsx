import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';

const SHOT_LABELS = ['Celé auto', 'Levá polovina', 'Pravá polovina'];

export default function GalleryPage() {
  const { photos, clearPhotos } = usePhotos();
  const navigate = useNavigate();

  function handleEnd() {
    clearPhotos();
    navigate('/');
  }

  function handleRetake() {
    clearPhotos();
    navigate('/camera');
  }

  return (
    <div className="page gallery-page">
      <div className="gallery-header">
        <h2>Výsledek ({photos.length}&thinsp;/&thinsp;3)</h2>
      </div>

      {photos.length === 0 ? (
        <p className="gallery-empty">Zatím žádné fotky.</p>
      ) : (
        <div className="photo-grid">
          {photos.map((src, i) => (
            <div key={i} className="photo-thumb-wrap">
              <img src={src} alt={SHOT_LABELS[i] ?? `Fotka ${i + 1}`} className="photo-thumb" />
              <span className="photo-label">{SHOT_LABELS[i] ?? `Fotka ${i + 1}`}</span>
            </div>
          ))}
        </div>
      )}

      <div className="gallery-controls">
        <button className="btn btn-secondary" onClick={handleRetake}>
          Fotit znovu
        </button>
        <button className="btn btn-danger" onClick={handleEnd}>
          Ukončit
        </button>
      </div>
    </div>
  );
}
