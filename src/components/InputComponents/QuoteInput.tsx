import { Textarea } from "@/components/ui/textarea";

interface QuoteInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuoteInput({ value, onChange }: QuoteInputProps) {
  return (
    <Textarea
      placeholder="Enter quote..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="italic border-l-4 border-gray-500 pl-2"
    />
  );
}
