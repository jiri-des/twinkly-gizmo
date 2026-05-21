import { useNavigate } from 'react-router-dom';
import { usePhotos } from '../context/PhotoContext';

export default function GalleryPage() {
  const { photos, clearPhotos } = usePhotos();
  const navigate = useNavigate();

  function handleEnd() {
    clearPhotos();
    navigate('/');
  }

  return (
    <div className="page gallery-page">
      <div className="gallery-header">
        <h2>Galerie ({photos.length})</h2>
      </div>

      {photos.length === 0 ? (
        <p className="gallery-empty">Zatím žádné fotky.</p>
      ) : (
        <div className="photo-grid">
          {photos.map((src, i) => (
            <img key={i} src={src} alt={`Fotka ${i + 1}`} className="photo-thumb" />
          ))}
        </div>
      )}

      <div className="gallery-controls">
        <button className="btn btn-secondary" onClick={() => navigate('/camera')}>
          Fotit dál
        </button>
        <button className="btn btn-danger" onClick={handleEnd}>
          Ukončit
        </button>
      </div>
    </div>
  );
}
