import { signOut } from "../../../auth";

export function SignOutBtn() {
  return (
    <form
      className="flex flex-col align-middle justify-center"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
