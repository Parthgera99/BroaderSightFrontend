"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import HeadingInput from "@/components/InputComponents/HeadingInput";
import ParagraphInput from "@/components/InputComponents/ParagraphInput";
import ImageInput from "@/components/InputComponents/ImageInput";
import VideoInput from "@/components/InputComponents/VideoInput";
import ListInput from "@/components/InputComponents/ListInput";
import TableInput from "@/components/InputComponents/TableInput";
import QuoteInput from "@/components/InputComponents/QuoteInput";
import { z } from "zod";
import { SaveIcon } from "lucide-react";

// Define schema for the entire blog post
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  displayImage: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  category: z.array(z.string()),
  author: z.string().min(1, "Author is required"),
  date: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ).optional(),
  earnings: z.number().optional(),
  isPublished: z.boolean().optional(),
  content: z.array(
    z.object({
      type: z.enum(["heading", "paragraph", "image", "youtube Video", "list", "table", "quote"]),
      value: z.union([z.string(), z.array(z.string())]),
    })
  ),
});

type BlogData = z.infer<typeof blogSchema>;


function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const slug = params?.slug?.toString(); 
  const blog = user?.blogs?.find((b) => b.slug === slug);
  
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    displayImage: "",
    slug: "",
    category: [],
    author: "",
    date: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    faq: [],
    earnings: 0,
    isPublished: false,
    content: [],
  });
  
  // Add a new content block
  const addContentBlock = (type: BlogData["content"][number]["type"]) => {
    setBlogData({
      ...blogData,
      content: [...blogData.content, { type, value: "" }],
    });
    console.log(blogData)
  };

  // Update content
  const updateContent = (index: number, newValue: string | string[]) => {
    const updatedContent = [...blogData.content];
    updatedContent[index].value = newValue;
    setBlogData({ ...blogData, content: updatedContent });
  };
  


  // Save blog
  const saveBlog = async () => {
    try {
      blogSchema.parse(blogData); // Validate data
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) throw new Error("Failed to save blog");
      alert("Blog saved successfully");
    } catch (error) {
      console.error("Validation or API Error:", error);
      alert("Failed to save blog");
    }
  };


  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/sign-in"); // Redirect if not logged in
      } else if (!blog) {
        router.replace("/"); // Redirect if the blog is not theirs
      }
    }
  }, [user, loading, router, slug]);



  if (loading) return <p>Loading...</p>;

  return (
    !blog ? <p>Loading...</p> :(
      <>
        <div className="flex justify-between py-12 px-24">

          <div className="flex space-x-6">
            {["heading", "paragraph", "image", "youtube Video", "list", "table", "quote"].map((type) => (
              <Button variant="outline" className="hover:bg-purple-200 dark:hover:bg-purple-700" key={type} onClick={() => addContentBlock(type as BlogData["content"][number]["type"])}>
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
          <Button onClick={saveBlog} className="dark:bg-zinc-900">
            <SaveIcon className="dark:text-slate-50" />
          </Button>
        </div>

        <p>
          {blog.title}
        </p>

        <div className="flex flex-row gap-2">
        <div className="w-[75%] ml-12">
          {blogData?.content?.map((block, index) => (
            <Card key={index} className="mb-4 w-[80%]">
            <CardContent className="p-4 space-y-2">
              <p className="font-bold capitalize">{block.type}</p>
              {block.type === "heading" ? (
                <HeadingInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
              ) : block.type === "paragraph" ? (
                <ParagraphInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
              ) : block.type === "image" ? (
                <ImageInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
              ) : block.type === "youtube Video" ? (
                <VideoInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
              ) : block.type === "list" ? (
                <ListInput value={block.value as string[]} onChange={(value) => updateContent(index, value)} />
              ) : block.type === "table" ? (
                <TableInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
              ) : block.type === "quote" ? (
                <QuoteInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
              ) : null}
            </CardContent>
          </Card>
          ))}
        </div>

        <div className="w-[2px] rounded bg-zinc-100 mx-16">
        {/* Divider Line   */}
        </div> 

        <div className="w-[25%] pl-4">

        </div>
        </div>
      </>

    )
  );
}

export default EditBlogPage;
