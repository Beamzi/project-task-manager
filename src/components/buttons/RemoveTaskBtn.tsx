import { useRouter } from "next/navigation";

function RemoveTaskBtn({ id }: { id: string }) {
  const router = useRouter();
  async function deleteTask() {
    try {
      await fetch("/api/delete-task", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <button onClick={deleteTask} className="bg-red-900">
      Remove
    </button>
  );
}

export default RemoveTaskBtn;
