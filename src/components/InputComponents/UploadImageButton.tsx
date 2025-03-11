import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Pencil } from "lucide-react";

type BlogData = {
  displayImage: string;
};

const UploadImageButton = ({blogId, src, setBlogData }: { blogId: string, src: string | undefined, setBlogData: React.Dispatch<React.SetStateAction<any>> }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file selection
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await api.post(`/blog/uploadfile/${blogId}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }, );

      console.log(response);

      if (response.data.data) {
        setBlogData((prev:any) => ({
          ...prev,
          displayImage: response.data.data,
        }));
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-[30%]">
      {/* Hidden File Input */}
      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Clickable Button */}
      {src ? (
        <div onClick={handleButtonClick} className="group relative w-full h-full">
          <img src={src} alt="Uploaded Preview" className="w-full rounded h-full object-cover" />
          <label
            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
            htmlFor="file-input"
          >
            <Pencil className="text-white w-6 h-6" />
          </label>
        </div>
    ): (
        <Button className="w-[75%] dark:text-zinc-50 dark:bg-zinc-800 text-zinc-600 hover:dark:bg-purple-700 bg-zinc-200 hover:bg-purple-200" variant="outline" onClick={handleButtonClick} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      )
      }
      

      {/* {src && (
        <img
          src={src}
          alt="Uploaded Preview"
          className="mt-2 w-[30%] object-cover rounded-lg"
        />
      )} */}
    </div>
  );
};

export default UploadImageButton;
