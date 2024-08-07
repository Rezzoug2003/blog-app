// File: /lib/action.js
"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export const addPost = async (formdata) => {
  // const title=formdata.get('title');
  // const desc=formdata.get('desc');
  // const slug=formdata.get('slug');
  const { title, desc, slug, userId } = Object.fromEntries(formdata);
  try {
    connectToDb();
    const newPost = await Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();
    console.log("save in db");
    revalidatePath("/blog");
  } catch (err) {
    throw new Error(err);
  }
};
export const deletePost = async (formdata) => {
  const { id } = Object.fromEntries(formdata);
  try {
    connectToDb();
    await Post.findByIdAndDelete(id);

    console.log("delete post in db");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    throw new Error(err);
  }
};
export const addUser = async (prevState, formData) => {
  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);

  try {
    const s = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, s);
    connectToDb();
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      img,

      isAdmin,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};
export const handleGithubSignIn = async () => {
  "use server";
  await signIn("github");
};
export const handleLogout = async () => {
  "use server";
  await signOut("github");
};
export const register = async (previousState, formdata) => {
  const { username, email, password, passwordRepeat, img } =
    Object.fromEntries(formdata);
  if (password !== passwordRepeat) return { error: "Passwords do not match" };
  try {
    connectToDb();
    const user = await User.findOne({ username });
    if (user) {
      return { error: "Username already exists" };
    }
    const s = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, s);
    const newuser = new User({
      username,
      password: hashPassword,
      email,
      img,
    });
    await newuser.save();
    console.log("User saved");
    return { success: true };
  } catch (err) {
    throw new Error("create user field");
    return { error: "Something went wrong!" };
  }
};
export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
