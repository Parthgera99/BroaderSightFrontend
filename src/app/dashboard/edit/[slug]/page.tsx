"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import HeadingInput from "@/components/InputComponents/HeadingInput";
import ParagraphInput from "@/components/InputComponents/ParagraphInput";
import ImageInput from "@/components/InputComponents/ImageInput";
import VideoInput from "@/components/InputComponents/VideoInput";
import ListInput from "@/components/InputComponents/ListInput";
import TableInput from "@/components/InputComponents/TableInput";
import QuoteInput from "@/components/InputComponents/QuoteInput";
import { z } from "zod";
import { SaveIcon } from "lucide-react";
import api from "@/lib/api";
import { toast } from "sonner";

// Define schema for the entire blog post
const blogSchema = z.object({
  _id: z.string(),
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


interface Category {
  _id: string;
  name: string;
}


function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const slug = params?.slug?.toString(); 
  const blog = user?.blogs?.find((b) => b.slug === slug);
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogData, setBlogData] = useState<BlogData>({
    _id: "",//
    title: "",
    displayImage: "",
    slug: "",//
    category: [],
    author: "",//
    date: "",//
    tags: [],
    metaTitle: "",
    metaDescription: "",
    faq: [],
    earnings: 0,//
    isPublished: false,
    content: [],
  });

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/sign-in"); // Redirect if not logged in
      } else if (!blog) {
        router.replace("/"); // Redirect if the blog is not theirs
      }
      else{
        fetchCategories();
      }
    }
  }, [user, loading, router, slug]);

  // Fetch existing blog data when editing (if needed)
  useEffect(() => {
    if (blog) {
      setBlogData({
        _id: blog._id,
        title: blog.title || "",
        slug: blog.slug || "",
        category: blog.category?.map((cat) => cat._id) || [], // Extract category names as strings
        author: blog.author?.fullname || "Unknown", // Convert author object to string
        content: Array.isArray(blog.content) ? blog.content : [], 
        tags: blog.tags || [],
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        isPublished: blog.isPublished ?? false,
      });
    }
  }, [loading]);
  
  
  // Add a new content block
  const addContentBlock = (type: BlogData["content"][number]["type"]) => {
    setBlogData({
      ...blogData,
      content: [...blogData.content, { type, value: "" }],
    });
    // console.log(blogData)
  };

  // Update content
  const updateContent = (index: number, newValue: string | string[]) => {
    const updatedContent = [...blogData.content];
    updatedContent[index].value = newValue;
    setBlogData({ ...blogData, content: updatedContent });
    // console.log("blog data after update",blogData)
  };
  

  const saveBlog = async () => {
    try {
      if (!blogData) {
        alert("No blog data found.");
        return;
      }

      const { _id, title, slug, category, author, content, tags, metaTitle, metaDescription, isPublished } = blogData;

      const cleanBlogData = { title, category, content, tags, metaTitle, metaDescription, isPublished };

      console.log(cleanBlogData);

      const response = await api.put(
        `/blog/update/${blogData._id}`,
        cleanBlogData,
        { withCredentials: true } // ✅ Ensures cookies or auth tokens are sent
      );

      console.log("Full Response:", response);


      // if (!response.data.success) {
      //   toast.error("Failed to update blog");
      // }
      toast.success("Blog updated successfully");
    } catch (error) {
      console.error("Validation or API Error:", error);
      toast.error("Failed to update blog");
    }
  };
  
  // const fetchCategories = async () => {
  //   try {
  //     const response = await api.get("/category/list");
  //     setCategories(response.data.data.map((category: { name: string }) => category.name));
  //     console.log("categories set to",categories)
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const response = await api.get<{ data: Category[] }>("/category/list"); 
  
      if (response.data?.data) {
        setCategories(response.data.data.map((category) => ({ _id: category._id, name: category.name }))); // Store as an array of { _id, name }
        console.log("Categories fetched:", categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };





  useEffect(() => {
    console.log("Updated categories:", blogData.category);
  }, [categories]); // Logs when categories update
  

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


        <div className="flex flex-row gap-2">
        <div className="w-[75%] ml-12 flex flex-col gap-5">

        <Input type="text" placeholder="Title" style={{ fontSize: "36px" }} className="w-[60%] h-[85px] !text-4xl font-bold px-4 py-2" value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[30%]">
              {blogData.category.length
                ? categories
                    .filter((cat) => blogData.category.includes(cat._id))
                    .map((cat) => cat.name)
                    .join(", ")
                : "Select Categories"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[30%] p-4">
            <ToggleGroup
              type="multiple"
              value={blogData.category} // Using ObjectIds
              onValueChange={(selectedIds) => {
                setBlogData((prev) => ({
                  ...prev,
                  category: selectedIds, // Store as ObjectIds
                }));
              }}
              className="flex flex-wrap gap-2"
            >
              {categories?.map((cat) => (
                <ToggleGroupItem key={cat._id} value={cat._id} className="px-3 py-2">
                  {cat.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </PopoverContent>
        </Popover>


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
