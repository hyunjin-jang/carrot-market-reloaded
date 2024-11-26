"use server";

import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/app/lip/constants";
import db from "@/app/lip/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/app/lip/session";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "그런 이메일은 없음"),
  password: z
    .string()
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
})

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      password: true,
    },
  });
  const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
  console.log(ok);
  if (ok) {
    const session = await getSession();
    session.id = user!.id;
    await session.save();
    redirect("/profile");
  } else {
    return { password: ["비밀번호가 틀림"] };
  }
};
