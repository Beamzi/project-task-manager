interface Props {
  id: string;
  title: string;
}

export default function ProjectListBtn({ id, title }: Props) {
  return <button>{title}</button>;
}
