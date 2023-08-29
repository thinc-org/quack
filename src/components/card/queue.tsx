import { useQueue } from "../../hooks/use-queue";

const Room = ({
  id,
  name,
  onClick,
}: {
  id: number;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <a
      href={`/room/${id}`}
      onClick={onClick}
      className="text-base border-2 border-contrast p-4 rounded-lg bg-white cursor-pointer"
    >
      #{id} {name}
    </a>
  );
};

export const QueueCard = ({ room }: { room: string }) => {
  const queue = useQueue(room);

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full px-5 bg-orange py-2 text-lg border-b-2 border-contrast sticky">
        Queue
      </div>

      <div className="space-y-5 w-full flex flex-col px-5 overflow-scroll flex-1 py-5">
        {queue.queue.map((item, index) => (
          <Room key={index} id={index} name={item} />
        ))}
      </div>
    </div>
  );
};
