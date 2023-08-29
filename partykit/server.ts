import type { PartyKitServer } from "partykit/server";

export type MessageType = "list" | "add" | "pop" | "move-last" | "move-first";
export type Message = {
  type: MessageType;
  name?: string;
};

const queue: Record<string, string[]> = {
  "0": [],
};

export default {
  onConnect(ws, room) {
    ws.addEventListener("message", (evt) => {
      const message = JSON.parse(evt.data as string) as Message;
      console.log("got message", message);
      switch (message.type) {
        case "add":
          if (!queue[room.id]) queue[room.id] = [];
          queue[room.id].push(message.name as string);
          room.broadcast(
            JSON.stringify({ type: "update", data: queue[room.id] })
          );
          ws.send(
            JSON.stringify({ type: "added", data: queue[room.id].length - 1 })
          );
          break;
        case "pop":
          if (!queue[room.id]) return;
          const data = queue[room.id].shift();
          room.broadcast(
            JSON.stringify({ type: "update", data: queue[room.id] })
          );
          ws.send(JSON.stringify({ type: "pop", data }));
          break;
        case "move-last":
          if (!queue[room.id]) queue[room.id] = [];
          queue[room.id].push(message.name as string);
          room.broadcast(
            JSON.stringify({ type: "update", data: queue[room.id] })
          );
          break;
        case "move-first":
          if (!queue[room.id]) queue[room.id] = [];
          queue[room.id].splice(0, 0, message.name as string);
          room.broadcast(
            JSON.stringify({ type: "update", data: queue[room.id] })
          );
          break;
        case "list":
          if (!queue[room.id]) queue[room.id] = [];
          ws.send(JSON.stringify({ type: "list", data: queue[room.id] }));
          break;
      }
    });
  },
} satisfies PartyKitServer;
