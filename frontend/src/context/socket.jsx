import { useEffect, createContext } from "react";
import { io } from "socket.io-client";


export const SocketContext = createContext();

const socket = io("http://localhost:3000");

export const Socketprovider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to the server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from the server");
    });
  }, []);


  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
