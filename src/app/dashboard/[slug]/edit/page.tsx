"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth , User} from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { Trash } from "lucide-react";
import UploadImageButton from "@/components/InputComponents/UploadImageButton";
import TagInput from "@/components/InputComponents/TagInput";
import FaqInput from "@/components/InputComponents/faqInput";
import { Skeleton } from "@/components/ui/skeleton";

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
      value: z.union([z.string(), z.array(z.string()), z.array(z.array(z.string())) , z.object({ type: z.enum(["ul", "ol"]), items: z.array(z.string()) })]),
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
  const { user, loading, fetchUser } = useAuth();
  const [fetching , setFetching] = useState(false);
  const slug = params?.slug?.toString(); 
  let blog = user?.blogs?.find((b) => b.slug === slug);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = React.useRef<number | null>(null);
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
        toast.error("You must be logged in to edit a blog");
      } else if (!blog) {
        router.replace("/"); // Redirect if the blog is not theirs
      }
      else{
        setFetching(true);
        fetchCategories();
      }
    }
  }, [loading,user,blog]);

  // Fetch existing blog data when editing (if needed)
  useEffect(() => {
    if (blog) {
      setBlogData({
        _id: blog._id,
        title: blog.title || "",
        slug: blog.slug || "",
        displayImage: blog.displayImage || "",
        category: blog.category?.map((cat) => cat._id) || [], // Extract category names as strings
        author: blog.author?.fullname || "Unknown", // Convert author object to string
        content: Array.isArray(blog.content) ? blog.content : [], 
        tags: blog.tags || [],
        faq: blog.faq || [],
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        isPublished: blog.isPublished ,
      });
    }
  }, [blog]);
  
  
  // Add a new content block
  const addContentBlock = (type: BlogData["content"][number]["type"]) => {
    setBlogData({
      ...blogData,
      content: [...blogData.content, { type, value: "" }],
    });
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} Block Added Successfully`)
    console.log(blogData)
  };

  // Update content
  const updateContent = (index: number, newValue: string | string[] | string[][] | { type: "ul" | "ol"; items: string[] }) => {
    const updatedContent = [...blogData.content];

    if (updatedContent[index].type === "list") {
      updatedContent[index].value =
      typeof newValue === "string"
          ? { type: "ul", items: [newValue] } // Wrap single string in array
          : Array.isArray(newValue) && newValue.every(item => typeof item === "string")
          ? { type: "ul", items: newValue as string[] } // Ensure it's string[]
          : newValue; // Keep existing object
    } else if (updatedContent[index].type === "table") {
      updatedContent[index].value = Array.isArray(newValue) && Array.isArray(newValue[0])
          ? (newValue as string[][]) 
          : [["", ""],["", ""]]; // Default empty table
  } else {
        updatedContent[index].value = newValue; // Other blocks remain unchanged
    }

    setBlogData({ ...blogData, content: updatedContent });
};

  useEffect(() => {
    if (!blogData.title) {
      setError(null);
      return;
    }

    const checkTitle = async () => {
      setIsChecking(true);
      try {
        const response = await api.post(`/blog/check-title/${blogData.title}` ,{blogid: blogData._id },  { withCredentials: true });
        console.log(response)
        if (response.data.data.exists) {
          setError("This title already exists. Please choose another.");
        } else {
          setError(null);
        }
      } catch (error) {
        console.error("Error checking title:", error);
        setError("Error checking title. Try again.");
      }
      setIsChecking(false);
    };

    // Debounce the API call (wait 500ms after user stops typing)
    const timeout = setTimeout(checkTitle, 500);

    return () => clearTimeout(timeout);
  }, [blogData.title]);
  

  

  const saveBlog = async (publish = false) => {
    setFetching(true);
    if(error){
      toast.error(error);
      return;
    }
    try {
      if (!blogData) {
        alert("No blog data found.");
        return;
      }
      if(!blogData.title){
        toast.error("Please enter a title");
        return;
      }
      

      const { _id, title, slug, displayImage, faq, category, author, content, tags, metaTitle, metaDescription, isPublished } = blogData;

      const filteredFaq = faq?.filter((faqItem: { question: string; answer: string }) => 
        faqItem.question.trim() || faqItem.answer.trim()
      ) || [];

      let cleanBlogData;

      if(publish) {
        if(!blogData.category.length){
          toast.error("Please select a category");
          return;
        }
        if(blogData.displayImage === "" || !blogData.displayImage){
          toast.error("Please upload a display image");
          return;
        }
        if(!blogData.content.length){
          toast.error("Please add at least one content block");
          return;
        }
        if(!blogData.metaTitle){
          toast.error("Please enter a meta title");
          return;
        }
        if(!blogData.metaDescription){
          toast.error("Please enter a Blog description");
          return;
        }

         cleanBlogData = { title, category, faq : filteredFaq, displayImage, content, tags, metaTitle, metaDescription, isPublished : !blogData.isPublished };
      } else {
        cleanBlogData = { title, category, faq : filteredFaq, displayImage, content, tags, metaTitle, metaDescription, isPublished : blogData.isPublished };
      }

      console.log("clean blog data - ",cleanBlogData);

      const response = await api.put(
        `/blog/update/${blogData._id}`,
        cleanBlogData,
        { withCredentials: true } // ✅ Ensures cookies or auth tokens are sent
      );

      const updatedBlog = response?.data?.data?.blog;
      if (!updatedBlog) {
        console.error("Blog update failed.");
        return;
      }

      console.log("Full Response:", response);

      fetchUser();
      if(response?.data.data.blog.slug !== blog?.slug){
        blog = user?.blogs?.find((b) => b.slug === updatedBlog.slug);
        console.log("user blog" , blog)
        router.replace(`/dashboard/${response?.data.data.blog.slug}/edit`);
      }

      if(publish){
        if(updatedBlog.isPublished){
          toast.success("Blog published successfully");
        }
        else{
          toast.success("Blog unpublished successfully");
        }
      } else {
        toast.success("Blog updated successfully");
      }

    } catch (error) {
      console.error("Validation or API Error:", error);
      toast.error("Failed to update blog");
    } finally {
      setFetching(false);
    }
  };
  
  

  const fetchCategories = async () => {
    setFetching(true)
    try {
      const response = await api.get<{ data: Category[] }>("/category/list"); 
  
      if (response.data?.data) {
        setCategories(response.data.data.map((category) => ({ _id: category._id, name: category.name })));
        console.log("Categories fetched:", categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setFetching(false)
    }
  };


 const handleDeleteSection = async (index: number) => {
    const updatedContent = [...blogData.content];
    updatedContent.splice(index, 1);
    setBlogData({ ...blogData, content: updatedContent });
  };

  

  if (loading || fetching || !blog) return (
<>
    <div className="flex max-sm:flex-wrap max-sm:gap-2 space-x-6 max-sm:space-x-1 mt-6 mx-12 max-sm:mx-4">
      <Skeleton className="h-8 w-32 max-sm:w-24 max-sm:ml-0 ml-12"/>
      <Skeleton className="h-8 w-32"/>
      <Skeleton className="h-8 w-32 max-sm:w-16"/>
      <Skeleton className="h-8 w-32 max-sm:w-16"/>
      <Skeleton className="h-8 w-32"/>
      <Skeleton className="h-8 w-32 max-sm:w-48"/>
      <Skeleton className="h-8 w-32"/>
    </div>
    <div className="flex gap-2">
      <div className="w-[66%]">

        <div className="mt-12 flex flex-col space-y-6">
          <Skeleton className="h-20 mt-2 w-[400px] max-sm:w-[300px] mx-24 max-sm:mx-4"/>
          <Skeleton className="h-[40px] w-64 mx-24 max-sm:mx-4"/>
          <Skeleton className="h-8 w-32 mx-24 max-sm:mx-4"/>
        </div>
      </div>
      
      <div className="w-[2px] h-[500px] mt-12 rounded dark:bg-zinc-700 bg-zinc-400 ml-16 mr-8">
      {/* Divider Line   */}
      </div>         

      {/* Right Side  */}
      <div className="w-[25%] flex flex-col gap-12 my-24">
        <Skeleton className="h-[70px] mb-4 w-64 mx-4"/>
        <Skeleton className="h-[120px] w-64 mx-4"/>
      </div>
    </div>
</>
  )

  return (
    !blog ? <p>...</p> :(
      <>
        <div className="flex justify-between pb-12 pt-6 px-24 max-lg:px-12 max-sm:px-0">

          <div className="flex max-xl:flex-wrap gap-4 max-sm:gap-2">
            {/* Quote removed for now  */}
            {["heading", "paragraph", "image", "youtube Video", "list", "table"].map((type) => (
              <Button variant="outline" className="dark:text-zinc-50 max-md:text-sm dark:bg-zinc-800 bg-zinc-200 text-zinc-600 hover:bg-purple-200 dark:hover:bg-purple-700" key={type} onClick={() => addContentBlock(type as BlogData["content"][number]["type"])}>
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
          <Button onClick={() => saveBlog(false)} className="dark:bg-zinc-900">
            <SaveIcon className="dark:text-slate-50" />
          </Button>
        </div>


        <div className="flex flex-row max-sm:flex-col px-24 max-sm:px-0 gap-2">

          {/* Left Side */}
          <div className="w-[75%] max-sm:w-[95%] max-sm:mx-auto mb-96 max-sm:mb-0 flex flex-col gap-5">

            {/* Title Input and Error */}
            <div className="w-full">
            <input
              type="text"
              placeholder="Title"
              style={{ fontSize: "36px", width: `${Math.min(80, 30 + blogData.title.length * 2)}%` }}
              className={`min-w-[30%] max-w-[80%] max-sm:min-w-[100%] max-sm:rounded-xl w-auto transition-[width] duration-300 
                          focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700
                          dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-200 text-zinc-600 
                          rounded h-[85px] !text-4xl font-bold px-4 py-2 border border-transparent
                          ${error ? "border-red-500" : "border-transparent"}`}

              value={blogData.title}
              onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
            />

              {isChecking && <p className="text-sm text-gray-500 mt-1">Checking title...</p>}
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
          
            {/* Category Dropdown    */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[30%] max-sm:w-[70%] max-sm:rounded-xl hover:bg-purple-200 dark:hover:bg-purple-700 dark:text-zinc-50 dark:bg-zinc-800 bg-zinc-200 text-zinc-600 truncate">
                  {blogData.category.length
                    ? (() => {
                        const selectedCategories = categories.filter((cat) => blogData.category.includes(cat._id));
                        const displayedCategories = selectedCategories.slice(0, 2).map((cat) => cat.name).join(", ");
                        const remainingCount = selectedCategories.length - 2;
                        return remainingCount > 0 ? `${displayedCategories} +${remainingCount} more` : displayedCategories;
                      })()
                    : "Select Categories"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[240px] max-h-60 overflow-y-auto dark:text-zinc-50 dark:bg-zinc-700 bg-zinc-200 text-zinc-600 p-4 ml-24 scrollbar-hidden">
                <ToggleGroup
                  type="multiple"
                  value={blogData.category} // Using ObjectIds
                  onValueChange={(selectedIds) => {
                    setBlogData((prev) => ({
                      ...prev,
                      category: selectedIds, // Store as ObjectIds
                    }));
                  }}
                  className="flex flex-wrap gap-1"
                >
                  {categories?.map((cat) => (
                    <ToggleGroupItem key={cat._id} value={cat._id} className="px-3 py-2 w-full">
                      {cat.name}
                    </ToggleGroupItem>
                  ))}
                  
                </ToggleGroup>
              </PopoverContent>
            </Popover>

            {/* DisplayImage Component */}
            <div className="flex gap-4">
              <UploadImageButton blogId={blogData._id} src={blogData.displayImage} setBlogData={setBlogData} />
            </div>

            {/* Separator Line for Content */}
            <Separator className="dark:bg-zinc-700 bg-zinc-400 my-2" />

            {/* Content */}
            {blogData?.content?.map((block, index) => (
              <Card key={index} className="mb-4 flex max-sm:justify-between border-none bg-transparent shadow-none  items-center gap-4 w-[100%] group">
              {/* <CardContent className="p-4 space-y-2"> */}
                {/* <p className="font-bold capitalize">{block.type}</p> */}
                {block.type === "heading" ? (
                  <HeadingInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
                ) : block.type === "paragraph" ? (
                  <ParagraphInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
                ) : block.type === "image" ? (
                  <ImageInput value={block.value as string} blogId={blogData._id} onChange={(value) => updateContent(index, value)} />
                ) : block.type === "youtube Video" ? (
                  <VideoInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
                ) : block.type === "list" ? (
                  <ListInput
                      value={block.value as { type: "ul" | "ol"; items: string[] }}
                      onChange={(value) => updateContent(index, value)}
                  />
                ) : block.type === "table" ? (
                  <TableInput 
                      value={Array.isArray(block.value) && Array.isArray(block.value[0]) 
                          ? (block.value as string[][]) 
                          : [["", ""]] // Default empty table if not valid
                      } 
                      onChange={(newTable) => updateContent(index, newTable)}
                  />
                ) : block.type === "quote" ? (
                  <QuoteInput value={block.value as string} onChange={(value) => updateContent(index, value)} />
                ) : null}
              {/* </CardContent> */}
              <div className="flex gap-2 opacity-0 max-sm:opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="destructive" className='hover:bg-red-600' onClick={() => handleDeleteSection(index)}><Trash className="w-5 h-5 " /></Button>
              </div>
            </Card>
            ))}
          </div>

          <div className="w-[2px] mb-24 max-sm:hidden rounded dark:bg-zinc-700 bg-zinc-400 ml-16 mr-8">
          {/* Divider Line   */}
          </div>       

          <Separator className="dark:bg-zinc-700 bg-zinc-400 my-2 sm:hidden" />



          {/* Right Side  */}
          <div className="w-[25%] max-sm:w-full flex flex-col gap-4 pl-4 mb-24">

          <h1 className="text-purple-800 text-xl font-semibold dark:text-purple-400 font-montserrat">
              Meta Title
          </h1>

          <Textarea
            className="font-montserrat dark:text-zinc-50 py-2 px-6 !text-base font-semibold min-h-[70px] max-h-[300px] dark:bg-zinc-800 bg-zinc-200 text-zinc-600 rounded scrollbar-hidden border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-700 focus-visible:border-purple-400 dark:focus-visible:border-purple-700 overflow-hidden resize-none"
            
            value={blogData.metaTitle}
            onChange={(e) => setBlogData({ ...blogData, metaTitle: e.target.value })}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement; // 👈 Fix: Type assertion
              target.style.height = "auto"; // Reset height
              target.style.height = `${target.scrollHeight}px`; // Set new height
            }}
            />

          <h1 className="text-purple-800 text-xl font-semibold dark:text-purple-400 font-montserrat">
              Meta Description
          </h1>
          <Textarea
            className="font-montserrat dark:text-zinc-50 py-2 px-6 !text-base min-h-[120px] max-h-[300px] dark:bg-zinc-800 bg-zinc-200 text-zinc-600 rounded scrollbar-hidden border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 dark:focus-visible:ring-purple-700 focus-visible:border-purple-400 dark:focus-visible:border-purple-700 overflow-hidden resize-none"
            
            onChange={(e) => setBlogData({ ...blogData, metaDescription: e.target.value })}
            value={blogData.metaDescription}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement; // 👈 Fix: Type assertion
              target.style.height = "auto"; // Reset height
              target.style.height = `${target.scrollHeight}px`; // Set new height
            }}
          />

          <TagInput tagsArray={blogData.tags} setBlogData={setBlogData}/>

          <FaqInput setBlogData={setBlogData} faqArray={blogData.faq}/>

          <Button
            onClick={() => saveBlog(true)}
            className={`px-4 py-2 font-semibold font-montserrat text-lg rounded transition ${
              blogData.isPublished
                ? "bg-red-600 hover:bg-red-700 text-white" // Unpublish
                : "bg-green-600 hover:bg-green-700 text-white" // Publish
            }`}
          >
            {blogData.isPublished ? "Unpublish" : "Publish"}
          </Button>


          </div>

        </div>

      </>

    )
  );
}

export default EditBlogPage;
