import { Textarea } from "@/components/ui/textarea";

interface ParagraphInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ParagraphInput({ value, onChange }: ParagraphInputProps) {
  return (
    <Textarea
      placeholder="Enter paragraph..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-base"
    />
  );
}
