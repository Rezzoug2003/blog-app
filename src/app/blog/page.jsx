import PostCard from "@/components/postCards/postCards";
import styles from "./blog.module.css";
import { getPosts } from "../../lib/data";
export const metadata = {
  title: "blog page",
  description: "Next.js starter app description",
};
// const getPosts = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//     // cache: "no-store",
//     next: { revalidate: 3000 },
//   });
//   if (!res.ok) throw new Error("something went wrong");
//   return res.json();
// };
// +++++++++++++++++++++++++++++++++==
const getPost = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    // cache: "no-store",
    next: { revalidate: 3000 },
  });
  if (!res.ok) throw new Error(res);
  return res.json();
};
const BlogPage = async () => {
  const posts = await getPost();

  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
