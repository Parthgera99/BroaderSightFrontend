import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AlertCircle } from "lucide-react";

interface VideoInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function VideoInput({ value, onChange }: VideoInputProps) {
  const [videoUrl, setVideoUrl] = useState(value);
  const [error, setError] = useState("");

  // Function to extract YouTube Video ID
  const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    
    const videoId = extractVideoId(url);
    
    if (videoId) {
      setError(""); 
      onChange(url); 
    } else {
      setError("Invalid YouTube URL. Please enter a valid link.");
    }
  };

  const videoId = extractVideoId(videoUrl);

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Input for YouTube Video URL */}
      <input
        type="text"
        placeholder="Enter YouTube Video URL..."
        value={videoUrl}
        onChange={handleChange}
        className={`border p-2 rounded ${error ? "border-red-500" : ""} border-transparent rounded px-6 
                dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-200 text-zinc-600 
                focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700`}
      />

      {/* Error message if URL is invalid */}
      {error && (
        <div className="text-red-500 flex items-center gap-1 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Show embedded YouTube video only if valid */}
      {videoId && (
        <div className="w-[50%] rounded aspect-video mt-2">
          <iframe
            width="100%"
            height="100%"
            className="rounded-xl"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
