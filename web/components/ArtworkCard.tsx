import { useState } from 'react';
import styles from '../styles/Home.module.css';
import ImageSlideshow from './ImageSlideshow';

interface ArtworkCardProps {
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  imageUrl: string | string[];  // Modified to accept either a single image or an array
  description: string;
}

export default function ArtworkCard({ title, year, medium, dimensions, imageUrl, description }: ArtworkCardProps) {
  const images = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <ImageSlideshow 
          images={images} 
          alt={title} 
          onIndexChange={setCurrentIndex}
        />
      </div>
      <div className={styles.cardCaptionContainer}>
        <div className={styles.cardCaption}>
          <span className={styles.cardTitle}><em>{title}</em></span>
          <span className={styles.cardMeta}>
            &nbsp;{year}. {medium}, {dimensions}
            {description && <span className={styles.cardDescription}>&nbsp;{description}</span>}
          </span>
        </div>
        {images.length > 1 && (
          <div className={styles.imageCounter}>
            {currentIndex + 1} of {images.length}
          </div>
        )}
      </div>
    </div>
  );
} 