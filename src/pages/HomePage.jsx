import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <div className="home-content">
        <h1 className="app-title">Twinkly Gizmo</h1>
        <p className="app-subtitle">Fotoaplikace pro mobilní prohlížeč</p>
        <button className="btn btn-primary" onClick={() => navigate('/camera')}>
          Začít fotit
        </button>
      </div>
    </div>
  );
}
