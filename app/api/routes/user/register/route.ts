import { connectToDatabase } from "@/app/api/db/db";
import UsersModal from "@/app/api/models/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    let email = body.email || undefined;
    let password = body.password || undefined;
    let name = body.name || undefined;

    if (!email || !password || !name) {
      return new Response("Email, password or name are not there", { status: 405 });
    }
    const hashedPassword = await bcrypt.hashSync(password, 8);
    const existingUser = await UsersModal.findOne({ email }).lean().exec();
    if (existingUser) {
      return new Response("User with this email already exists", { status: 400 });
    }
    const user = new UsersModal({ name, email, password: hashedPassword });
    await user.save();
    return new Response("User registered successfully", { status: 201 });
  } catch (e) {
    console.log(e);
    return new Response("Registration Failed", { status: 500 });
  }
}
