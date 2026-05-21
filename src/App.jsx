import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PhotoProvider } from './context/PhotoContext';
import HomePage from './pages/HomePage';
import CameraPage from './pages/CameraPage';
import GalleryPage from './pages/GalleryPage';
import './styles/app.css';

export default function App() {
  return (
    <PhotoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PhotoProvider>
  );
}
