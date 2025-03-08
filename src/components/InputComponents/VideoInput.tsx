import { Input } from "@/components/ui/input";

interface VideoInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function VideoInput({ value, onChange }: VideoInputProps) {
  return (
    <Input
      type="text"
      placeholder="Enter video URL..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
