"use server";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ja-JP")
    , "잘못된 전번임"
  );

const tokenSchema = z
  .coerce.number()
  .min(100000, "Invalid token")
  .max(999999, "Invalid token");


interface ActionState {
  token: boolean;
}

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
  const phoneNumber = formData.get('phoneNumber');
  const token = formData.get('token');
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phoneNumber);
    if (!result.success) {
      console.log(result.error.flatten());
      return { token: false, error: result.error.flatten() };
    }
    return { token: true };
  }
  const result = tokenSchema.safeParse(token);
  if (!result.success) {
    console.log(result.error.flatten());
    return { token: true, error: result.error.flatten() };
  }
  redirect("/");
}
