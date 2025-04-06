import { Input } from "@/components/ui/input";

interface HeadingInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HeadingInput({ value, onChange }: HeadingInputProps) {
  return (
    <input
      type="text"
      placeholder="Enter heading"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="!text-3xl min-w-[30%] max-w-[70%] max-sm:min-w-[80%] w-auto transition-[width] duration-300 
                h-[65px] border border-transparent rounded px-6 
                dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-200 text-zinc-600 font-bold 
                focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700"
      style={{ width: `${Math.min(70, 30 + value.length * 2)}%` }}
    />

  );
}
