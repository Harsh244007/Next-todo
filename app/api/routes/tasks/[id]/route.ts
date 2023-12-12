import { connectToDatabase } from "@/app/api/db/db";
import TasksModal from "@/app/api/models/Tasks";
import UsersModal from "@/app/api/models/User";
import { jwtUserType } from "@/types/apiTypes";
import jwt from "jsonwebtoken";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    if (params.id) {
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

      // const userWithTask = await UsersModal.findOne({ _id: jwtUser?.id }).populate({path:"tasks",strictPopulate:false,justOne:false}).lean().exec()
      const userWithTask = await UsersModal.findOne({ _id: jwtUser?.id }, { __v: 0, password: 0 }).lean().exec();
      const tasksOfUser = await TasksModal.find({ user: jwtUser?.id }, { __v: 0 }).lean().exec();

      if (userWithTask) {
        return Response.json({ user: userWithTask, tasks: tasksOfUser });
      } else {
        return new Response("Invalid Token or Token not provided.", { status: 500 });
      }
    } else {
      return new Response("ID not found.", { status: 500 });
    }
  } catch (e) {
    console.log(e, "USER WITH TASK ERROR");
    return new Response("Task not found.", { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  try {
    if (params.id) {
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
      const id = params.id;
      console.log(id);
      await TasksModal.findByIdAndDelete(id).lean().exec();
      await UsersModal.findByIdAndUpdate(jwtUser?.id, { $pull: { tasks: id } }).exec();
      return new Response("Succes", { status: 202 });
    } else {
      return new Response("Token not provided.", { status: 500 });
    }
  } catch (e) {
    console.log(e);
    return new Response("Task not found.", { status: 500 });
  }
}
