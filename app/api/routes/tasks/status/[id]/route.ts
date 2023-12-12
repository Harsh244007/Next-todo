import { connectToDatabase } from "@/app/api/db/db";
import TasksModal from "@/app/api/models/Tasks";
import UsersModal from "@/app/api/models/User";
import { jwtUserType } from "@/types/apiTypes";
import jwt from "jsonwebtoken";


export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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
      
    const body = await request.json();
    
    let status = body.status || undefined;
    if(!status) return new Response("Status is not sent in payload.", { status: 405 });
    if(status != "To Do" &&status != "In Progress" &&status != "Done") return new Response("Invalid Status.", { status: 405 });
      const id = params.id;
      console.log(status)
      await TasksModal.findByIdAndUpdate(id,{status:status}).lean().exec();
      return new Response("Success", { status: 202 });
    } else {
      return new Response("Token not provided.", { status: 500 });
    }
  } catch (e) {
    console.log(e);
    return new Response("Task not found.", { status: 500 });
  }
}
