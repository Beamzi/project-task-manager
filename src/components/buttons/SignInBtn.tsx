import { signIn } from "../../../auth";
import { FcGoogle } from "react-icons/fc";

export default function SignInBtn() {
  return (
    <form
      className="flex flex-col align-middle justify-center z-1000"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        className="min-w-25 w-50 flex hover:bg-white hover:text-rose-600 transition-all duration-300 justify-center py-2 border-1 bg-black rounded-lg"
        type="submit"
      >
        <FcGoogle className="mini-w-5 min-h-5 mr-1 b" />
        Continue With Google
      </button>
    </form>
  );
}
