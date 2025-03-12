import { useState , useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

const FaqInput = ({
  faqArray = [], // Default to empty array if undefined
  setBlogData,
}: {
  faqArray?: { question: string; answer: string }[];
  setBlogData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [faqs, setFaqs] = useState(faqArray); // Initialize state once

  useEffect(() => {
    setFaqs(faqArray);
  }, [faqArray]);


  // Function to update FAQs and prevent infinite loop
  const updateFaqs = (newFaqs: { question: string; answer: string }[]) => {
    setFaqs(newFaqs);
    setBlogData((prev: any) => ({ ...prev, faq: newFaqs }));
    console.log("faq updated", faqs)
  };

  // Handle input changes for question or answer
  const handleChange = (index: number, field: "question" | "answer", value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    updateFaqs(updatedFaqs);
  };

  // Add a new FAQ input
  const addFaq = () => {
    updateFaqs([...faqs, { question: "", answer: "" }]);
    console.log("faq added")
  };

  // Remove an FAQ input
  const removeFaq = (index: number) => {
    updateFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1 className="text-purple-800 text-xl font-semibold dark:text-purple-400 font-montserrat mb-2">
        FAQs
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="flex flex-col gap-2 p-3 border rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Input
              type="text"
              placeholder="Enter question..."
              value={faq.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
              className="border-none focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-zinc-900 p-2 rounded"
            />
            <Textarea
              placeholder="Enter answer..."
              value={faq.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              className="border-none focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white dark:bg-zinc-900 p-2 rounded min-h-[80px]"
            />
            <div className="flex justify-between">
              <button
                onClick={() => removeFaq(index)}
                className="text-red-500 hover:text-red-700 flex items-center"
              >
                <X size={18} className="mr-1" /> Remove
              </button>
            </div>
          </div>
        ))}

        {/* Add New FAQ Button */}
        <button
          onClick={addFaq}
          className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium hover:text-purple-800 dark:hover:text-purple-300"
        >
          <Plus size={20} /> Add FAQ
        </button>
      </div>
    </div>
  );
};

export default FaqInput;
