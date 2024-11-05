"use client";

import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";
import StorySlider from "./StorySlider";

type Storiestype = {
  stories: string[];
  user: { username: string; image: string };
};

export default function AllStories({
  isOpen,
  stories,
  CloseStory,
}: {
  stories: Storiestype[];
  isOpen: boolean;
  CloseStory: () => void;
}) {
  const [storyIndex, setStoryIndex] = useState(0); // Track which story to display
  const [slideIndex, setSlideIndex] = useState(0); // Track slides within a story

  const nextStory = (n: number) => {
    setStoryIndex((prevIndex) => {
      const newIndex = prevIndex + n;
      if (newIndex < 0) return stories.length - 1; // Loop to last story
      if (newIndex >= stories.length) return 0; // Loop to first story
      return newIndex;
    });
    setSlideIndex(0); // Reset slide index when switching stories
  };

  return (
    <dialog open={isOpen} onClose={CloseStory}>
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-20" />
      <div className="fixed inset-0 flex flex-col justify-center items-center z-30">
        <div className="slideshow-container z-30 relative w-full h-full mx-auto">
          <button
            onClick={CloseStory}
            className="fixed text-white top-2 right-2 z-20"
          >
            <IconX />
          </button>

          {/* Render the active story's slides */}
          <StorySlider
            username={stories[storyIndex].user.username}
            userimage={stories[storyIndex].user.image}
            photos={stories[storyIndex].stories}
          />

          {/* Next and previous buttons for stories */}
          <button
            onClick={() => nextStory(-1)}
            className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white"
          >
            &#10094; {/* Left arrow */}
          </button>
          <button
            onClick={() => nextStory(1)}
            className="absolute top-1/2 right-10 transform -translate-y-1/2 text-white"
          >
            &#10095; {/* Right arrow */}
          </button>

          {/* Dots indicating the number of stories */}
          <div className="absolute z-20 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === storyIndex ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </dialog>
  );
}
