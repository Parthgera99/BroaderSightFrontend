import { Input } from "@/components/ui/input";

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImageInput({ value, onChange }: ImageInputProps) {
  return (
    <Input
      type="text"
      placeholder="Enter image URL..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
