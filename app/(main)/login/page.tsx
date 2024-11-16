"use client";
import FormInput from "@/app/components/input";
import FormButton from "@/app/components/btn";
import SocialLogin from "@/app/components/social-login";
import { login } from "./actions";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/app/lip/constants";

export default function Login() {
  const [state, action] = useActionState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl font-medium">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.password}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
