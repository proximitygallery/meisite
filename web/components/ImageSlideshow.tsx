import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

interface ImageSlideshowProps {
  images: string[];
  alt: string;
  onIndexChange?: (index: number) => void;
}

export default function ImageSlideshow({ images, alt, onIndexChange }: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  // Don't show slideshow UI if there's only one image
  if (images.length <= 1) {
    return (
      <div className={styles.cardImageWrapper}>
        <Image 
          src={images[0]} 
          alt={alt}
          fill 
          style={{ objectFit: 'contain' }} 
          className={styles.cardImage}
          priority={true}
        />
      </div>
    );
  }

  return (
    <div 
      className={styles.slideshowContainer}
      onClick={nextImage}
    >
      <Image 
        src={images[currentIndex]} 
        alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
        fill 
        style={{ objectFit: 'contain' }} 
        className={styles.cardImage}
        priority={true}
      />
    </div>
  );
} 