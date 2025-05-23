import { useState } from 'react';
import styles from '../styles/Home.module.css';
import ImageSlideshow from './ImageSlideshow';

interface BookCardProps {
  title: string;
  author: string;
  publisher: string;
  year: number;
  coverUrl: string | string[];
  description: string;
}

export default function BookCard({ title, author, publisher, year, coverUrl, description }: BookCardProps) {
  const images = Array.isArray(coverUrl) ? coverUrl : [coverUrl];
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
            &nbsp;published by {publisher} {year}, Book design
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