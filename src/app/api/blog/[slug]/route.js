import { connectToDb } from "@/lib/utils"
import { Post } from '@/lib/models';
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const { slug } = params;
    try {
        connectToDb();
        const post = await Post.findOne({ slug: slug });
        return NextResponse.json(post)

    }catch (err) {
        console.error(err)
        throw new Error("field get post")
    }
    }