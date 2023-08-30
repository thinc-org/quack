import { useEffect, useState } from "react";
import { Button } from "../button";
const Room = ({
  id,
  name,
  onClick,
}: {
  id: string;
  name: string;
  onClick?: () => void;
}) => {
  return (
    <a
      href={`/room/${id}`}
      onClick={onClick}
      className="text-base border-2 border-contrast p-4 rounded-lg bg-white cursor-pointer"
    >
      #{id}
    </a>
  );
};

export const NewRoomCard = () => {
  const [rooms, setRooms] = useState<
    {
      name: string;
      id: string;
    }[]
  >([]);

  const [newRoom, setNewRoom] = useState("");
  const [showAddRoom, setShowAddRoom] = useState(false);

  useEffect(() => {
    const rooms = localStorage.getItem("rooms");
    if (!rooms) {
      localStorage.setItem("rooms", JSON.stringify([]));
    }
    setRooms(JSON.parse(rooms as string));
  }, []);

  return (
    <div className="mt-4 max-w-4xl w-[80vw]">
      <div className="flex justify-end pb-5">
        <Button onClick={() => setShowAddRoom(true)}>
          <div className="flex text-white items-center gap-1 w-full">
            <p className="leading-loose">+ New Room</p>
          </div>
        </Button>
      </div>

      {showAddRoom && (
        <div className="text-base border-2 flex gap-4 border-contrast p-4 rounded-lg bg-white cursor-pointer">
          <input
            placeholder="Room Name"
            type="text"
            className="border-2 rounded-lg p-2 w-full text-base border-contrast"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
          />
          <button
            className="border-2 w-48 bg-orange button-backdrop rounded-lg p-2 text-base border-contrast"
            onClick={() => {
              const newRoomWithId = {
                name: newRoom,
                id: `${Math.floor(Math.random() * 100)}-${newRoom}`,
              };
              localStorage.setItem(
                "rooms",
                JSON.stringify([...rooms, newRoomWithId])
              );
              setRooms((rooms) => [...rooms, newRoomWithId]);
              setNewRoom("");
              setShowAddRoom(false);
            }}
          >
            Create Room
          </button>
        </div>
      )}

      <div className="space-y-5 w-full flex flex-col mt-5">
        {(rooms ?? []).map((room) => (
          <Room key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
};
