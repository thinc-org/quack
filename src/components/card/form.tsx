import { useQueue } from "../../hooks/use-queue";
import { useState } from "react";

export const Form = ({ room }: { room: string }) => {
  const queue = useQueue(room);
  const [name, setName] = useState("");
  return (
    <div className="flex flex-col space-y-5">
      {queue.current ? (
        <div className="text-green text-lg text-center">
          <p className="text-4xl w-full text-center">{queue.current}</p>
          You have been added to the queue!
        </div>
      ) : (
        <>
          <input
            placeholder="Your Name"
            type="text"
            className="border-2 rounded-lg p-2 text-base border-contrast"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="border-2 bg-orange button-backdrop rounded-lg p-2 text-base border-contrast"
            onClick={() => {
              queue.addToQueue(name);
            }}
          >
            Add You to Queue
          </button>
        </>
      )}
    </div>
  );
};
