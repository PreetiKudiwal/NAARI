import React, { useEffect, useState } from 'react'

export default function SplashScreen() {

    const words = ["Celebrate", "Yourself", "in", "every", "Thread"]; // words you want to show
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setCurrentWordIndex((prev) => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      // After last word → show logo
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
          src="/images/logo.png"
          alt="App Logo"
          className="w-40 absolute bottom-[42%] opacity-100 transition-opacity duration-1000 animate-pulse"
        />
      )}
    </div>
  )
}
