import { connectToDatabase } from "@/app/api/db/db";
import UsersModal from "@/app/api/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    let email = body.email || undefined;
    let password = body.password || undefined;

    if (!email || !password) {
      return new Response("Email or password are not there", { status: 405 });
    }
    const user = await UsersModal.findOne({ email }, { __v: 0 }).lean().exec();

    if (!user) {
      return new Response("User not found", { status: 401 });
    }
    const checkPssword = bcrypt.compareSync(password, user.password); // true
    if (!checkPssword) {
      return new Response("Wrong password", { status: 401 });
    }
    const JWTToken: string = process.env.JWTToken || "harsh";
    const token = jwt.sign({ email, id: user._id }, JWTToken);
    return Response.json({ status: 200, token, users: { ...user, password: null } });
  } catch (e) {
    console.log(e);
    return new Response("Login Failed", { status: 500 });
  }
}
