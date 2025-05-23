import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

interface ColorPlaceholderProps {
  imageUrl: string;
  width?: number;
  height?: number;
}

export default function ColorPlaceholder({ imageUrl, width = 800, height = 600 }: ColorPlaceholderProps) {
  const [color, setColor] = useState('#f0f0f0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return;

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      try {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;

        // Calculate average color
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }

        const pixelCount = data.length / 4;
        r = Math.round(r / pixelCount);
        g = Math.round(g / pixelCount);
        b = Math.round(b / pixelCount);

        setColor(`rgb(${r}, ${g}, ${b})`);
      } catch (e) {
        console.error('Error calculating average color:', e);
      }
      setLoading(false);
    };

    img.onerror = () => {
      console.error('Error loading image for color calculation');
      setLoading(false);
    };
  }, [imageUrl]);

  if (!loading && !color) return null;

  return (
    <div 
      className={styles.colorPlaceholder}
      style={{
        backgroundColor: color,
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ color: '#ffffff', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
        Loading...
      </div>
    </div>
  );
} 