// import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Placeholder from "@tiptap/extension-placeholder"; // ✅ Import Placeholder
// import { Bold, Italic, Strikethrough, LinkIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRef, useEffect } from "react";

// type FloatingEditorProps = {
//   value: string;
//   onChange: (value: string) => void;
// };

// const ParagraphInput: React.FC<FloatingEditorProps> = ({ value, onChange }) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Link.configure({ openOnClick: true }),
//       Placeholder.configure({
//         placeholder: ({ node }) => {
//           // Only show placeholder if the paragraph is empty (contains only <br>)
//           if (node.type.name === "paragraph" && node.textContent === "") {
//             return "Type something here...";
//           }
//           return "";
//         },
//         emptyEditorClass: "text-gray-400 italic", // Style for placeholder text
//       }),
      
//     ],
//     content: value,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML()); // Update parent state
//     },
//   });

//   const editorContainerRef = useRef<HTMLDivElement>(null);

//   // Auto-expand height as content grows
//   useEffect(() => {
//     if (editorContainerRef.current) {
//       editorContainerRef.current.style.height = "auto";
//       editorContainerRef.current.style.height = `${editorContainerRef.current.scrollHeight}px`;
//     }
//   }, [value]); // Recalculate height when content changes
  

//   if (!editor) return null;

//   return (
//     <div className="relative min-h-[100px] w-full focus:border-purple-700">
//       {/* BubbleMenu - Appears only when text is selected */}
//       {editor && (
//         <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bg-zinc-700 dark:bg-zinc-900 shadow-md p-2 rounded-md flex gap-2 border">
//           <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().toggleBold()}>
//             <Bold size={16} />
//           </Button>
//           <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().toggleItalic()}>
//             <Italic size={16} />
//           </Button>
//           <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().toggleStrike()}>
//             <Strikethrough size={16} />
//           </Button>
//           <Button
//             size="sm"
//             variant="ghost"
//             onClick={() => {
//               const url = prompt("Enter URL");
//               if (url) {
//                 editor.chain().focus().setLink({ href: url }).run();
          
//                 // Insert a space & exit the link
//                 // editor.chain().insertContent(" ").unsetLink().run();
//               }
//             }}
//           >
//             <LinkIcon size={16} />
//           </Button>
//         </BubbleMenu>
//       )}

//         {/* Editable Area */}
//         <div
//   ref={editorContainerRef}
//   className="min-h-[100px] overflow-hidden border border-transparent rounded-md 
//     focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400 
//     dark:focus-within:ring-purple-700 dark:focus-within:border-purple-700"
// >
//   <EditorContent
//     editor={editor}
//     placeholder="Enter Paragraph"
//     className="w-full p-4 resize-none min-h-[100px] rounded 
//       dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-200 text-zinc-600 
//       !focus:outline-none !focus:ring-0 !focus:border-transparent 
//       [&>div]:min-h-[100px] [&>div]:h-full [&>div]:w-full [&_a]:text-blue-500 [&_a]:underline [&_a]:cursor-pointer [&_a]:hover:text-blue-700"
//   />
// </div>


//       </div>
//   );
// };

// export default ParagraphInput;


import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Strikethrough, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

type FloatingEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const ParagraphInput: React.FC<FloatingEditorProps> = ({ value, onChange }) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const linkInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: true }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph" && node.textContent === "") {
            return "Type something here...";
          }
          return "";
        },
        emptyEditorClass: "text-gray-400 italic",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorContainerRef.current) {
      editorContainerRef.current.style.height = "auto";
      editorContainerRef.current.style.height = `${editorContainerRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Handle link input submission
  const handleSetLink = () => {
    if (editor && linkUrl.trim()) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  };

  // Focus input when it's shown
  useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, [showLinkInput]);

  if (!editor) return null;

  return (
    <div className="relative min-h-[100px] w-full focus:border-purple-700">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className="bg-zinc-700 dark:bg-zinc-900 shadow-md p-2 rounded-md flex gap-2 border">
          <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().toggleBold()}>
            <Bold size={16} />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().toggleItalic()}>
            <Italic size={16} />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().toggleStrike()}>
            <Strikethrough size={16} />
          </Button>
          <div className="relative flex items-center">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowLinkInput((prev) => !prev)}
            >
              <LinkIcon size={16} />
            </Button>
            {showLinkInput && (
              <input
                ref={linkInputRef}
                type="text"
                className="absolute left-full ml-2 px-2 py-1 text-sm border rounded dark:bg-zinc-800 bg-zinc-700 focus:outline-none"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onBlur={handleSetLink}
                onKeyDown={(e) => e.key === "Enter" && handleSetLink()}
              />
            )}
          </div>
        </BubbleMenu>
      )}

      <div
        ref={editorContainerRef}
        className="min-h-[100px] overflow-hidden border border-transparent rounded-md 
          focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-400 
          dark:focus-within:ring-purple-700 dark:focus-within:border-purple-700"
      >
        <EditorContent
          editor={editor}
          placeholder="Enter Paragraph"
          className="w-full p-4 resize-none min-h-[100px] rounded 
            dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-200 text-zinc-600 
            !focus:outline-none !focus:ring-0 !focus:border-transparent 
            [&>div]:min-h-[100px] [&>div]:h-full [&>div]:w-full [&_a]:text-purple-200 [&_a]:rounded [&_a]:px-1 [&_a]:bg-zinc-700 [&_a]:cursor-pointer [&_a]:hover:text-blue-200"
        />
      </div>
    </div>
  );
};

export default ParagraphInput;
