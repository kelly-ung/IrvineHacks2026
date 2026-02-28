import { useState } from 'react'

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Left Arrow */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
      >
        &#8592;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
      >
        &#8594;
      </button>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-green-600" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;