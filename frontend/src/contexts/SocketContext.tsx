"use client";
import IMessage from "@/interfaces/IMessage";
import ISocketContext from "@/interfaces/ISocketContext";
import { createContext, useContext, useEffect, useState } from "react";
import * as socketIO from "socket.io-client";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";

const initialData: ISocketContext = {
  socket: undefined,
  roomUsers: {},
  messages: {},
};

const SocketContext = createContext<ISocketContext>(initialData);

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [roomUsers, setRoomUsers] = useState({});
  const [socket, setSocket] = useState<socketIO.Socket>();
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});

  const { username } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.replace("/");
      return;
    }
    
    const socketInstance = socketIO.connect(process.env.NEXT_PUBLIC_BASE_URL!);

    socketInstance.on("receive_message", (data: IMessage) => {
      setMessages((prev) => {
        const newMessages = { ...prev };
        newMessages[data.roomId] = [...(newMessages[data.roomId] ?? []), data];
        return newMessages;
      });
    });

    socketInstance.on("users_response", (data) => setRoomUsers(data));

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [router, username]);

  return (
    <SocketContext.Provider value={{ socket, roomUsers, messages }}>
      {children}
    </SocketContext.Provider>
  );
}
