import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

//schema for validation
const userSchema = z.object({
  username: z.string().min(3, { message: "Username is too short" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 Characters long" }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    //for email
    const existingUserEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exits" },
        { status: 409 }
      );
    }
    //for username
    const existingUsername = await db.user.findUnique({
      where: {
        username: username as string,
      },
    });
    if (existingUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exits" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // console.log("hashedpassword", hashedPassword);

    const newUser = await db.user.create({
      data: {
        provider: "credentials",
        username,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "New User created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Something went Wrong!!" },
      { status: 500 }
    );
  }
}