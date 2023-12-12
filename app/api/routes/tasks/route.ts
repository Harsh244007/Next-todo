import { connectToDatabase } from "@/app/api/db/db";
import TasksModal from "../../models/Tasks";
import jwt from "jsonwebtoken";
import { jwtUserType } from "@/types/apiTypes";
import UsersModal from "../../models/User";

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
    let status = body.status || "In Progress";

    if (!title || !description) {
      return new Response("Title and Description is required", { status: 405 });
    }

    const task = new TasksModal({ title, description, status, user:jwtUser?.id });
    UsersModal.findByIdAndUpdate(jwtUser?.id, { $push: { tasks: task._id } }, { new: true }).lean().exec()
    await task.save();
    console.log(task)
    return new Response("Task created successfully", { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response("Registration Failed", { status: 500 });
  }
}
