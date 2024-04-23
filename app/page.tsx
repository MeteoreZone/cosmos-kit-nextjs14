// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageData {
  image: string;
}

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    fetchImages();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchImages = async () => {
    const response = await fetch('/api/images');
    const data = await response.json();
    setImages((prevImages) => [...prevImages, ...data]);
  };

  const deleteImage = async (imageName: string) => {
    const response = await fetch(`/api/image/${imageName}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('Image and metadata deleted successfully');
      setImages((prevImages) => prevImages.filter((image) => image.image !== imageName));
    } else {
      console.error('Error deleting image and metadata');
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchImages();
    }
  };

  return (
    <div className="image-container">
      {images.map((imageData) => (
        <div key={imageData.image} className="image-card" onClick={() => deleteImage(imageData.image)}>
          <Image src={`/api/image/${imageData.image}`} alt={imageData.image} width={200} height={200} />
        </div>
      ))}
    </div>
  );
}