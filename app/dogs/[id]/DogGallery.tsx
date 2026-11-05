"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Функция для добавления параметров сжатия ImageKit
const getOptimizedUrl = (url: string) => {
  if (url.includes('ik.imagekit.io')) {
    // w-1200: ширина 1200px, c-at_max: не обрезать, q-80: качество 80%
    return `${url}?tr=w-1200,c-at_max,q-80`;
  }
  return url;
};

export default function DogGallery({ photos, dogName }: { photos: string[], dogName: string }) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  if (photos.length === 0) {
    return <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#edf2f7', borderRadius: '16px' }}>Нет фото</div>;
  }

  // Готовим слайды для полноэкранного просмотра (тоже сжимаем)
  const slides = photos.map((src) => ({ src: getOptimizedUrl(src) }));

  const nextPhoto = () => setIndex((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <>
      <div style={{ position: 'sticky', top: '20px' }}>
        
        {/* Главное фото с размытым фоном */}
        <div style={{ position: 'relative', width: '100%', height: '550px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#edf2f7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <Image 
            src={getOptimizedUrl(photos[index])} 
            alt="фон" 
            fill 
            style={{ objectFit: 'cover', filter: 'blur(20px)', opacity: 0.6, transform: 'scale(1.1)' }} 
            unoptimized
          />
          
          <div style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }} onClick={() => setIsOpen(true)}>
            <Image 
              key={index}
              src={getOptimizedUrl(photos[index])} 
              alt={dogName} 
              fill 
              sizes="(max-width: 1000px) 100vw, 50vw" 
              quality={100} 
              style={{ objectFit: 'contain' }} 
              priority 
              unoptimized
            />
          </div>

          {photos.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevPhoto(); }} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>←</button>
              <button onClick={(e) => { e.stopPropagation(); nextPhoto(); }} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>→</button>
              
              <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                {index + 1} / {photos.length}
              </div>
            </>
          )}
        </div>

        {/* Миниатюры */}
        {photos.length > 1 && (
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', overflowX: 'auto', paddingBottom: '10px' }}>
            {photos.map((photo, i) => (
              <div key={i} onClick={() => setIndex(i)} style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: index === i ? '3px solid #6b46c1' : '3px solid transparent', opacity: index === i ? 1 : 0.6, transition: 'all 0.2s' }}>
                <Image 
                  src={getOptimizedUrl(photo)} 
                  alt={`Миниатюра ${i + 1}`} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  unoptimized
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox open={isOpen} close={() => setIsOpen(false)} index={index} slides={slides} styles={{ container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' } }} />
    </>
  );
}