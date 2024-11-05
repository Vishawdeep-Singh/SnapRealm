import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { IconX } from "@tabler/icons-react";
import { toast } from "sonner";

export default function AddStories({
  postStory,
  setPostStory,
}: {
  postStory: boolean;
  setPostStory: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files); // Convert FileList to an array
      setUploadedFiles(filesArray); // Set the uploaded files state

      const fileURL = URL.createObjectURL(filesArray[0]); // Create a preview URL for the first file
      setSelectedImage(fileURL); // Set the preview image state
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    uploadedFiles.forEach((file, index) => {
      formData.append("media", file);
    });

    const response = await fetch("/api/user/stories", {
      method: "POST",
      body: formData, // Pass the FormData object directly
    });

    if (!response.ok) {
      toast.error("Couldn't upload you story right now!!");
    }

    const data = await response.json();
    console.log(data.message);

    // Here you can handle the submission of the uploaded files
    console.log(uploadedFiles); // This is where you would send the files to your backend or process them
    setPostStory();
  };

  return (
    <dialog open={postStory} onClose={setPostStory}>
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-20"
        onClick={setPostStory}
      />
      <div className="fixed inset-0 flex flex-col justify-center items-center z-30">
        <button
          onClick={setPostStory}
          className="fixed text-white top-2 right-2 z-20"
        >
          <IconX />
        </button>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[450px] h-[90%] items-center space-y-5"
        >
          <div className="relative rounded-xl flex justify-center items-center bg-gray-300 bg-opacity-50 w-[450px] h-[90%] shadow-[inset_0_0_15px_5px_rgba(0,0,0,0.8)]">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span
                className="text-6xl text-gray-700 cursor-pointer z-30"
                onClick={() => fileInputRef.current?.click()} // Trigger file input click
              >
                +
              </span>
            )}
            <Input
              type="file"
              id="media"
              name="media"
              multiple
              ref={fileInputRef} // Attach ref to the input
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit" // Change button type to submit
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Post Story
          </button>
        </form>
      </div>
    </dialog>
  );
}
