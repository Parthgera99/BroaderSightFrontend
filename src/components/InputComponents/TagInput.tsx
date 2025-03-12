import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const TagInput = ({
  tagsArray = [], // Default to an empty array if undefined
  setBlogData,
}: {
  tagsArray: string[] | undefined;
  setBlogData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [tags, setTags] = useState<string[]>(tagsArray); // Initialize with tagsArray
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setTags(tagsArray || []); // Update tags when parent data changes
  }, [tagsArray]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault(); // Prevent form submission

      const newTags = [...tags, inputValue.trim()];
      setTags(newTags); // Update local state
      setBlogData((prev: any) => ({ ...prev, tags: newTags })); // Update parent state
      setInputValue(""); // Clear input
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags); // Update local state
    setBlogData((prev: any) => ({ ...prev, tags: newTags })); // Update parent state
  };

  return (
    <div>
      <h1 className="text-purple-800 text-xl font-semibold dark:text-purple-400 font-montserrat mb-2">
        Tags
      </h1>
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-3 py-1 bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-white rounded-full"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-1 text-purple-800 dark:text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
          className="flex-1 border-none focus:ring-0 focus:outline-none bg-transparent min-w-[120px]"
        />
      </div>
    </div>
  );
};

export default TagInput;
