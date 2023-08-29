import { useState, useRef, useCallback } from "react";
import PartySocket from "partysocket";

export const useQueue = (room: string) => {
  const partySocket = new PartySocket({
    host: "https://thinc-quack.msp5382.partykit.dev",
    room: room,
  });
  const [queue, setQueue] = useState<string[]>([]);
  const [current, setCurrent] = useState<string | null>(null);
  const [currentName, setCurrentName] = useState<string>("");
  const isInit = useRef(false);

  partySocket.onopen = useCallback(() => {
    console.log("connected");
    if (!isInit.current) {
      partySocket.send(JSON.stringify({ type: "list" }));
      isInit.current = true;
    }
  }, [partySocket]);

  partySocket.onmessage = useCallback(
    (evt: { data: string }) => {
      console.log("got message", evt.data);
      const message = JSON.parse(evt.data);
      switch (message.type) {
        case "list":
          setQueue(message.data ?? []);
          break;
        case "update":
          setQueue(message.data ?? []);
          break;
        case "added":
          setCurrent(`#${message.data}`);
          break;
        case "pop":
          setCurrentName(message.data as string);
          break;
      }
    },
    [setQueue]
  );

  return {
    addToQueue: (name: string) => {
      partySocket.send(JSON.stringify({ type: "add", name }));
      setCurrent("Loading...");
    },
    popFromQueue: () => {
      partySocket.send(JSON.stringify({ type: "pop" }));
    },
    moveToLast: (name: string) => {
      partySocket.send(JSON.stringify({ type: "move-last", name }));
      setCurrentName("");
    },
    moveToFirst: (name: string) => {
      partySocket.send(JSON.stringify({ type: "move-first", name }));
      setCurrentName("");
    },
    queue,
    current,
    currentName,
  };
};
