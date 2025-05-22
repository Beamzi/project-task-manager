import { signIn } from "../../../auth";

export default function SignInBtn() {
  return (
    <form
      className="flex flex-col align-middle justify-center ml-2"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button className="" type="submit">
        Sign In With Google
      </button>
    </form>
  );
}
