// File: /pages/page.js
import {addPost, deletePost} from "@/lib/action";
// const actionInComponent = async () => {
//   "use server"
//   console.log("bilal")
// }
const Page = () => {
  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title" />
        <input type="text" placeholder="desc" name="desc" />
        <input type="text" placeholder="userId" name="userId" />
        <input type="text" placeholder="slug" name="slug" />
        <button type="submit">Click here</button>
      </form>
      <form action={deletePost}>
        <input type="text" placeholder="get id post" name="id" />
        <button type="submit">delete post</button>
      </form>
    </div>
  );
};

export default Page;
