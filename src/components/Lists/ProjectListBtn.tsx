import { redirect } from "next/navigation";
import Link from "next/link";

interface Props {
  id: string;
  title: string;
}

export default function ProjectListBtn({ id, title }: Props) {
  return <Link href={`/projects/${id}`}>{title}</Link>;
}
