import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  connect: () => void;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const url = import.meta.env.VITE_URL;
  const connect = () => {
    if (!isConnected) {
      const accessToken = document?.cookie
        ?.split("; ")
        ?.find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

      const socket = io(`http://${url}:3000/notifications`, {
        transports: ["websocket"],
        auth: {
          token: accessToken,
        },
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        setIsConnected(true);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
        setIsConnected(false);
      });

      socketRef.current = socket;
    }
  };

  const disconnect = () => {
    if (isConnected && socketRef.current) {
      socketRef.current.disconnect();
      setIsConnected(false);
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current, connect, disconnect }}
    >
      {children}
    </SocketContext.Provider>
  );
};
