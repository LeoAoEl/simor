import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { ImageMetadata } from "astro";

interface Props {
  imageFolder: string; // Carpeta desde la cual se obtendrán las imágenes
}

const SmallSwipper = ({ imageFolder }: Props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);

  // Cargar imágenes dinámicamente usando import.meta.glob
  useEffect(() => {
    const imageFiles = import.meta.glob<{ default: ImageMetadata }>(
      "/src/assets/*/*", // Ajusta el path según tu estructura
      { eager: true }
    );

    const filteredImages = Object.entries(imageFiles)
      .filter(([path]) => path.includes(`/${imageFolder}/`))
      .map(([_, mod]) => mod.default.src); // Extraer las rutas optimizadas

    setImages(filteredImages);
  }, [imageFolder]);

  // Variantes de animación para Framer Motion
  const cardVariants = {
    expanded: { width: "800px", opacity: 1 },
    collapsed: { width: "200px", opacity: 0.9 },
  };

  return (
    <section className="py-10 hidden md:block">
      <div className=" flex flex-col md:flex-row justify-center items-center gap-4 transition-all ease-in">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className={` h-80 w-auto bg-cover bg-center rounded-lg ease-in transition-all `}
            variants={cardVariants}
            initial="collapsed"
            animate={index === expandedIndex ? "expanded" : "collapsed"}
            onMouseEnter={() => setExpandedIndex(index)} // Expandir al hacer hover
            onMouseLeave={() => setExpandedIndex(null)} // Colapsar al salir del hover
            style={{
              backgroundImage: `url(${src})`,
            }}
            aria-label={`Image ${index + 1}`}
            role="img"
          />
        ))}
      </div>
    </section>
  );
};

export default SmallSwipper;
