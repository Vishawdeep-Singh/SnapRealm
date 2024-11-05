"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const StorySlider = ({
  photos,
  userimage,
  username,
}: {
  photos: string[];
  userimage: string;
  username: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 5000; // 5 seconds for each slide
    const startTime = Date.now();

    // Update progress based on the elapsed time
    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (elapsedTime / totalDuration) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      } else {
        setProgress(newProgress);
      }
    }, 50); // Update progress every 50ms for smoothness

    // Reset progress when slide changes
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      setProgress(0); // Reset progress for new slide
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(slideInterval);
    };
  }, [currentIndex]);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
    setProgress(0); // Reset progress when changing slide manually
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setProgress(0); // Reset progress when changing slide manually
  };

  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center">
      <div className="h-[10%] w-[450px] relative">
        <div className="flex items-center w-full h-full text-white ">
          <div className="w-11 h-11 rounded-full mr-2 flex justify-center overflow-hidden">
            <Image
              src={
                userimage
                  ? userimage
                  : `https://api.multiavatar.com/${username}.svg` ||
                    "./defaultuser.svg"
              }
              alt="user image"
              width={45}
              height={20}
            />
          </div>
          <p>{username}</p>
        </div>
      </div>
      <div className="story w-[450px] h-[80%] relative overflow-hidden rounded-lg">
        {/* Progress bar at the top */}
        <div className="w-full h-2 flex justify-center items-center absolute top-2 z-30">
          <div className="w-[90%] rounded-full h-1 bg-gray-300">
            <div
              className="h-full bg-white transition-all duration-[5000ms]"
              style={{ width: `${progress}%` }} // 5s => 100% width
            />
          </div>
        </div>

        {/* Slide Wrapper */}
        <div
          className="story__wrapper h-full flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {photos.map((src, index) => (
            <div
              key={index}
              className="story__slide flex-shrink-0 w-full h-full"
            >
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="story__pagination absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <div
              key={index}
              className="h-[3px] bg-gray-300 w-1/3 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white transition-all duration-[5000ms] ${
                  index === currentIndex ? "w-full" : "w-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPreviousSlide}
          className="story__prev absolute top-0 left-0 h-full w-1/2"
        ></button>
        <button
          onClick={goToNextSlide}
          className="story__next absolute top-0 right-0 h-full w-1/2"
        ></button>
      </div>
    </div>
  );
};

export default StorySlider;
