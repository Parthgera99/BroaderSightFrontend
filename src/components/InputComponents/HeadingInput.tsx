import { Input } from "@/components/ui/input";

interface HeadingInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HeadingInput({ value, onChange }: HeadingInputProps) {
  return (
    <Input
      type="text"
      placeholder="Enter heading..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xl font-bold"
    />
  );
}
