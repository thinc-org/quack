import { useQueue } from "../../hooks/use-queue";
import { useState } from "react";

export const Consume = ({ room }: { room: string }) => {
  const queue = useQueue(room);
  return (
    <div className="flex flex-col space-y-5">
      <div className="bg-white rounded-xl p-4">
        <p>Current</p>
        <p className="text-4xl w-full text-center">{queue.currentName}</p>
      </div>
      <button
        className="border-2 bg-orange button-backdrop rounded-lg p-2 text-base border-contrast"
        onClick={() => {
          queue.popFromQueue();
        }}
      >
        Next
      </button>
      <div className="grid grid-cols-2 gap-5">
        <button
          className="border-2 bg-orange button-backdrop rounded-lg p-2 text-base border-contrast"
          onClick={() => {
            queue.moveToLast(queue.currentName);
          }}
        >
          Move to Back
        </button>
        <button
          className="border-2 bg-orange button-backdrop rounded-lg p-2 text-base border-contrast"
          onClick={() => {
            queue.moveToFirst(queue.currentName);
          }}
        >
          Move to Front
        </button>
      </div>
    </div>
  );
};
