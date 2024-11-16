"use server";
import { PASSWORD_ERROR_MESSAGE, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '@/app/lip/constants';
import { z } from 'zod';

const checkPassword = ({ password, confirmPassword }: { password: string, confirmPassword: string }) =>
  password === confirmPassword;

const formSchema = z.object({
  username: z
    .string({ invalid_type_error: "문자열이 아님", required_error: "필수 입력임" }),
  email: z
    .string({ invalid_type_error: "문자열이 아님", required_error: "필수 입력임" })
    .email()
    .toLowerCase(),
  password: z
    .string({ invalid_type_error: "문자열이 아님", required_error: "필수 입력임" })
    .min(PASSWORD_MIN_LENGTH, "넘 짧음")
    .regex(PASSWORD_REGEX, PASSWORD_ERROR_MESSAGE),
  confirmPassword: z
    .string({ invalid_type_error: "문자열이 아님", required_error: "필수 입력임" })
    .min(PASSWORD_MIN_LENGTH, "넘 짧음"),
}).refine(checkPassword, { message: "비밀번호가 일치하지 않음", path: ["confirmPassword"] });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten().fieldErrors;
  }
};
