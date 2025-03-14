import { useState } from "react";
import { List, ListOrdered, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ListInputProps {
  value: { type: "ul" | "ol"; items: string[] };
  onChange: (value: { type: "ul" | "ol"; items: string[] }) => void;
}

export default function ListInput({ value, onChange }: ListInputProps) {
  const [listType, setListType] = useState<"ul" | "ol">(value.type || "ul");
  const [items, setItems] = useState<string[]>(value.items || [""]);

  // Handle list type change (UL or OL)
  const handleTypeChange = (type: "ul" | "ol") => {
    setListType(type);
    onChange({ type, items });
  };

  // Handle input change
  const handleInputChange = (index: number, newValue: string) => {
    const newItems = [...items];
    newItems[index] = newValue;
    setItems(newItems);
    onChange({ type: listType, items: newItems });
  };

  // Add a new list item
  const addItem = () => {
    const newItems = [...items, ""];
    setItems(newItems);
    onChange({ type: listType, items: newItems });
  };

  // Remove a list item
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange({ type: listType, items: newItems });
  };

  return (
    <div className="flex flex-col gap-2">
      {/* List Type Selection */}
      <div className="flex gap-2 mb-2">
        <Button
          variant={listType === "ul" ? "selected" : "unselected"}
          onClick={() => handleTypeChange("ul")}
        >
          <List className="w-5 h-5" />
        </Button>
        <Button
          variant={listType === "ol" ? "selected" : "unselected"}
          onClick={() => handleTypeChange("ol")}
        >
          <ListOrdered className="w-5 h-5" />
        </Button>
      </div>

      {/* List Item Inputs */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            className="dark:text-zinc-50 dark:bg-zinc-800 py-2 px-4 rounded-xl bg-zinc-200 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700"
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem(); // Call your function here
              }
            }}
            placeholder={`List item ${index + 1}`}
          />
          <Button variant="unselected" className="hover:bg-red-200 dark:hover:bg-red-600" onClick={() => removeItem(index)}>
            <Trash className="w-4 h-4 text-zinc-600 dark:text-zinc-50" />
          </Button>
        </div>
      ))}

      {/* Add New Item Button */}
      <Button onClick={addItem} variant="unselected">
        <Plus className="w-5 h-5 mr-2" /> Add Item
      </Button>
    </div>
  );
}
