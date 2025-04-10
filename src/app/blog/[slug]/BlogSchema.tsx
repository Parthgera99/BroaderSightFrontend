import Head from "next/head";
import Script from "next/script";



type Blog = {
    _id: string;
    displayImage: string;
    title: string;
    slug: string;
    metaDescription: string;
    metaTitle:string;
    date: string;
    tags:string[];
    faq:[{
        question:string,
        answer:string
    }];
    author:{
      fullname: string;
      username: string;
      profilePicture: string;
      role: string;
    }
    content:[{
        type:string,
        value:any
    }]
    updatedAt: string;
  };

const BlogSchema = ({ blog } : {blog:Blog}) => {
  const faqStructuredData = blog.faq?.map((item:any) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://broadersight.com/blog/${blog.slug}`,
    },
    "headline": blog.title,
    "description": blog.metaDescription,
    "image": blog.displayImage,
    "author": {
      "@type": "Person",
      "name": blog.author.fullname,
      "url": `https://broadersight.com/profile/${blog.author.username}`,
    },
    "publisher": {
      "@type": "Organization",
      "name": "BroaderSight",
      "logo": {
        "@type": "ImageObject",
        "url": "https://broadersight.com/logo.svg", // Update with your logo
      },
    },
    "datePublished": blog.date,
    "dateModified": blog.updatedAt,
    ...(blog.faq?.length > 0 && {
      "mainEntity": faqStructuredData,
    }),
  };

  return (
    <Head>
        <link rel="canonical" href={`https://www.broadersight.com/blog/${blog.slug}`} />
        <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    </Head>
  );
};

export default BlogSchema;