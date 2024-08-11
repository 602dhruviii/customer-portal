// src/components/PhotoGrid.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Use a specific CSS file for this component

const PhotoGrid: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const images = Array.from({ length: 9 }, async () => {
          const response = await axios.get('https://picsum.photos/200', { responseType: 'blob' });
          return URL.createObjectURL(response.data);
        });

        const imageUrls = await Promise.all(images);
        setPhotos(imageUrls);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
    const interval = setInterval(fetchPhotos, 10000); // Fetch new photos every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="photo-grid">
      {photos.map((photoUrl, index) => (
        <div key={index} className="photo-grid-item">
          <img src={photoUrl} alt={`Random ${index}`} className="photo-grid-img" />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
