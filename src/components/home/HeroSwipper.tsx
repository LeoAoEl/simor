import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "@styles/stylesPag.css"; // Tu archivo CSS personalizado

interface SlideData {
  title: string;
  spanText: string;
  imgSrc: string;
  href: string;
}

interface Props {
  slides: SlideData[];
}

const HeroSwipper: React.FC<Props> = ({ slides }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      effect="fade"
      className="w-full h-[75vh] md:h-screen transition-all ease-in-out "
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          <div
            className="absolute inset-0 z-10"
            style={{
              backgroundImage: `url(${slide.imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative z-20 flex items-center justify-center h-[75vh] md:h-screen text-white text-center">
            <div className="bg-primary/20 w-full h-full p-8 shadow-md flex flex-col items-center justify-center gap-4 transition-all ease-in-out duration-300">
              <h1 className=" text-5xl md:text-7xl font-bold mb-4">
                {slide.title}
              </h1>

              <span className=" text-white text-xl md:text-2xl prose">
                {slide.spanText}
              </span>

              <a
                aria-label={`ruta a ${slide.title}`}
                href={slide.href}
                className="px-4 py-2 md:px-6 md:py-3 border-2 hover:text-primary border-white text-white font-bold  text-lg md:text-2xl rounded-lg shadow-lg hover:bg-white transition-all ease-in"
              >
                Más información
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSwipper;
