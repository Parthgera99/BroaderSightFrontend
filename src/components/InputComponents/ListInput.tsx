import { Textarea } from "@/components/ui/textarea";

interface ListInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function ListInput({ value, onChange }: ListInputProps) {
  return (
    <Textarea
      placeholder="Enter list items (comma-separated)..."
      value={value.join(", ")}
      onChange={(e) => onChange(e.target.value.split(", "))}
    />
  );
}
