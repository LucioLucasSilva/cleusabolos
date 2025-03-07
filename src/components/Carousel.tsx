import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../images/carousel/1.jpg';
import img2 from '../images/carousel/2.jpg';
import img3 from '../images/carousel/3.jpg';
import img4 from '../images/carousel/4.jpg';
import img5 from '../images/carousel/5.jpg';

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Generate array of image paths from 1 to 5
    const carouselImages = [img1, img2, img3, img4, img5];;
    setImages(carouselImages);

    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden bg-gray-100" style={{ height: '60vh', maxHeight: '600px' }}>
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={image}
            alt={`Bolo ${index + 1}`}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/800x600?text=Imagem+não+encontrada';
            }}
          />
        </div>
      ))}

      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-colors z-20"
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="w-6 h-6 text-purple-800" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white/90 transition-colors z-20"
        aria-label="Próxima imagem"
      >
        <ChevronRight className="w-6 h-6 text-purple-800" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentImage ? 'bg-purple-800' : 'bg-white/80'
            }`}
            onClick={() => setCurrentImage(index)}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}