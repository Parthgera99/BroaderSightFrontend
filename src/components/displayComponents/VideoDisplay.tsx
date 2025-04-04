import React from 'react'

const extractVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  
  function VideoDisplay({ value }: { value: string }) {
  const videoId = extractVideoId(value);
  return (
    <div className="w-[50%] mx-auto my-8 max-sm:w-full max-sm:h-[250px] rounded aspect-video mt-2">
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
  )
}

export default VideoDisplay