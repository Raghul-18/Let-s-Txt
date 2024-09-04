"use client";
import IRoom from "@/interfaces/IRoom";
import IRoomContext from "@/interfaces/IRoomContext";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

const initialData: IRoomContext = {
  rooms: [],
  myRooms: [],
  setMyRooms: () => {},
};

const RoomContext = createContext<IRoomContext>(initialData);

export function useRoom() {
  return useContext(RoomContext);
}

export default function RoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [myRooms, setMyRooms] = useState<IRoom[]>([]);

  useEffect(() => {
    fetchRoomsFromServer();
    fetchMyRooms();
  }, []);

  // Memoize the updateMyRooms function
  const updateMyRooms = useCallback(() => {
    localStorage.setItem("myRooms", JSON.stringify(myRooms));
  }, [myRooms]);

  useEffect(() => {
    updateMyRooms();
  }, [updateMyRooms]);

  async function fetchRoomsFromServer(): Promise<void> {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "rooms");
    const rooms = await response.json();
    setRooms(rooms);
  }

  function fetchMyRooms() {
    const myRooms = localStorage.getItem("myRooms");
    if (myRooms) setMyRooms(JSON.parse(myRooms));
    else setMyRooms([]);
  }

  return (
    <RoomContext.Provider value={{ rooms, myRooms, setMyRooms }}>
      {children}
    </RoomContext.Provider>
  );
}
