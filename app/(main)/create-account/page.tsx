"use client";

import Input from "@/app/components/input";
import Button from "@/app/components/btn";
import SocialLogin from "@/app/components/social-login";
import { createAccount } from "./actions";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/app/lip/constants";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl font-medium">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          errors={state?.confirmPassword}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Button text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
}
