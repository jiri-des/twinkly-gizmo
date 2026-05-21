import { createContext, useContext, useState } from 'react';

const PhotoContext = createContext(null);

export function PhotoProvider({ children }) {
  const [photos, setPhotos] = useState([]);

  const addPhoto = (dataUrl) => setPhotos((prev) => [...prev, dataUrl]);
  const clearPhotos = () => setPhotos([]);

  return (
    <PhotoContext.Provider value={{ photos, addPhoto, clearPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotoContext);
}
