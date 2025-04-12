import RemoveTaskBtn from "./buttons/RemoveTaskBtn";

interface Props {
  author: string | null | undefined;
  title: string;
  date: string;
  content: string | null;
  id: string;
}

export default function Task({ author, title, date, content, id }: Props) {
  return (
    <>
      <div className="border-2 my-5 p-5">
        <h3>{author}</h3>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{content}</p>
        <RemoveTaskBtn id={id}></RemoveTaskBtn>
      </div>
    </>
  );
}
