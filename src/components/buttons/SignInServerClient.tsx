"use client";

import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <button
      className="your-classes"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Sign In With Google
    </button>
  );
}
