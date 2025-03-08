import { Textarea } from "@/components/ui/textarea";

interface TableInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TableInput({ value, onChange }: TableInputProps) {
  return (
    <Textarea
      placeholder="Enter table data..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
