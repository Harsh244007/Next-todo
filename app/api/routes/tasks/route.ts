import { connectToDatabase } from "@/app/api/db/db";
import TasksModal from "../../models/Tasks";
import jwt from "jsonwebtoken";
import { jwtUserType } from "@/types/apiTypes";

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const header = new Headers(request.headers);
    const token = header.get("authorization")?.split(" ")[1];
    if (!header || !token) {
      return new Response("Invalid Token or Token not provided.", { status: 500 });
    }
    let jwtUser: jwtUserType | undefined;
    const JWTToken: string | undefined = process.env.JWTToken;
    if (JWTToken) {
      // @ts-ignore
      jwt.verify(token, JWTToken, (e: jwt.VerifyErrors | null, u: jwtUserType | undefined) => {
        if (e) return new Response("Invalid Token or Token not provided.", { status: 500 });
        if (u) jwtUser = u;
      });
    }

    const body = await request.json();
    let title = body.title || undefined;
    let description = body.description || undefined;
    let status = body.name || "In Progress";
    let user = body.user || undefined;
    if (jwtUser?.id != user) {
      return new Response("Invalid Userid or User not allowed.", { status: 404 });
    }

    if (!title || !description) {
      return new Response("Title and Description is required", { status: 405 });
    }
    if (!user) {
      return new Response("UserID is required", { status: 405 });
    }

    const task = new TasksModal({ title, description, status, user });
    await task.save();
    return new Response("Task created successfully", { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response("Registration Failed", { status: 500 });
  }
}
