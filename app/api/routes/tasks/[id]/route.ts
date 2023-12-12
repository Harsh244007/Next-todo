import { connectToDatabase } from "@/app/api/db/db";
import TasksModal from "@/app/api/models/Tasks";
import { jwtUserType } from "@/types/apiTypes";
import jwt from "jsonwebtoken";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
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
    const userWithTask = await TasksModal.find({ user: jwtUser?.id }, { __v: 0 })
      .populate({ path: "user", select: { name: 1, _id: 1, email: 1, profileImage: 1 } })
      .lean()
      .exec();
    return Response.json(userWithTask);
  } else {
    return new Response("ID not found.", { status: 500 });
  }
}
