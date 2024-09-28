interface WatchProps {
  params: { id: string };
}

const Page = ({ params }: WatchProps) => {
  return <div>{params.id}</div>;
};

export default Page;
