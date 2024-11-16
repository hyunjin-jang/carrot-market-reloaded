"use client";

import Button from "@/app/components/btn";
import Input from "@/app/components/input";
import { useActionState } from "react";
import { smsLogin } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, action] = useActionState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl font-medium">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        {state?.token ? (
          <Input
            key="token"
            name="token"
            type="number"
            placeholder="Verification Code"
            required
            min={100000}
            max={999999}
            errors={state?.error?.formErrors}
          />
        ) : (
          <Input
            key="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            required
            errors={state?.error?.formErrors}
          />
        )}
        <Button
          text={state?.token ? "Verify Token" : "Send Verification SMS"}
        />
      </form>
    </div>
  );
}
