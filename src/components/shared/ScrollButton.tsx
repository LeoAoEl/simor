import { useEffect, useState } from "react";

interface Props {
  showAfter?: number;
}

const ScrollToTopButton: React.FC<Props> = ({ showAfter = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to Top"
      className={`fixed bottom-5 right-5 ${isVisible ? "flex" : "hidden"} justify-center items-center bg-primary text-white rounded-full md:p-0 p-2  w-10 h-10 md:w-14 md:h-14 shadow-lg hover:bg-secondary transition-all z-50`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-8 h-8"
      >
        <path
          fill="currentColor"
          d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"
        />
        <path
          fill="currentColor"
          d="M33.3 26.7L25 18.4l-8.3 8.3l-1.4-1.4l9.7-9.7l9.7 9.7z"
        />
        <path fill="currentColor" d="M24 17h2v17h-2z" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
