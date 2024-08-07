import Image from "next/image";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/PostUser";
import { Suspense } from "react";
// import { getPost } from "@/lib/data";

// const getPost = async (slug) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${slug}`,
//     {
//       // cache: "no-store",
//       next: { revalidate: 3000 },
//     }
//   );
//   if (!res.ok) throw new Error("something went wrongs");
//   return res.json();
// // };
//+++++++++++++++++++++++++++++++++++++++++++++++
const getPost = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
    // cache: "no-store",
    next: { revalidate: 3000 },
  });
  if (!res.ok) throw new Error("something went wrongs");
  return res.json();
};
export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.desc,
  };
};
const SinglePage = async ({ params, searchParams }) => {
  const { slug } = params;

  const post = await getPost(slug);
  console.log(post); 
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="/2023 Brabus P 900 Rocket Edition.jpg"
          alt=""
          fill
          className={styles.img}
        />
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Suspense fallback={<div>loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>2024-07-22</span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  );
};

export default SinglePage;
