import { Input } from "@/components/ui/input";

interface HeadingInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HeadingInput({ value, onChange }: HeadingInputProps) {
  return (
    <input
      type="text"
      placeholder="Enter heading..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="!text-3xl min-w-[30%] max-w-[80%] w-auto transition-all duration-300 h-[60px] border rounded px-6 py-2 dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-200 text-zinc-600 font-bold focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 focus:border-transparent"
      style={{ width: `${Math.min(80, 30 + value.length * 2)}%` }}
    />
  );
}
