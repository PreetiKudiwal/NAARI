import React, { useEffect, useState } from 'react'

export default function SplashScreen() {

    const words = ["Celebrate", "Yourself", "in", "every", "Thread"]; // words you want to show
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Step 1: Show white screen for 1 second
    const startTimer = setTimeout(() => {
      setCurrentWordIndex(0);
    }, 1000); // 1 second delay before first word

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    // Step 2: Start showing words one by one
    if (currentWordIndex >= 0 && currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (currentWordIndex === words.length) {
      // Step 3: After last word, show logo
      setShowLogo(true);
    }
  }, [currentWordIndex]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-[60px] flex items-center">
        {currentWordIndex < words.length && (
          <h1
            key={currentWordIndex}
            className={`text-[40px] font font-bold text-gray-800
              ${
                currentWordIndex % 2 === 0
                  ? "animate-drop-right"
                  : "animate-drop-left"
              }`}
          >
            {words[currentWordIndex]}
          </h1>
        )}
      </div>

      {/* Logo appears after words */}
      {showLogo && (
        <img
          src="https://res.cloudinary.com/dbglxb4z0/image/upload/v1759999596/logo_yldy7i.png"
          alt="App Logo"
          className="w-40 absolute bottom-[42%] opacity-100 transition-opacity duration-1000 animate-pulse"
        />
      )}
    </div>
  )
}
